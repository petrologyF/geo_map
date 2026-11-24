import { CONFIG, FIELD_TRIP_CATEGORIES, FIELD_TRIP_CATEGORY_KEYS } from './config.js';
import { el, getCourseKey } from './dom.js';
import { t } from './i18n.js';
import { addOverlayForItem } from './inspector.js';
import { getMapFitPadding, switchMobileView, syncSettingsUI } from './map.js';
import { getItemBounds, isSafeUrl, normalizeSearchText } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { saveSettings, state, dom } from './state.js';

function populateSelectOptions(selectEl, options, allLabel, currentValue) {
  if (!selectEl) {
    return;
  }
  selectEl.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = allLabel;
  selectEl.appendChild(allOpt);
  options.forEach(({ value, label }) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = label;
    selectEl.appendChild(opt);
  });
  selectEl.value = currentValue;
}

/**
 * 巡検テーマカテゴリ絞り込みチップ（凡例兼用）を描画する
 */
export function renderFieldTripCategoryChips() {
  if (!dom.drawerTripCategoryChips) {
    return;
  }
  const dict = t();
  const labels = dict.fieldTripCategories || {};
  dom.drawerTripCategoryChips.innerHTML = '';

  FIELD_TRIP_CATEGORY_KEYS.forEach((key) => {
    const isActive = state.selectedFieldTripCategories.has(key);
    const btn = el('button', {
      type: 'button',
      className: `decade-chip field-trip-category-chip${isActive ? ' is-active' : ''}`,
      dataset: { tripCategory: key },
      'aria-pressed': String(isActive),
      onClick: () => {
        if (state.selectedFieldTripCategories.has(key)) {
          state.selectedFieldTripCategories.delete(key);
        } else {
          state.selectedFieldTripCategories.add(key);
        }
        state.settings.fieldTripCategories = Array.from(state.selectedFieldTripCategories);
        saveSettings();
        renderFieldTripCategoryChips();
        populateFieldTripFilters();
        renderFieldTripMarkers();
        renderFieldTripList();
        schedulePermalinkSync();
      }
    },
      el('span', { className: 'field-trip-category-dot', 'aria-hidden': 'true' }),
      el('span', {}, labels[key] || key)
    );
    dom.drawerTripCategoryChips.appendChild(btn);
  });
}

/**
 * 現在の年・コース・カテゴリ・キーワード絞り込みに合致する巡検スポット一覧を返す
 */
export function getFilteredFieldTripItems() {
  const tokens = normalizeSearchText((state.fieldTripQuery || '').trim()).split(/\s+/).filter(Boolean);
  return state.fieldTripItems.filter(({ props, normalizedSearchText }) => {
    if (
      state.selectedFieldTripCategories.size > 0 &&
      !state.selectedFieldTripCategories.has(props.category)
    ) {
      return false;
    }
    if (state.fieldTripYear !== 'all' && String(props.year) !== state.fieldTripYear) {
      return false;
    }
    if (state.fieldTripCourse !== 'all' && props.course_abbr !== state.fieldTripCourse) {
      return false;
    }
    if (tokens.length > 0) {
      const haystack = normalizedSearchText || normalizeSearchText(
        `${props.id || ''} ${props.year || ''} ${props.course_abbr || ''} ${props.course_name || ''} ${props.authors || ''} ${props.stop_abbr || ''} ${props.stop_name || ''} ${props.description || ''}`
      );
      if (!tokens.every((tok) => haystack.includes(tok))) {
        return false;
      }
    }
    return true;
  });
}

/**
 * 巡検フィルタ（年・コース）の選択肢を更新する（年に連動してコースを絞り込む）
 */
export function populateFieldTripFilters() {
  const dict = t();
  const categoryItems = state.selectedFieldTripCategories.size > 0
    ? state.fieldTripItems.filter((it) => state.selectedFieldTripCategories.has(it.props.category))
    : state.fieldTripItems;

  const years = Array.from(new Set(categoryItems.map((it) => String(it.props.year)).filter(Boolean)))
    .sort((a, b) => Number(b) - Number(a));
  if (!years.includes(state.fieldTripYear)) {
    state.fieldTripYear = 'all';
    state.settings.fieldTripYear = 'all';
  }
  const yearOpts = years.map((y) => ({ value: y, label: `${y}${dict.fieldTripYearSuffix}` }));
  populateSelectOptions(dom.drawerTripYearFilter, yearOpts, dict.fieldTripAllYears, state.fieldTripYear);

  const courses = Array.from(
    new Set(
      categoryItems
        .filter((it) => state.fieldTripYear === 'all' || String(it.props.year) === state.fieldTripYear)
        .map((it) => it.props.course_abbr)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'ja'));
  if (!courses.includes(state.fieldTripCourse)) {
    state.fieldTripCourse = 'all';
    state.settings.fieldTripCourse = 'all';
  }
  const courseOpts = courses.map((c) => ({ value: c, label: c }));
  populateSelectOptions(dom.drawerTripCourseFilter, courseOpts, dict.fieldTripAllCourses, state.fieldTripCourse);
}

/**
 * 現在 1 コースのみ展開中のソート済み巡検スポット配列を返す（それ以外は空配列）
 */
export function getExpandedCourseStops() {
  const filtered = getFilteredFieldTripItems();
  const activeCourseKeys = Array.from(new Set(
    filtered.map((it) => getCourseKey(it.props))
  )).filter((key) => state.expandedFieldTripCourses.has(key));

  if (activeCourseKeys.length !== 1) {
    return [];
  }
  const key = activeCourseKeys[0];
  return filtered
    .filter((it) => getCourseKey(it.props) === key)
    .sort((a, b) =>
      String(a.props.stop_no || '').localeCompare(String(b.props.stop_no || ''), undefined, { numeric: true })
    );
}

/**
 * 展開中の巡検コースで前後（delta = -1 / +1）の地点へ移動する
 */
export function stepFieldTripStop(delta) {
  const sorted = getExpandedCourseStops();
  if (sorted.length <= 1) {
    return false;
  }
  let idx = sorted.findIndex((it) => it.props.id === state.selectedFieldTripId);
  if (idx < 0) {
    idx = 0;
  }
  const nextIdx = ((idx + delta) % sorted.length + sorted.length) % sorted.length;
  focusFieldTripSpot(sorted[nextIdx]);
  return true;
}

/**
 * 指定座標を包含する 5万分の1地質図幅（geological_map_sheet かつオーバーレイ可能）を検索する
 */
export function findSheetMapForLatLng(latlng) {
  if (!latlng || !Array.isArray(state.allItems) || state.allItems.length === 0) {
    return null;
  }
  let bestItem = null;
  let bestArea = Infinity;
  for (let i = 0; i < state.allItems.length; i += 1) {
    const item = state.allItems[i];
    const meta = item && item.meta;
    if (!meta || meta.mapType !== 'geological_map_sheet' || !meta.overlayType) {
      continue;
    }
    const bounds = getItemBounds(item);
    if (!bounds || !bounds.isValid() || !bounds.contains(latlng)) {
      continue;
    }
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const area = Math.abs((ne.lat - sw.lat) * (ne.lng - sw.lng));
    if (area < bestArea) {
      bestArea = area;
      bestItem = item;
    }
  }
  return bestItem;
}

/**
 * 指定 Stop 配列から現在選択中（または先頭）の Stop に対応する重ね合わせ候補図幅を返す
 */
function getOverlayCandidateForStops(stops) {
  if (!Array.isArray(stops) || stops.length === 0) {
    return null;
  }
  const current = stops.find((it) => it.props.id === state.selectedFieldTripId) || stops[0];
  return current ? findSheetMapForLatLng(current.latlng) : null;
}

/**
 * 展開中の現在地点（未選択時はコース代表座標）を包含する地質図を重ねる
 */
export function overlayGeoMapAtCurrentSpot() {
  const matched = getOverlayCandidateForStops(getExpandedCourseStops());
  if (matched) {
    addOverlayForItem(matched);
  }
}

/**
 * 選択中の Stop ピンへ .is-active クラスと zIndexOffset を同期する
 */
export function syncActiveFieldTripMarkerHighlight() {
  state.fieldTripItems.forEach((item) => {
    if (!item.marker) {
      return;
    }
    const isSelected = Boolean(state.selectedFieldTripId && item.props.id === state.selectedFieldTripId);
    if (typeof item.marker.setZIndexOffset === 'function') {
      item.marker.setZIndexOffset(isSelected ? 500 : 0);
    }
    const el = typeof item.marker.getElement === 'function' ? item.marker.getElement() : null;
    if (el) {
      const pin = el.querySelector('.field-trip-pin');
      if (pin) {
        pin.classList.toggle('is-active', isSelected);
      }
    }
  });
}

/**
 * 地図下部中央の展開中コース操作バー＆ドロワー展開ボタンを同期する
 */
export function syncFieldTripActiveBar() {
  const dict = t();
  const filtered = getFilteredFieldTripItems();
  const activeCourseKeys = Array.from(new Set(
    filtered.map((it) => getCourseKey(it.props))
  )).filter((key) => state.expandedFieldTripCourses.has(key));

  if (dom.toggleExpandTripsBtn) {
    const allExpanded = filtered.length > 0 && activeCourseKeys.length > 0;
    dom.toggleExpandTripsBtn.textContent = allExpanded ? dict.fieldTripCollapse : dict.fieldTripExpand;
  }

  if (!dom.fieldTripActiveBar) {
    return;
  }
  if (!state.showFieldTrips || activeCourseKeys.length === 0) {
    delete dom.fieldTripActiveBar.dataset.tripCategory;
    if (dom.fieldTripStopNav) {
      dom.fieldTripStopNav.hidden = true;
    }
    dom.fieldTripActiveBar.hidden = true;
    syncActiveFieldTripMarkerHighlight();
    return;
  }

  if (activeCourseKeys.length === 1) {
    const sorted = getExpandedCourseStops();
    const sample = sorted[0] ? sorted[0].props : {};
    if (sample.category) {
      dom.fieldTripActiveBar.dataset.tripCategory = sample.category;
    } else {
      delete dom.fieldTripActiveBar.dataset.tripCategory;
    }
    if (dom.fieldTripActiveBadge) {
      dom.fieldTripActiveBadge.textContent = `${sample.year || ''}${dict.fieldTripYearSuffix} ・ ${sample.course_abbr || ''}`.trim();
    }
    if (dom.fieldTripActiveCount) {
      dom.fieldTripActiveCount.textContent = dict.fieldTripCount(sorted.length);
    }
    if (dom.fieldTripActiveLabel) {
      dom.fieldTripActiveLabel.textContent = sample.course_name || sample.course_abbr || '';
    }
    if (dom.fieldTripActiveAuthors) {
      if (sample.authors) {
        dom.fieldTripActiveAuthors.textContent = `${dict.authorsLabel}: ${sample.authors}`;
        dom.fieldTripActiveAuthors.hidden = false;
      } else {
        dom.fieldTripActiveAuthors.hidden = true;
      }
    }
    if (dom.fieldTripBarOverlayBtn) {
      const matchedMap = getOverlayCandidateForStops(sorted);
      if (matchedMap) {
        dom.fieldTripBarOverlayBtn.textContent = dict.fieldTripOverlayMapHere;
        dom.fieldTripBarOverlayBtn.hidden = false;
      } else {
        dom.fieldTripBarOverlayBtn.hidden = true;
      }
    }
    if (dom.fieldTripBarGuidebookBtn) {
      if (isSafeUrl(sample.guidebook_url)) {
        dom.fieldTripBarGuidebookBtn.href = sample.guidebook_url;
        dom.fieldTripBarGuidebookBtn.textContent = dict.fieldTripOpenGuidebook;
        dom.fieldTripBarGuidebookBtn.hidden = false;
      } else {
        dom.fieldTripBarGuidebookBtn.hidden = true;
      }
    }

    if (dom.fieldTripStopNav && sorted.length > 0) {
      let currentIndex = sorted.findIndex((it) => it.props.id === state.selectedFieldTripId);
      if (currentIndex < 0) {
        currentIndex = 0;
        state.selectedFieldTripId = sorted[0].props.id || null;
      }
      const currentSpot = sorted[currentIndex];
      const sp = currentSpot.props;
      const canCycle = sorted.length > 1;
      if (dom.fieldTripPrevStopBtn) {
        dom.fieldTripPrevStopBtn.textContent = `← ${dict.fieldTripPrevStop}`;
        dom.fieldTripPrevStopBtn.disabled = !canCycle;
      }
      if (dom.fieldTripNextStopBtn) {
        dom.fieldTripNextStopBtn.textContent = `${dict.fieldTripNextStop} →`;
        dom.fieldTripNextStopBtn.disabled = !canCycle;
      }
      if (dom.fieldTripCurrentStopLabel) {
        const stopNoLabel = sp.stop_no || String(currentIndex + 1);
        const rawStopName = sp.stop_name || sp.stop_abbr || '';
        const cleanStopName = rawStopName.replace(/^Stop\s*\d+\s*[:：\-—]\s*/i, '');
        dom.fieldTripCurrentStopLabel.textContent =
          `${stopNoLabel} / ${sorted.length} : ${cleanStopName}`.trim();
      }
      if (dom.fieldTripCurrentStopDesc) {
        dom.fieldTripCurrentStopDesc.textContent = sp.description || '';
        dom.fieldTripCurrentStopDesc.hidden = false;
      }
      dom.fieldTripStopNav.hidden = false;
    }
  } else {
    const totalStops = filtered.filter((it) =>
      activeCourseKeys.includes(getCourseKey(it.props))
    ).length;
    if (dom.fieldTripActiveBadge) {
      dom.fieldTripActiveBadge.textContent = dict.fieldTripCoursesActive(activeCourseKeys.length);
    }
    if (dom.fieldTripActiveCount) {
      dom.fieldTripActiveCount.textContent = dict.fieldTripCount(totalStops);
    }
    if (dom.fieldTripActiveLabel) {
      dom.fieldTripActiveLabel.textContent = dict.fieldTripsLabel;
    }
    if (dom.fieldTripActiveAuthors) {
      dom.fieldTripActiveAuthors.hidden = true;
    }
    if (dom.fieldTripBarOverlayBtn) {
      dom.fieldTripBarOverlayBtn.hidden = true;
    }
    if (dom.fieldTripBarGuidebookBtn) {
      dom.fieldTripBarGuidebookBtn.hidden = true;
    }
    if (dom.fieldTripStopNav) {
      dom.fieldTripStopNav.hidden = true;
    }
    delete dom.fieldTripActiveBar.dataset.tripCategory;
  }
  if (dom.fieldTripBarFitBtn) {
    dom.fieldTripBarFitBtn.textContent = dict.fieldTripBarFit;
  }
  if (dom.fieldTripBarCollapseBtn) {
    dom.fieldTripBarCollapseBtn.textContent = dict.fieldTripCollapse;
  }
  dom.fieldTripActiveBar.hidden = false;
  syncActiveFieldTripMarkerHighlight();
}

function createFieldTripMarker(props, latlng) {
  const pinEl = el('div', { className: 'field-trip-pin', dataset: { tripCategory: props.category } },
    el('span', { className: 'field-trip-pin-num' }, props.stop_no || '★')
  );

  const icon = L.divIcon({
    className: 'field-trip-marker-icon',
    html: pinEl.outerHTML,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
  });
  const marker = L.marker(latlng, { icon, pane: 'fieldTripsPane', keyboard: true });
  const tooltipText = `${props.year || ''} ${props.course_abbr || ''} ${props.stop_no ? `#${props.stop_no}` : ''} ${props.stop_abbr || props.stop_name || ''}`.trim();
  marker.bindTooltip(tooltipText, { direction: 'top', offset: [0, -24] });
  marker.on('add', () => {
    const isSelected = Boolean(state.selectedFieldTripId && props.id === state.selectedFieldTripId);
    marker.setZIndexOffset(isSelected ? 500 : 0);
    const el = marker.getElement();
    if (el) {
      const pin = el.querySelector('.field-trip-pin');
      if (pin) {
        pin.classList.toggle('is-active', isSelected);
      }
    }
  });
  marker.on('click', () => {
    state.selectedFieldTripId = props.id || null;
    syncFieldTripActiveBar();
    renderFieldTripList();
  });
  return marker;
}

/**
 * 巡検スポットの Leaflet マーカーを遅延生成してキャッシュする
 */
export function ensureFieldTripMarker(ftItem) {
  if (!ftItem) {
    return null;
  }
  if (!ftItem.marker) {
    ftItem.marker = createFieldTripMarker(ftItem.props, ftItem.latlng);
  }
  return ftItem.marker;
}

function addExpandedCourseMarkers(sorted) {
  const coordGroups = new Map();
  sorted.forEach((item) => {
    const key = `${item.latlng.lat.toFixed(6)},${item.latlng.lng.toFixed(6)}`;
    if (!coordGroups.has(key)) {
      coordGroups.set(key, []);
    }
    coordGroups.get(key).push(item);
  });

  coordGroups.forEach((group) => {
    if (group.length === 1 || !state.map) {
      group.forEach((item) => {
        const marker = ensureFieldTripMarker(item);
        marker.setLatLng(item.latlng);
        marker.addTo(state.fieldTripsLayerGroup);
      });
      return;
    }

    const baseLatLng = group[0].latlng;
    const basePoint = state.map.latLngToLayerPoint(baseLatLng);
    const radius = group.length === 2 ? 18 : 22 + group.length * 2;
    const sampleCat = group[0] && group[0].props ? group[0].props.category : '';
    const routeColor = (FIELD_TRIP_CATEGORIES[sampleCat] && FIELD_TRIP_CATEGORIES[sampleCat].routeColor) || '#d97706';

    L.circleMarker(baseLatLng, {
      pane: 'fieldTripsPane',
      radius: 3.5,
      color: routeColor,
      fillColor: '#ffffff',
      fillOpacity: 1,
      weight: 1.5
    }).addTo(state.fieldTripsLayerGroup);

    group.forEach((item, idx) => {
      const angle = group.length === 2
        ? (idx === 0 ? Math.PI : 0)
        : (2 * Math.PI * idx) / group.length - Math.PI / 2;
      const offsetPoint = L.point(
        basePoint.x + Math.cos(angle) * radius,
        basePoint.y + Math.sin(angle) * radius
      );
      const offsetLatLng = state.map.layerPointToLatLng(offsetPoint);

      L.polyline([baseLatLng, offsetLatLng], {
        pane: 'fieldTripsPane',
        color: routeColor,
        weight: 1.5,
        opacity: 0.7
      }).addTo(state.fieldTripsLayerGroup);

      const marker = ensureFieldTripMarker(item);
      marker.setLatLng(offsetLatLng);
      marker.addTo(state.fieldTripsLayerGroup);
    });
  });
}

/**
 * 展開コースのルート破線と Stop マーカーを地図へ描画する
 */
function renderExpandedCourseOnMap(items) {
  const sorted = [...items].sort((a, b) =>
    String(a.props.stop_no || '').localeCompare(String(b.props.stop_no || ''), undefined, { numeric: true })
  );
  if (state.showFieldTripRoute && sorted.length >= 2) {
    const sampleCat = sorted[0] && sorted[0].props ? sorted[0].props.category : '';
    const routeColor = (FIELD_TRIP_CATEGORIES[sampleCat] && FIELD_TRIP_CATEGORIES[sampleCat].routeColor) || '#d97706';
    L.polyline(sorted.map((it) => it.latlng), {
      pane: 'fieldTripsPane',
      color: routeColor,
      weight: 2.5,
      opacity: 0.78,
      dashArray: '5, 6'
    }).addTo(state.fieldTripsLayerGroup);
  }
  addExpandedCourseMarkers(sorted);
}

/**
 * 未展開コース配列を画面座標グリッドバケット（108×34px）で O(K) クラスタリングする
 */
function clusterCourseEntries(courseEntries, map) {
  if (!map) {
    return courseEntries.map((entry) => ({ courses: [entry], latlng: entry.latlng, point: entry.point }));
  }
  const CELL_W = 108;
  const CELL_H = 34;
  const grid = new Map();
  const clusters = [];

  courseEntries.forEach((entry) => {
    if (!entry.point) {
      clusters.push({ courses: [entry], latlng: entry.latlng, point: null });
      return;
    }
    const cx = Math.floor(entry.point.x / CELL_W);
    const cy = Math.floor(entry.point.y / CELL_H);
    let matched = null;

    for (let gx = cx - 1; gx <= cx + 1 && !matched; gx += 1) {
      for (let gy = cy - 1; gy <= cy + 1 && !matched; gy += 1) {
        const bucket = grid.get(`${gx},${gy}`);
        if (!bucket) {
          continue;
        }
        for (let k = 0; k < bucket.length; k += 1) {
          const cl = bucket[k];
          if (Math.abs(cl.point.x - entry.point.x) < CELL_W && Math.abs(cl.point.y - entry.point.y) < CELL_H) {
            matched = cl;
            break;
          }
        }
      }
    }

    if (matched) {
      const oldKey = `${Math.floor(matched.point.x / CELL_W)},${Math.floor(matched.point.y / CELL_H)}`;
      matched.courses.push(entry);
      const total = matched.courses.length;
      const avgLat = matched.courses.reduce((s, c) => s + c.latlng.lat, 0) / total;
      const avgLng = matched.courses.reduce((s, c) => s + c.latlng.lng, 0) / total;
      matched.latlng = L.latLng(avgLat, avgLng);
      matched.point = map.latLngToContainerPoint(matched.latlng);
      const newKey = `${Math.floor(matched.point.x / CELL_W)},${Math.floor(matched.point.y / CELL_H)}`;
      if (newKey !== oldKey) {
        const oldBucket = grid.get(oldKey);
        if (oldBucket) {
          const idx = oldBucket.indexOf(matched);
          if (idx >= 0) {
            oldBucket.splice(idx, 1);
          }
        }
        if (!grid.has(newKey)) {
          grid.set(newKey, []);
        }
        grid.get(newKey).push(matched);
      }
    } else {
      const cl = { courses: [entry], latlng: entry.latlng, point: entry.point };
      clusters.push(cl);
      const cellKey = `${cx},${cy}`;
      if (!grid.has(cellKey)) {
        grid.set(cellKey, []);
      }
      grid.get(cellKey).push(cl);
    }
  });
  return clusters;
}

/**
 * 指定した巡検コースを展開し、フィルタ・設定・UI・地図表示を同期する
 */
function activateFieldTripCourse(courseKey, sample = null, { fitItems = null, maxZoom = 16 } = {}) {
  if (sample) {
    if (state.fieldTripYear !== 'all') {
      state.fieldTripYear = String(sample.year || 'all');
      state.settings.fieldTripYear = state.fieldTripYear;
    }
    state.fieldTripCourse = sample.course_abbr || 'all';
    state.settings.fieldTripCourse = state.fieldTripCourse;
  }
  state.expandedFieldTripCourses.clear();
  state.expandedFieldTripCourses.add(courseKey);
  if (sample) {
    populateFieldTripFilters();
  }
  saveSettings();
  syncSettingsUI();
  renderFieldTripMarkers();
  renderFieldTripList();
  schedulePermalinkSync();

  if (Array.isArray(fitItems) && fitItems.length > 0 && state.map) {
    const bounds = L.latLngBounds(fitItems.map((it) => it.latlng));
    const fitPad = getMapFitPadding();
    state.map.fitBounds(bounds, {
      paddingTopLeft: [Math.max(fitPad.paddingTopLeft[0], 40), 40],
      paddingBottomRight: [Math.max(fitPad.paddingBottomRight[0], 40), Math.max(fitPad.paddingBottomRight[1], 40)],
      maxZoom,
      animate: true
    });
  } else {
    fitExpandedFieldTrips();
  }
}

/**
 * 単独ピルおよび複数コース集約クラスタピルを地図へ描画する
 */
function renderUnexpandedClusters(clusters, isCompactLod) {
  const dict = t();
  const selectAndExpandCourse = (courseKey, items, sample) => {
    activateFieldTripCourse(courseKey, sample, { fitItems: items, maxZoom: 16 });
  };

  clusters.forEach((cluster) => {
    if (cluster.courses.length === 1) {
      const { courseKey, items, latlng } = cluster.courses[0];
      const sample = items[0].props;
      const pillLabel = isCompactLod
        ? (sample.course_abbr || String(sample.year || '')).trim()
        : `${sample.year || ''} ${sample.course_abbr || ''}`.trim();
      const pillEl = el('div', { className: 'field-trip-course-pill', dataset: { tripCategory: sample.category } },
        el('span', {}, pillLabel),
        el('span', { className: 'field-trip-course-pill-count' }, String(items.length))
      );

      const clusterIcon = L.divIcon({
        className: 'field-trip-course-cluster-icon',
        html: pillEl.outerHTML,
        iconSize: [0, 0]
      });
      const clusterMarker = L.marker(latlng, { icon: clusterIcon, pane: 'fieldTripsPane', keyboard: true });
      clusterMarker.bindTooltip(`${sample.year || ''}${dict.fieldTripYearSuffix} ${sample.course_name || sample.course_abbr || ''}`.trim(), {
        direction: 'top',
        offset: [0, -18]
      });
      clusterMarker.on('click', () => selectAndExpandCourse(courseKey, items, sample));
      clusterMarker.addTo(state.fieldTripsLayerGroup);
      return;
    }

    const clusterCategories = new Set(
      cluster.courses.map((c) => (c.items[0] && c.items[0].props ? c.items[0].props.category : '')).filter(Boolean)
    );
    const pillEl = el('div', {
      className: 'field-trip-cluster-pill',
      dataset: { tripCategory: clusterCategories.size === 1 ? Array.from(clusterCategories)[0] : '' }
    }, dict.fieldTripClusterCourses(cluster.courses.length));

    const clusterIcon = L.divIcon({
      className: 'field-trip-course-cluster-icon',
      html: pillEl.outerHTML,
      iconSize: [0, 0]
    });
    const clusterMarker = L.marker(cluster.latlng, { icon: clusterIcon, pane: 'fieldTripsPane', keyboard: true });
    const courseNames = cluster.courses.map((c) => {
      const s = c.items[0].props;
      return `${s.year || ''} ${s.course_abbr || ''}`.trim();
    });
    clusterMarker.bindTooltip(courseNames.join(' / '), { direction: 'top', offset: [0, -18] });
    clusterMarker.on('click', () => {
      if (!state.map) {
        return;
      }
      const allLatLngs = cluster.courses.flatMap((c) => c.items.map((it) => it.latlng));
      const bounds = L.latLngBounds(allLatLngs);
      const canZoomMore = state.map.getZoom() < Math.min(13, state.map.getMaxZoom() - 1);
      const spanLat = bounds.getNorth() - bounds.getSouth();
      const spanLng = bounds.getEast() - bounds.getWest();
      if (canZoomMore && (spanLat > 0.02 || spanLng > 0.02)) {
        state.map.fitBounds(bounds, { ...getMapFitPadding(), maxZoom: 14, animate: true });
        return;
      }

      const wrap = el('div', { className: 'field-trip-cluster-popup-list' },
        el('div', { className: 'field-trip-cluster-popup-title' }, dict.fieldTripClusterSelectTitle),
        ...cluster.courses.map(({ courseKey, items }) => {
          const s = items[0].props;
          return el('button', {
            type: 'button',
            className: 'field-trip-cluster-popup-btn',
            dataset: { tripCategory: s.category },
            onClick: () => {
              state.map.closePopup();
              selectAndExpandCourse(courseKey, items, s);
            }
          },
            el('span', { className: 'field-trip-cluster-popup-name' },
              el('span', { className: 'field-trip-category-dot', 'aria-hidden': 'true' }),
              el('span', {}, `${s.year || ''} ${s.course_abbr || ''}`.trim())
            ),
            el('span', {}, dict.fieldTripCount(items.length))
          );
        })
      );

      L.popup({ className: 'field-trip-leaflet-popup', maxWidth: 280 })
        .setLatLng(cluster.latlng)
        .setContent(wrap)
        .openOn(state.map);
    });
    clusterMarker.addTo(state.fieldTripsLayerGroup);
  });
}

/**
 * 絞り込み条件・展開状態に応じて巡検スポットマーカーを描画する
 */
export function renderFieldTripMarkers() {
  if (!state.fieldTripsLayerGroup) {
    return;
  }
  state.fieldTripsLayerGroup.clearLayers();
  const filtered = getFilteredFieldTripItems();
  if (filtered.length === 0) {
    syncFieldTripActiveBar();
    return;
  }

  const courseGroups = new Map();
  filtered.forEach((item) => {
    const key = getCourseKey(item.props);
    if (!courseGroups.has(key)) {
      courseGroups.set(key, []);
    }
    courseGroups.get(key).push(item);
  });

  const hasAnyExpanded = Array.from(courseGroups.keys()).some((k) => state.expandedFieldTripCourses.has(k));
  if (hasAnyExpanded) {
    courseGroups.forEach((items, courseKey) => {
      if (state.expandedFieldTripCourses.has(courseKey)) {
        renderExpandedCourseOnMap(items);
      }
    });
    syncFieldTripActiveBar();
    return;
  }

  const zoom = state.map ? state.map.getZoom() : CONFIG.INITIAL_ZOOM;
  const isCompactLod = zoom < 7;
  const courseEntries = [];
  courseGroups.forEach((items, courseKey) => {
    const avgLat = items.reduce((s, it) => s + it.latlng.lat, 0) / items.length;
    const avgLng = items.reduce((s, it) => s + it.latlng.lng, 0) / items.length;
    const latlng = L.latLng(avgLat, avgLng);
    const point = state.map ? state.map.latLngToContainerPoint(latlng) : null;
    courseEntries.push({ courseKey, items, latlng, point });
  });

  const clusters = clusterCourseEntries(courseEntries, state.map);
  renderUnexpandedClusters(clusters, isCompactLod);
  syncFieldTripActiveBar();
}

/**
 * 展開中の巡検コースの全地点へズームする（他の未展開コースは開かない）
 */
export function fitExpandedFieldTrips() {
  if (!state.map) {
    return;
  }
  const filtered = getFilteredFieldTripItems();
  const expandedItems = filtered.filter((it) =>
    state.expandedFieldTripCourses.has(getCourseKey(it.props))
  );
  const targetItems = expandedItems.length > 0 ? expandedItems : filtered;
  if (targetItems.length === 0) {
    return;
  }
  const bounds = L.latLngBounds(targetItems.map((it) => it.latlng));
  const fitPad = getMapFitPadding();
  state.map.fitBounds(bounds, {
    paddingTopLeft: [Math.max(fitPad.paddingTopLeft[0], 40), 40],
    paddingBottomRight: [Math.max(fitPad.paddingBottomRight[0], 40), Math.max(fitPad.paddingBottomRight[1], 40)],
    maxZoom: 16,
    animate: true
  });
}

/**
 * 絞り込み中の巡検スポット全体へズームする
 */
export function fitFilteredFieldTrips() {
  if (!state.map) {
    return;
  }
  const filtered = getFilteredFieldTripItems();
  if (filtered.length === 0) {
    return;
  }
  const uniqueKeys = new Set(filtered.map((it) => getCourseKey(it.props)));
  if (uniqueKeys.size === 1) {
    state.expandedFieldTripCourses.clear();
    state.expandedFieldTripCourses.add(Array.from(uniqueKeys)[0]);
    renderFieldTripMarkers();
    renderFieldTripList();
    schedulePermalinkSync();
  }
  if (!state.showFieldTrips) {
    setFieldTripsVisible(true);
  }
  const bounds = L.latLngBounds(filtered.map((it) => it.latlng));
  state.map.fitBounds(bounds, { ...getMapFitPadding(), maxZoom: 12, animate: true });
  if (window.innerWidth <= 720) {
    switchMobileView('map');
  }
}

/**
 * 巡検スポットレイヤーの表示/非表示を切り替える
 */
export function setFieldTripsVisible(visible) {
  state.showFieldTrips = Boolean(visible);
  state.settings.showFieldTrips = state.showFieldTrips;
  if (!state.showFieldTrips) {
    if (state.map) {
      state.map.closePopup();
    }
    state.expandedFieldTripCourses.clear();
    if (state.fieldTripCourse !== 'all') {
      state.fieldTripCourse = 'all';
      state.settings.fieldTripCourse = 'all';
      populateFieldTripFilters();
    }
    renderFieldTripMarkers();
    renderFieldTripList();
    schedulePermalinkSync();
  }
  saveSettings();
  syncSettingsUI();

  if (!state.map || !state.fieldTripsLayerGroup) {
    return;
  }
  if (state.showFieldTrips) {
    if (!state.map.hasLayer(state.fieldTripsLayerGroup)) {
      state.fieldTripsLayerGroup.addTo(state.map);
    }
  } else if (state.map.hasLayer(state.fieldTripsLayerGroup)) {
    state.map.removeLayer(state.fieldTripsLayerGroup);
  }
  syncFieldTripActiveBar();
}

/**
 * 絞り込み中の巡検コース（先頭1コースのみ）を展開して画面全体にフィットする
 */
export function expandAllFieldTrips() {
  const filtered = getFilteredFieldTripItems();
  if (filtered.length === 0) {
    return;
  }
  if (!state.showFieldTrips) {
    setFieldTripsVisible(true);
  }
  const first = filtered[0];
  activateFieldTripCourse(getCourseKey(first.props));
}

/**
 * 展開中の巡検コースをすべて折りたたみ、コースピル表示に戻す
 */
export function collapseAllFieldTrips() {
  if (state.map) {
    state.map.closePopup();
  }
  state.expandedFieldTripCourses.clear();
  if (state.fieldTripCourse !== 'all') {
    state.fieldTripCourse = 'all';
    state.settings.fieldTripCourse = 'all';
    populateFieldTripFilters();
    syncSettingsUI();
  }
  renderFieldTripMarkers();
  renderFieldTripList();
  schedulePermalinkSync();
}

/**
 * 年・コースフィルタ変更時の共通ハンドラ
 */
export function updateFieldTripFilter(yearValue, courseValue) {
  state.fieldTripYear = yearValue || 'all';
  state.fieldTripCourse = courseValue || 'all';
  if (state.fieldTripCourse === 'all') {
    state.expandedFieldTripCourses.clear();
  }
  populateFieldTripFilters();
  state.settings.fieldTripYear = state.fieldTripYear;
  state.settings.fieldTripCourse = state.fieldTripCourse;
  saveSettings();
  syncSettingsUI();
  renderFieldTripMarkers();
  renderFieldTripList();
  schedulePermalinkSync();
}

/**
 * 指定した巡検スポットへズームしてポップアップを開く
 */
export function focusFieldTripSpot(ftItem) {
  if (!ftItem || !state.map) {
    return;
  }
  if (!state.showFieldTrips) {
    setFieldTripsVisible(true);
  }
  if (
    state.selectedFieldTripCategories.size > 0 &&
    ftItem.props.category &&
    !state.selectedFieldTripCategories.has(ftItem.props.category)
  ) {
    state.selectedFieldTripCategories.add(ftItem.props.category);
    state.settings.fieldTripCategories = Array.from(state.selectedFieldTripCategories);
    renderFieldTripCategoryChips();
  }
  if (state.fieldTripYear !== 'all' && String(ftItem.props.year) !== state.fieldTripYear) {
    state.fieldTripYear = 'all';
    state.settings.fieldTripYear = 'all';
  }
  if (state.fieldTripCourse !== 'all' && ftItem.props.course_abbr !== state.fieldTripCourse) {
    state.fieldTripCourse = 'all';
    state.settings.fieldTripCourse = 'all';
  }
  const courseKey = getCourseKey(ftItem.props);
  state.expandedFieldTripCourses.clear();
  state.expandedFieldTripCourses.add(courseKey);
  state.selectedFieldTripId = ftItem.props.id || null;
  populateFieldTripFilters();
  renderFieldTripMarkers();
  saveSettings();
  syncSettingsUI();
  renderFieldTripList();
  schedulePermalinkSync();

  const marker = ensureFieldTripMarker(ftItem);
  const targetZoom = Math.max(state.map.getZoom(), 14);
  const targetLatLng = (marker && typeof marker.getLatLng === 'function')
    ? marker.getLatLng()
    : ftItem.latlng;
  const alreadyCentered =
    state.map.getZoom() === targetZoom && state.map.getCenter().equals(targetLatLng, 1e-5);
  if (!alreadyCentered) {
    state.map.setView(targetLatLng, targetZoom, { animate: true });
  }
  if (window.innerWidth <= 720) {
    switchMobileView('map');
  }
}

/**
 * 左ドロワー内の巡検スポット一覧・コースカードを更新する
 */
export function renderFieldTripList() {
  if (!dom.fieldTripList) {
    return;
  }
  const dict = t();
  const filtered = getFilteredFieldTripItems();

  if (state.fieldTripCourse === 'all') {
    if (dom.fieldTripListLabel) {
      dom.fieldTripListLabel.textContent = dict.fieldTripCourseListLabel;
    }
    if (dom.fieldTripCourseCard) {
      dom.fieldTripCourseCard.hidden = true;
    }

    const courseMap = new Map();
    filtered.forEach((it) => {
      const key = getCourseKey(it.props);
      if (!courseMap.has(key)) {
        courseMap.set(key, []);
      }
      courseMap.get(key).push(it);
    });

    if (dom.fieldTripCount) {
      dom.fieldTripCount.textContent = dict.fieldTripCoursesCount(courseMap.size);
    }

    dom.fieldTripList.innerHTML = '';
    if (courseMap.size === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'result-list-note';
      emptyLi.textContent = dict.fieldTripEmpty;
      dom.fieldTripList.appendChild(emptyLi);
      return;
    }

    const fragment = document.createDocumentFragment();
    courseMap.forEach((items, courseKey) => {
      const sample = items[0].props;
      const btn = el('button', {
        type: 'button',
        className: `result-list-item${state.expandedFieldTripCourses.has(courseKey) ? ' is-selected' : ''}`,
        onClick: () => {
          activateFieldTripCourse(courseKey, sample);
        }
      },
        el('div', { className: 'field-trip-list-item-row', dataset: { tripCategory: sample.category } },
          el('span', { className: 'field-trip-course-pill-badge' }, String(sample.year || '')),
          el('div', { className: 'field-trip-list-text' },
            el('div', { className: 'field-trip-list-title' }, `${sample.course_abbr || ''} (${items.length}${dict.fieldTripStopsSuffix})`),
            el('div', { className: 'field-trip-list-sub' }, sample.course_name || '')
          )
        )
      );
      fragment.appendChild(el('li', {}, btn));
    });
    dom.fieldTripList.appendChild(fragment);
    return;
  }

  if (dom.fieldTripListLabel) {
    dom.fieldTripListLabel.textContent = dict.fieldTripListLabel;
  }
  if (dom.fieldTripCount) {
    dom.fieldTripCount.textContent = dict.fieldTripCount(filtered.length);
  }

  if (dom.fieldTripCourseCard) {
    if (filtered.length > 0) {
      const sample = filtered[0].props;
      dom.fieldTripCourseCard.innerHTML = '';
      if (sample.category) {
        dom.fieldTripCourseCard.dataset.tripCategory = sample.category;
      } else {
        delete dom.fieldTripCourseCard.dataset.tripCategory;
      }

      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'field-trip-back-btn';
      backBtn.textContent = dict.fieldTripBackToCourses;
      backBtn.addEventListener('click', () => {
        updateFieldTripFilter(state.fieldTripYear, 'all');
      });
      dom.fieldTripCourseCard.appendChild(backBtn);

      const metaEl = document.createElement('div');
      metaEl.className = 'field-trip-course-card-meta';
      metaEl.textContent = `${sample.year}${dict.fieldTripYearSuffix} ・ ${sample.course_abbr}`;
      const titleEl = document.createElement('h3');
      titleEl.className = 'field-trip-course-card-title';
      titleEl.textContent = sample.course_name || sample.course_abbr;
      dom.fieldTripCourseCard.append(metaEl, titleEl);

      if (sample.authors) {
        const authorsEl = document.createElement('div');
        authorsEl.className = 'field-trip-active-authors';
        authorsEl.textContent = `${dict.authorsLabel}: ${sample.authors}`;
        dom.fieldTripCourseCard.appendChild(authorsEl);
      }

      const courseKey = getCourseKey(sample);
      const isCourseExpanded = state.expandedFieldTripCourses.has(courseKey);
      const courseActions = document.createElement('div');
      courseActions.className = 'field-trip-course-actions';

      if (isSafeUrl(sample.guidebook_url)) {
        const link = document.createElement('a');
        link.className = 'field-trip-guidebook-btn';
        link.href = sample.guidebook_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = dict.fieldTripOpenGuidebook;
        courseActions.appendChild(link);
      }

      const matchedMap = getOverlayCandidateForStops(filtered);
      if (matchedMap) {
        const overlayBtn = document.createElement('button');
        overlayBtn.type = 'button';
        overlayBtn.className = 'field-trip-course-toggle-btn field-trip-course-overlay-btn';
        overlayBtn.textContent = dict.fieldTripOverlayMapHere;
        overlayBtn.addEventListener('click', () => {
          addOverlayForItem(matchedMap);
        });
        courseActions.appendChild(overlayBtn);
      }

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'field-trip-course-toggle-btn';
      toggleBtn.textContent = isCourseExpanded ? dict.fieldTripCollapseMap : dict.fieldTripExpandMap;
      toggleBtn.addEventListener('click', () => {
        if (state.expandedFieldTripCourses.has(courseKey)) {
          collapseAllFieldTrips();
        } else {
          expandAllFieldTrips();
        }
      });
      courseActions.appendChild(toggleBtn);
      dom.fieldTripCourseCard.appendChild(courseActions);
      dom.fieldTripCourseCard.hidden = false;
    } else {
      dom.fieldTripCourseCard.hidden = true;
    }
  }

  dom.fieldTripList.innerHTML = '';
  if (filtered.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'result-list-note';
    emptyLi.textContent = dict.fieldTripEmpty;
    dom.fieldTripList.appendChild(emptyLi);
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach((ftItem) => {
    const { props } = ftItem;
    const isSelected = Boolean(state.selectedFieldTripId && state.selectedFieldTripId === props.id);
    const btn = el('button', {
      type: 'button',
      className: `result-list-item${isSelected ? ' is-selected' : ''}`,
      onClick: () => focusFieldTripSpot(ftItem)
    },
      el('div', { className: 'field-trip-list-item-row', dataset: { tripCategory: props.category } },
        el('span', { className: 'field-trip-list-badge' }, props.stop_no || '★'),
        el('div', { className: 'field-trip-list-text' },
          el('div', { className: 'field-trip-list-title' }, props.stop_name || props.stop_abbr || ''),
          el('div', { className: 'field-trip-list-sub' }, props.description || `${props.year} ${props.course_abbr}`)
        )
      )
    );
    fragment.appendChild(el('li', {}, btn));
  });
  dom.fieldTripList.appendChild(fragment);
}

/**
 * 左ドロワーの表示モード（地質図 / 巡検スポット）を切り替える
 */
export function switchDrawerMode(mode) {
  if (mode !== 'maps' && mode !== 'trips') {
    return;
  }
  state.drawerMode = mode;
  if (dom.drawerTabMaps) {
    const isMaps = mode === 'maps';
    dom.drawerTabMaps.classList.toggle('is-active', isMaps);
    dom.drawerTabMaps.setAttribute('aria-selected', String(isMaps));
  }
  if (dom.drawerTabTrips) {
    const isTrips = mode === 'trips';
    dom.drawerTabTrips.classList.toggle('is-active', isTrips);
    dom.drawerTabTrips.setAttribute('aria-selected', String(isTrips));
  }
  if (dom.drawerMapsPane) {
    dom.drawerMapsPane.hidden = mode !== 'maps';
  }
  if (dom.drawerTripsPane) {
    dom.drawerTripsPane.hidden = mode !== 'trips';
  }
  if (mode === 'trips') {
    renderFieldTripList();
  }
}

/**
 * 巡検スポット GeoJSON を読み込む
 */
export async function fetchFieldTrips({ onLoaded } = {}) {
  try {
    const response = await fetch(CONFIG.FIELD_TRIPS_GEOJSON_URL, { cache: 'no-cache' });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    const features = Array.isArray(data && data.features) ? data.features : [];
    state.fieldTripItems = features
      .filter((f) => f && f.geometry && f.geometry.type === 'Point' && Array.isArray(f.geometry.coordinates))
      .map((f) => {
        const [lon, lat] = f.geometry.coordinates;
        const props = f.properties || {};
        const latlng = L.latLng(lat, lon);
        const normalizedSearchText = normalizeSearchText(
          `${props.id || ''} ${props.year || ''} ${props.course_abbr || ''} ${props.course_name || ''} ${props.authors || ''} ${props.stop_no || ''} ${props.stop_abbr || ''} ${props.stop_name || ''} ${props.description || ''}`
        );
        return { props, latlng, marker: null, normalizedSearchText };
      });

    populateFieldTripFilters();
    renderFieldTripMarkers();
    renderFieldTripList();
    if (typeof onLoaded === 'function') {
      onLoaded();
    }
  } catch {
    // ignore optional field trips load failure
  }
}
