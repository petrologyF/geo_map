import { CONFIG } from './config.js';
import { el } from './dom.js';
import { t } from './i18n.js';
import { getMapFitPadding, setLeftDrawerCollapsed, setStatusMessage, switchMobileView, syncSettingsUI } from './map.js';
import { computeIntersectionArea, getItemBounds, getLocalizedMeta, styleByScale } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { debouncedSaveSettings, saveSettings, state, dom } from './state.js';

const loupeCache = {
  rafId: 0,
  lastClientX: 0,
  lastClientY: 0,
  legendRect: null,
  inspectorRect: null,
  activeSrc: ''
};

/**
 * 凡例・断面図画像とインスペクタの矩形を計測してキャッシュする
 */
export function refreshLoupeRects() {
  if (dom.legendImage && !dom.legendImage.hidden) {
    loupeCache.legendRect = dom.legendImage.getBoundingClientRect();
  } else {
    loupeCache.legendRect = null;
  }
  if (dom.rightInspector && dom.rightInspector.classList.contains('is-open')) {
    loupeCache.inspectorRect = dom.rightInspector.getBoundingClientRect();
  } else {
    loupeCache.inspectorRect = null;
  }
}

/**
 * 凡例ルーペを非表示にする
 */
export function hideLegendLoupe() {
  if (loupeCache.rafId) {
    cancelAnimationFrame(loupeCache.rafId);
    loupeCache.rafId = 0;
  }
  if (dom.legendLoupe) {
    dom.legendLoupe.classList.remove('is-visible');
  }
  if (dom.legendLensIndicator) {
    dom.legendLensIndicator.classList.remove('is-visible');
  }
}

function resetLoupeImageCache() {
  loupeCache.activeSrc = '';
  if (dom.legendLoupe) {
    dom.legendLoupe.style.backgroundImage = '';
  }
}

function renderLoupeFrame() {
  loupeCache.rafId = 0;
  if (dom.legendImage.hidden || !dom.legendImage.src || !dom.legendImage.complete || dom.legendImage.naturalWidth === 0) {
    hideLegendLoupe();
    return;
  }

  const rect = loupeCache.legendRect || dom.legendImage.getBoundingClientRect();
  loupeCache.legendRect = rect;
  if (!rect || rect.width === 0 || rect.height === 0) {
    hideLegendLoupe();
    return;
  }

  const x = loupeCache.lastClientX - rect.left;
  const y = loupeCache.lastClientY - rect.top;

  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    hideLegendLoupe();
    return;
  }

  const zoom = CONFIG.LOUPE_ZOOM;
  const size = 220;
  const half = size / 2;
  const margin = 12;

  let loupeCenterX;
  if (window.innerWidth > 720 && dom.rightInspector.classList.contains('is-open')) {
    const inspectorRect = loupeCache.inspectorRect || dom.rightInspector.getBoundingClientRect();
    loupeCache.inspectorRect = inspectorRect;
    loupeCenterX = Math.max(margin + half, inspectorRect.left - 12 - half);
  } else {
    loupeCenterX = Math.min(window.innerWidth - margin - half, Math.max(margin + half, loupeCache.lastClientX));
  }
  const loupeCenterY = Math.min(window.innerHeight - margin - half, Math.max(margin + half, loupeCache.lastClientY));

  if (loupeCache.activeSrc !== dom.legendImage.src) {
    loupeCache.activeSrc = dom.legendImage.src;
    dom.legendLoupe.style.backgroundImage = `url("${dom.legendImage.src}")`;
  }
  dom.legendLoupe.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
  dom.legendLoupe.style.backgroundPosition = `${-(x * zoom - half)}px ${-(y * zoom - half)}px`;
  dom.legendLoupe.style.transform = `translate3d(${loupeCenterX - half}px, ${loupeCenterY - half}px, 0) scale(1)`;
  dom.legendLoupe.classList.add('is-visible');

  if (dom.legendLensIndicator) {
    const lensSize = size / zoom;
    const lensHalf = lensSize / 2;
    dom.legendLensIndicator.style.width = `${lensSize}px`;
    dom.legendLensIndicator.style.height = `${lensSize}px`;
    dom.legendLensIndicator.style.transform = `translate3d(${x - lensHalf}px, ${y - lensHalf}px, 0)`;
    dom.legendLensIndicator.classList.add('is-visible');
  }
}

/**
 * 凡例・断面図画像上のマウス位置に応じて rAF でルーペ更新をスケジュールする
 */
export function updateLegendLoupe(event) {
  loupeCache.lastClientX = event.clientX;
  loupeCache.lastClientY = event.clientY;
  if (!loupeCache.rafId) {
    loupeCache.rafId = requestAnimationFrame(renderLoupeFrame);
  }
}

export function onLegendImageError() {
  hideLegendLoupe();
  dom.legendImage.hidden = true;
  resetLoupeImageCache();
  dom.legendOpenLink.hidden = true;
  dom.legendMapName.textContent = t().legendNone;
}

/**
 * シームレス V2 地点照会結果の DOM ノードを構築する
 */
export function buildSeamlessGeologyNode(record) {
  const dict = t();
  const root = document.createElement('div');
  root.className = 'seamless-geology-card';

  if (!record || record.status === 'loading') {
    const status = document.createElement('div');
    status.className = 'seamless-popup-status';
    status.textContent = dict.seamlessLoading;
    root.appendChild(status);
    return root;
  }

  if (record.status === 'error') {
    const status = document.createElement('div');
    status.className = 'seamless-popup-status';
    status.textContent = dict.seamlessFetchError;
    root.appendChild(status);
    return root;
  }

  const data = record.data || {};
  const isEn = state.lang === 'en';

  if (!data || !data.symbol) {
    const status = document.createElement('div');
    status.className = 'seamless-popup-status';
    status.textContent = dict.seamlessNoData;
    root.appendChild(status);
    return root;
  }

  const header = document.createElement('div');
  header.className = 'seamless-geology-header';

  const swatch = document.createElement('span');
  swatch.className = 'seamless-swatch';
  const hasRgb =
    data.r !== undefined && data.r !== null && data.r !== '' &&
    data.g !== undefined && data.g !== null && data.g !== '' &&
    data.b !== undefined && data.b !== null && data.b !== '' &&
    Number.isFinite(Number(data.r)) &&
    Number.isFinite(Number(data.g)) &&
    Number.isFinite(Number(data.b));
  if (hasRgb) {
    swatch.style.backgroundColor = `rgb(${Number(data.r)}, ${Number(data.g)}, ${Number(data.b)})`;
  } else {
    const rawColor = String(data.color || '').replace(/^#/, '');
    if (/^[0-9a-fA-F]{3,8}$/.test(rawColor)) {
      swatch.style.backgroundColor = `#${rawColor}`;
    }
  }

  const symbolEl = document.createElement('span');
  symbolEl.className = 'seamless-symbol';
  symbolEl.textContent = data.symbol;

  const coordsEl = document.createElement('span');
  coordsEl.className = 'seamless-coords';
  coordsEl.textContent = `${record.lat.toFixed(4)}, ${record.lng.toFixed(4)}`;

  header.append(swatch, symbolEl, coordsEl);
  root.appendChild(header);

  const metaList = document.createElement('dl');
  metaList.className = 'seamless-geology-meta';
  const rows = [
    [dict.seamlessGroupLabel, isEn ? (data.group_en || data.group_ja) : (data.group_ja || data.group_en)],
    [dict.seamlessAgeLabel, isEn ? (data.formationAge_en || data.formationAge_ja) : (data.formationAge_ja || data.formationAge_en)],
    [dict.seamlessLithologyLabel, isEn ? (data.lithology_en || data.lithology_ja) : (data.lithology_ja || data.lithology_en)]
  ].filter(([, v]) => Boolean(v));

  rows.forEach(([k, v]) => {
    const dt = document.createElement('dt');
    dt.textContent = k;
    const dd = document.createElement('dd');
    dd.textContent = v;
    metaList.append(dt, dd);
  });

  if (rows.length > 0) {
    root.appendChild(metaList);
  }

  return root;
}

/**
 * 右インスペクタ内のシームレス地点サマリーカードを更新する
 */
export function renderSeamlessPointCard() {
  if (!dom.seamlessPointCard) {
    return;
  }
  const showCard = Boolean(state.seamlessLayer && state.lastSeamlessPoint && state.inspectedItem === state.seamlessVirtualItem);
  if (!showCard) {
    dom.seamlessPointCard.hidden = true;
    dom.seamlessPointCard.innerHTML = '';
    return;
  }
  dom.seamlessPointCard.innerHTML = '';
  dom.seamlessPointCard.appendChild(buildSeamlessGeologyNode(state.lastSeamlessPoint));
  dom.seamlessPointCard.hidden = false;
}

/**
 * 右インスペクタと再展開タブの表示状態を同期する
 */
export function syncRightInspectorVisibility() {
  const hasContent = Boolean(state.inspectedItem) || state.activeOverlays.length > 0;
  if (!hasContent) {
    hideLegendLoupe();
    dom.rightInspector.classList.remove('is-open');
    dom.rightInspector.inert = true;
    dom.reopenRightBtn.classList.remove('is-open');
    dom.reopenRightBtn.inert = true;
    dom.mobileLegendTab.hidden = true;
    dom.appLayout.classList.remove('has-right-inspector');
    if (dom.appLayout.dataset.mobileView === 'legend') {
      switchMobileView('map');
    }
    return;
  }

  dom.mobileLegendTab.hidden = false;
  if (state.isRightInspectorCollapsed) {
    dom.rightInspector.classList.remove('is-open');
    dom.rightInspector.inert = true;
    dom.reopenRightBtn.classList.add('is-open');
    dom.reopenRightBtn.inert = false;
    dom.appLayout.classList.remove('has-right-inspector');
  } else {
    dom.rightInspector.classList.add('is-open');
    dom.rightInspector.inert = false;
    dom.reopenRightBtn.classList.remove('is-open');
    dom.reopenRightBtn.inert = true;
    dom.appLayout.classList.add('has-right-inspector');
    if (window.innerWidth > 720 && window.innerWidth < 1100 && !state.isLeftDrawerCollapsed) {
      setLeftDrawerCollapsed(true);
    }
  }
}

/**
 * 右インスペクタの折りたたみ状態を切り替える
 */
export function setRightInspectorCollapsed(collapsed) {
  state.isRightInspectorCollapsed = Boolean(collapsed);
  if (state.isRightInspectorCollapsed) {
    hideLegendLoupe();
  }
  renderSeamlessPointCard();
  syncRightInspectorVisibility();
}

/**
 * 共通スキーマの display 設定から Leaflet レイヤーを生成する
 */
export function createGeologicalLayer(meta, layerBounds = null, zIndex = 300, customOpacity = null) {
  if (!meta.overlayType || !meta.overlayUrl) {
    return null;
  }

  const commonOptions = {
    opacity: typeof customOpacity === 'number' ? customOpacity : state.overlayOpacity,
    attribution: meta.attribution,
    zIndex,
    updateWhenZooming: false,
    updateWhenIdle: false,
    keepBuffer: 6,
    ...(layerBounds && layerBounds.isValid() ? { bounds: layerBounds } : {})
  };

  if (meta.overlayType === 'xyz') {
    return L.tileLayer(meta.overlayUrl, {
      ...commonOptions,
      minZoom: CONFIG.MIN_ZOOM,
      maxNativeZoom: meta.zoomMax,
      maxZoom: CONFIG.MAX_ZOOM,
      errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    });
  }

  if (meta.overlayType === 'wms') {
    return L.tileLayer.wms(meta.overlayUrl, {
      ...CONFIG.WMS_OPTIONS,
      layers: meta.wmsLayers || CONFIG.WMS_OPTIONS.layers,
      ...commonOptions,
      minZoom: CONFIG.MIN_ZOOM,
      maxNativeZoom: meta.zoomMax,
      maxZoom: CONFIG.MAX_ZOOM
    });
  }

  if (meta.overlayType === 'raster' && meta.rasterImageUrl && layerBounds && layerBounds.isValid()) {
    return L.imageOverlay(meta.rasterImageUrl, layerBounds, {
      opacity: commonOptions.opacity,
      attribution: meta.attribution,
      zIndex
    });
  }

  return null;
}

/**
 * オーバーレイ中の図幅かどうかを判定する
 */
export function isItemOverlayed(item) {
  return state.activeOverlays.some((entry) => entry.item === item) || state.selectedItem === item;
}

/**
 * リスト上の選択状態クラスを同期する
 */
export function syncSelectedListItem() {
  const buttons = dom.resultList.querySelectorAll('.result-list-item');
  buttons.forEach((btn, idx) => {
    const targetItem = state.filteredItems[idx];
    btn.classList.toggle('is-selected', isItemOverlayed(targetItem));
  });
}

/**
 * 選択中の図幅の範囲へマップをズームする
 */
export function zoomToMapItem(item) {
  const bounds = getItemBounds(item);
  if (bounds && bounds.isValid() && state.map) {
    state.map.stop();
    const pad = getMapFitPadding();
    state.map.flyToBounds(bounds, {
      ...pad,
      maxZoom: item.meta.zoomMax || CONFIG.MAX_ZOOM,
      duration: 0.65,
      easeLinearity: 0.25
    });
  }
}

function syncOverlayZIndices() {
  state.activeOverlays.forEach((entry, idx) => {
    if (entry.layer && typeof entry.layer.setZIndex === 'function') {
      entry.layer.setZIndex(300 + idx);
    }
  });
}

/**
 * 削除後などにフォールバックとなるインスペクタ表示対象を返す
 */
export function getFallbackInspectorItem() {
  if (state.activeOverlays.length > 0) {
    return state.activeOverlays[state.activeOverlays.length - 1].item;
  }
  if (state.seamlessLayer && state.seamlessVirtualItem) {
    return state.seamlessVirtualItem;
  }
  return null;
}

/**
 * インスペクタ下部の表示（凡例/断面図 または 詳細・PDF）を更新する
 */
export function renderInspectorDetail(item, forceUpdate = false) {
  const dict = t();

  if (!item) {
    state.inspectedItem = null;
    hideLegendLoupe();
    dom.dominantInfoTitle.textContent = '';
    dom.dominantInfoSubtitle.textContent = '';
    dom.dominantInfoSubtitle.hidden = true;
    dom.dominantInfoMeta.innerHTML = '';
    dom.dominantInfoLinks.innerHTML = '';
    dom.legendMapName.textContent = '';
    dom.legendImage.removeAttribute('src');
    resetLoupeImageCache();
    dom.legendOpenLink.href = '#';
    if (dom.seamlessGuideCard) {
      dom.seamlessGuideCard.hidden = true;
      dom.seamlessGuideCard.innerHTML = '';
    }
    dom.rightInspector.classList.remove('is-compact');
    renderSeamlessPointCard();
    syncRightInspectorVisibility();
    return;
  }

  const { meta } = item;
  const loc = getLocalizedMeta(meta);
  const isNewItem = state.inspectedItem !== item;
  state.inspectedItem = item;

  if (!forceUpdate && isNewItem) {
    state.activeSectionIndex = 0;
    if (state.inspectorTab === 'section' && meta.sectionImages.length === 0) {
      state.inspectorTab = 'legend';
    }
    if (state.inspectorTab === 'legend' && !meta.legendImageUrl && meta.sectionImages.length > 0) {
      state.inspectorTab = 'section';
    }
  }

  const { activeTab, hasSections } = syncInspectorTabs(meta);
  renderInspectorMetadata(meta, loc);
  renderInspectorVisualContent(item, meta, loc, activeTab, hasSections);
  renderSeamlessPointCard();
  syncRightInspectorVisibility();
}

function syncInspectorTabs(meta) {
  const dict = t();
  const hasSections = meta.sectionImages.length > 0;
  if (state.inspectorTab === 'section' && !hasSections) {
    state.inspectorTab = 'legend';
  }

  dom.tabLegendBtn.textContent = dict.tabLegend;
  dom.tabSectionBtn.textContent = hasSections ? `${dict.tabSections} (${meta.sectionImages.length})` : dict.tabSections;
  dom.tabSectionBtn.hidden = !hasSections;
  dom.tabDetailBtn.textContent = dict.tabDetail;

  const activeTab = state.inspectorTab;
  [
    [dom.tabLegendBtn, 'legend'],
    [dom.tabSectionBtn, 'section'],
    [dom.tabDetailBtn, 'detail']
  ].forEach(([btn, tabName]) => {
    const isActive = activeTab === tabName;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  return { activeTab, hasSections };
}

function renderInspectorMetadata(meta, loc) {
  const dict = t();
  dom.dominantInfoTitle.textContent = loc.title;
  dom.dominantInfoSubtitle.textContent = loc.subtitle || '';
  dom.dominantInfoSubtitle.hidden = !loc.subtitle;

  const yearText = meta.publishedYear != null ? `${meta.publishedYear}${dict.yearSuffix}` : dict.yearUnknown;
  const typeLabel = dict.mapTypes[meta.mapType] || meta.mapType;
  const volcanoName = state.lang === 'en'
    ? (meta.volcanoNameEn || meta.volcanoNameJa)
    : (meta.volcanoNameJa || meta.volcanoNameEn);
  const metaEntries = [
    [dict.mapTypeFieldLabel, typeLabel],
    ...(volcanoName ? [[dict.volcanoLabel, volcanoName]] : []),
    [dict.yearLabel, yearText],
    [dict.scaleLabel, meta.scale],
    [dict.authorsLabel, loc.authors],
    [dict.providerLabel, loc.providerName],
    [dict.publisherLabel, loc.publisher],
    [dict.regionLabel, loc.region]
  ].filter(([, value]) => Boolean(value));

  dom.dominantInfoMeta.innerHTML = '';
  metaEntries.forEach(([label, value]) => {
    dom.dominantInfoMeta.append(el('dt', {}, label), el('dd', {}, value));
  });

  dom.dominantInfoLinks.innerHTML = '';
  [
    [dict.linkDetail, meta.detailUrl],
    [dict.linkPdf, meta.preferredPdf],
    [dict.linkFullPdf, meta.fullPdfUrl !== meta.preferredPdf ? meta.fullPdfUrl : ''],
    [dict.linkOriginal, meta.originalImageUrl]
  ].forEach(([label, url]) => {
    if (url) {
      dom.dominantInfoLinks.appendChild(
        el('a', { className: 'dominant-info-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, label)
      );
    }
  });
}

function renderInspectorVisualContent(item, meta, loc, activeTab, hasSections) {
  const dict = t();
  hideLegendLoupe();
  if (dom.seamlessGuideCard) {
    dom.seamlessGuideCard.hidden = true;
    dom.seamlessGuideCard.innerHTML = '';
  }
  if (activeTab === 'detail') {
    dom.inspectorVisualPane.hidden = true;
    dom.inspectorDetailPane.hidden = false;
    dom.legendOpenLink.hidden = true;
    dom.rightInspector.classList.remove('is-compact');
    return;
  }

  dom.inspectorVisualPane.hidden = false;
  dom.inspectorDetailPane.hidden = true;

  if (activeTab === 'section' && hasSections) {
    dom.sectionChips.innerHTML = '';
    const fragment = document.createDocumentFragment();
    meta.sectionImages.forEach((sec, idx) => {
      fragment.appendChild(
        el('button', {
          type: 'button',
          className: idx === state.activeSectionIndex ? 'decade-chip is-selected' : 'decade-chip',
          'aria-pressed': String(idx === state.activeSectionIndex),
          onClick: () => {
            state.activeSectionIndex = idx;
            renderInspectorDetail(item, true);
          }
        }, sec.label)
      );
    });
    dom.sectionChips.appendChild(fragment);
    dom.sectionChips.hidden = false;

    const currentSec = meta.sectionImages[state.activeSectionIndex] || meta.sectionImages[0];
    dom.legendMapName.textContent = `${loc.title} (${currentSec.label})`;
    dom.legendImage.src = currentSec.url;
    dom.legendImage.alt = `${loc.title} ${currentSec.label}`;
    dom.legendImage.hidden = false;
    dom.legendOpenLink.href = currentSec.url;
    dom.legendOpenLink.hidden = false;
    dom.rightInspector.classList.remove('is-compact');
    return;
  }

  dom.sectionChips.hidden = true;
  dom.sectionChips.innerHTML = '';
  dom.legendMapName.textContent = loc.title;
  if (meta.legendImageUrl) {
    dom.legendImage.src = meta.legendImageUrl;
    dom.legendImage.alt = `${loc.title} ${dict.tabLegend}`;
    dom.legendImage.hidden = false;
    dom.legendOpenLink.href = meta.legendImageUrl;
    dom.legendOpenLink.hidden = false;
    dom.rightInspector.classList.remove('is-compact');
    return;
  }

  dom.legendImage.removeAttribute('src');
  resetLoupeImageCache();
  dom.legendImage.hidden = true;
  dom.legendOpenLink.href = '#';
  dom.legendOpenLink.hidden = true;

  if ((meta.mapType === 'seamless_geological_map' || item === state.seamlessVirtualItem) && dom.seamlessGuideCard) {
    dom.legendMapName.textContent = loc.title;
    dom.seamlessGuideCard.appendChild(el('p', { className: 'seamless-guide-text' }, dict.seamlessGuideText));
    const guideLinks = el('div', { className: 'seamless-guide-links' });
    [
      [dict.seamlessViewerLink, meta.viewerUrl],
      [dict.seamlessLegendPageLink, meta.catalogUrl]
    ].forEach(([label, url]) => {
      if (url) {
        guideLinks.appendChild(
          el('a', { className: 'dominant-info-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, label)
        );
      }
    });
    if (guideLinks.childElementCount > 0) {
      dom.seamlessGuideCard.appendChild(guideLinks);
    }
    dom.seamlessGuideCard.hidden = false;
  } else {
    dom.legendMapName.textContent = `${loc.title} — ${dict.legendNone}`;
  }
  dom.rightInspector.classList.toggle('is-compact', state.activeOverlays.length === 0);
}

/**
 * 右インスペクタのタブ（凡例 / 断面図 / 詳細・PDF）を切り替える
 */
export function switchInspectorTab(tab) {
  hideLegendLoupe();
  state.inspectorTab = tab;
  if (state.inspectedItem) {
    renderInspectorDetail(state.inspectedItem, true);
  }
}

/**
 * 表示範囲と交差面積が最大のオーバーレイを自動選択する
 */
export function updateAutoInspectedItem() {
  if (!state.map) {
    return;
  }
  const viewBounds = state.map.getBounds();
  const prevPinned = state.pinnedInspectItem;

  if (state.pinnedInspectItem) {
    const stillActive = state.activeOverlays.some((e) => e.item === state.pinnedInspectItem)
      || state.selectedItem === state.pinnedInspectItem;
    const pinArea = stillActive ? computeIntersectionArea(viewBounds, getItemBounds(state.pinnedInspectItem)) : 0;
    if (stillActive && pinArea > 0) {
      return;
    }
    state.pinnedInspectItem = null;
  }

  let bestItem = null;
  let bestArea = 0;
  state.activeOverlays.forEach((entry) => {
    const area = computeIntersectionArea(viewBounds, getItemBounds(entry.item));
    if (area > bestArea) {
      bestArea = area;
      bestItem = entry.item;
    }
  });

  const pinChanged = prevPinned !== state.pinnedInspectItem;
  if (bestItem && bestItem !== state.inspectedItem) {
    renderInspectorDetail(bestItem);
    renderActiveOverlayList();
  } else if (!bestItem && state.activeOverlays.length === 0 && state.seamlessLayer && state.seamlessVirtualItem && !state.inspectedItem) {
    renderInspectorDetail(state.seamlessVirtualItem);
  } else if (pinChanged) {
    renderActiveOverlayList();
  }
}

function moveOverlayOrder(index, delta) {
  const targetIndex = index + delta;
  if (targetIndex < 0 || targetIndex >= state.activeOverlays.length) {
    return;
  }
  const [moved] = state.activeOverlays.splice(index, 1);
  state.activeOverlays.splice(targetIndex, 0, moved);
  syncOverlayZIndices();
  renderActiveOverlayList();
  schedulePermalinkSync();
}

/**
 * 右インスペクタ上部の「表示中の地質図（最大4件）」コンパクトリストを描画する
 */
export function renderActiveOverlayList() {
  const dict = t();
  dom.activeOverlayList.innerHTML = '';
  if (state.activeOverlays.length === 0 && state.seamlessLayer && state.seamlessMeta && state.inspectedItem === state.seamlessVirtualItem) {
    dom.activeWmsName.textContent = getLocalizedMeta(state.seamlessMeta).shortTitle;
  } else {
    dom.activeWmsName.textContent = dict.activeMapsTitle(state.activeOverlays.length, CONFIG.MAX_OVERLAYS);
  }

  if (state.activeOverlays.length === 0) {
    dom.activeOverlaysSection.classList.remove('is-single');
    dom.activeOverlaysSection.hidden = true;
    dom.clearWmsBtn.hidden = true;
    return;
  }

  dom.activeOverlaysSection.classList.toggle('is-single', state.activeOverlays.length === 1);
  dom.activeOverlaysSection.hidden = false;
  dom.clearWmsBtn.hidden = false;
  const showOrderButtons = state.activeOverlays.length >= 2;
  const fragment = document.createDocumentFragment();

  for (let i = state.activeOverlays.length - 1; i >= 0; i -= 1) {
    const entry = state.activeOverlays[i];
    const { item, layer } = entry;
    const { meta } = item;
    const loc = getLocalizedMeta(meta);
    const li = document.createElement('li');
    li.className = 'active-overlay-item';
    if (state.inspectedItem === item) {
      li.classList.add('is-inspecting');
    }

    const topRow = document.createElement('div');
    topRow.className = 'active-overlay-top';

    const label = document.createElement('span');
    label.className = 'active-overlay-label';
    label.textContent = loc.title;
    label.title = loc.title;
    label.addEventListener('click', () => {
      state.selectedItem = item;
      state.pinnedInspectItem = item;
      renderInspectorDetail(item);
      renderActiveOverlayList();
      syncSelectedListItem();
    });

    const btns = document.createElement('div');
    btns.className = 'active-overlay-btns';

    if (state.pinnedInspectItem === item) {
      const pinBadge = document.createElement('button');
      pinBadge.type = 'button';
      pinBadge.className = 'overlay-pin-badge';
      pinBadge.textContent = dict.pinnedLabel;
      pinBadge.title = dict.unpinTitle;
      pinBadge.setAttribute('aria-label', dict.unpinTitle);
      pinBadge.addEventListener('click', (event) => {
        event.stopPropagation();
        state.pinnedInspectItem = null;
        updateAutoInspectedItem();
      });
      btns.appendChild(pinBadge);
    }

    if (showOrderButtons) {
      const upBtn = document.createElement('button');
      upBtn.type = 'button';
      upBtn.className = 'icon-button';
      upBtn.title = dict.moveUpTitle;
      upBtn.disabled = i === state.activeOverlays.length - 1;
      upBtn.setAttribute('aria-label', `${loc.title} ${dict.moveUpTitle}`);
      upBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      upBtn.addEventListener('click', () => moveOverlayOrder(i, 1));

      const downBtn = document.createElement('button');
      downBtn.type = 'button';
      downBtn.className = 'icon-button';
      downBtn.title = dict.moveDownTitle;
      downBtn.disabled = i === 0;
      downBtn.setAttribute('aria-label', `${loc.title} ${dict.moveDownTitle}`);
      downBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      downBtn.addEventListener('click', () => moveOverlayOrder(i, -1));

      btns.append(upBtn, downBtn);
    }

    const zoomBtn = document.createElement('button');
    zoomBtn.type = 'button';
    zoomBtn.className = 'icon-button';
    zoomBtn.title = dict.zoomTitle;
    zoomBtn.setAttribute('aria-label', `${loc.title} ${dict.zoomTitle}`);
    zoomBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
    zoomBtn.addEventListener('click', () => {
      state.selectedItem = item;
      state.pinnedInspectItem = item;
      renderInspectorDetail(item);
      renderActiveOverlayList();
      zoomToMapItem(item);
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'icon-button is-close';
    removeBtn.title = dict.closeTitle;
    removeBtn.setAttribute('aria-label', `${loc.title} ${dict.closeTitle}`);
    removeBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    removeBtn.addEventListener('click', () => removeOverlayByItem(item));

    btns.append(zoomBtn, removeBtn);
    topRow.append(label, btns);

    const opacityRow = document.createElement('div');
    opacityRow.className = 'overlay-item-opacity';
    const currentPct = Math.round((entry.opacity ?? state.overlayOpacity) * 100);

    const itemSlider = document.createElement('input');
    itemSlider.type = 'range';
    itemSlider.className = 'range-slider';
    itemSlider.min = '0';
    itemSlider.max = '100';
    itemSlider.value = String(currentPct);
    itemSlider.setAttribute('aria-label', `${loc.title} opacity`);

    const itemVal = document.createElement('span');
    itemVal.className = 'overlay-item-opacity-val';
    itemVal.textContent = `${currentPct}%`;

    itemSlider.addEventListener('input', () => {
      const pct = Number(itemSlider.value);
      const nextOpacity = pct / 100;
      entry.opacity = nextOpacity;
      state.overlayOpacity = nextOpacity;
      state.settings.overlayOpacity = nextOpacity;
      itemVal.textContent = `${pct}%`;
      if (layer && typeof layer.setOpacity === 'function') {
        layer.setOpacity(nextOpacity);
      }
      debouncedSaveSettings();
    });
    itemSlider.addEventListener('change', () => {
      saveSettings();
      syncSettingsUI();
    });

    opacityRow.append(itemSlider, itemVal);
    li.append(topRow, opacityRow);
    fragment.appendChild(li);
  }

  dom.activeOverlayList.appendChild(fragment);
}

/**
 * 指定された図幅のオーバーレイを解除する
 */
export function removeOverlayByItem(item) {
  const idx = state.activeOverlays.findIndex((entry) => entry.item === item);
  if (idx === -1) {
    return;
  }

  const [removed] = state.activeOverlays.splice(idx, 1);
  if (removed.isLoading) {
    state.loadingLayerCount = Math.max(0, state.loadingLayerCount - 1);
    if (state.loadingLayerCount === 0) {
      dom.wmsStatusDot.classList.remove('is-loading');
    }
  }
  if (state.map && removed.layer) {
    if (typeof removed.layer.off === 'function') {
      removed.layer.off();
    }
    state.map.removeLayer(removed.layer);
  }
  if (removed.item.layer) {
    removed.item.layer.setStyle(styleByScale(removed.item.meta.scaleDenominator, removed.item.meta.mapType));
  }

  if (state.pinnedInspectItem === item) {
    state.pinnedInspectItem = null;
  }
  if (state.selectedItem === item) {
    state.selectedItem = state.activeOverlays.length > 0
      ? state.activeOverlays[state.activeOverlays.length - 1].item
      : null;
  }
  if (state.inspectedItem === item) {
    state.inspectedItem = getFallbackInspectorItem();
  }

  syncOverlayZIndices();
  renderActiveOverlayList();
  syncSelectedListItem();
  renderInspectorDetail(state.inspectedItem);
  updateAutoInspectedItem();
  setStatusMessage('');
  schedulePermalinkSync();
}

/**
 * すべての地質図オーバーレイを閉じる
 */
export function clearAllOverlays() {
  state.activeOverlays.forEach(({ item, layer }) => {
    if (state.map && layer) {
      if (typeof layer.off === 'function') {
        layer.off();
      }
      state.map.removeLayer(layer);
    }
    if (item.layer) {
      item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
    }
  });
  state.activeOverlays = [];
  state.loadingLayerCount = 0;
  dom.wmsStatusDot.classList.remove('is-loading');

  if (state.selectedItem && state.selectedItem.layer) {
    state.selectedItem.layer.setStyle(styleByScale(state.selectedItem.meta.scaleDenominator, state.selectedItem.meta.mapType));
  }
  state.selectedItem = null;
  state.pinnedInspectItem = null;
  state.inspectedItem = getFallbackInspectorItem();

  renderActiveOverlayList();
  syncSelectedListItem();
  renderInspectorDetail(state.inspectedItem);
  setStatusMessage('');
  schedulePermalinkSync();
}

/**
 * 図幅を選択し、オーバーレイ追加（最大4図幅）または詳細・凡例表示を行う
 */
export function addOverlayForItem(item) {
  const { meta } = item;
  const prevSelected = state.selectedItem;
  state.selectedItem = item;
  state.pinnedInspectItem = null;
  state.isRightInspectorCollapsed = false;

  if (prevSelected && prevSelected !== item && !state.activeOverlays.some((e) => e.item === prevSelected)) {
    if (prevSelected.layer) {
      prevSelected.layer.setStyle(styleByScale(prevSelected.meta.scaleDenominator, prevSelected.meta.mapType));
    }
  }

  const existing = state.activeOverlays.find((entry) => entry.item === item);
  if (existing) {
    if (existing.layer && typeof existing.layer.bringToFront === 'function') {
      existing.layer.bringToFront();
    }
    state.activeOverlays.push(...state.activeOverlays.splice(state.activeOverlays.indexOf(existing), 1));
    syncOverlayZIndices();
    renderInspectorDetail(item);
    renderActiveOverlayList();
    syncSelectedListItem();
    schedulePermalinkSync();
    return;
  }

  const layerBounds = getItemBounds(item);
  const overlayLayer = createGeologicalLayer(meta, layerBounds, 300);

  setStatusMessage('');

  if (!overlayLayer) {
    if (prevSelected === item && dom.rightInspector.classList.contains('is-open') && !state.isRightInspectorCollapsed) {
      if (item.layer) {
        item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
      }
      if (state.pinnedInspectItem === item) {
        state.pinnedInspectItem = null;
      }
      state.selectedItem = null;
      state.inspectedItem = getFallbackInspectorItem();
      syncSelectedListItem();
      renderInspectorDetail(state.inspectedItem);
      return;
    }
    if (item.layer) {
      item.layer.setStyle(CONFIG.POLYGON_STYLE.selected);
    }
    syncSelectedListItem();
    renderInspectorDetail(item, true);
    return;
  }

  if (state.activeOverlays.length >= CONFIG.MAX_OVERLAYS) {
    removeOverlayByItem(state.activeOverlays[0].item);
  }

  const overlayEntry = { item, layer: overlayLayer, isLoading: false, opacity: state.overlayOpacity };
  let loadedTileCount = 0;
  let errorTileCount = 0;

  overlayLayer.on('loading', () => {
    loadedTileCount = 0;
    errorTileCount = 0;
    if (!overlayEntry.isLoading) {
      overlayEntry.isLoading = true;
      state.loadingLayerCount += 1;
    }
    dom.wmsStatusDot.classList.add('is-loading');
  });

  overlayLayer.on('tileload', () => {
    loadedTileCount += 1;
  });

  overlayLayer.on('tileerror', () => {
    errorTileCount += 1;
  });

  overlayLayer.on('load', () => {
    if (overlayEntry.isLoading) {
      overlayEntry.isLoading = false;
      state.loadingLayerCount = Math.max(0, state.loadingLayerCount - 1);
    }
    if (state.loadingLayerCount === 0) {
      dom.wmsStatusDot.classList.remove('is-loading');
    }
    if (loadedTileCount === 0 && errorTileCount > 0) {
      const loc = getLocalizedMeta(meta);
      setStatusMessage(t().tileErrorMessage(loc.shortTitle));
    }
  });

  overlayLayer.addTo(state.map);
  state.activeOverlays.push(overlayEntry);
  syncOverlayZIndices();
  if (item.layer) {
    item.layer.setStyle(CONFIG.POLYGON_STYLE.selected);
  }

  renderInspectorDetail(item, true);
  renderActiveOverlayList();
  syncSelectedListItem();
  schedulePermalinkSync();
}
