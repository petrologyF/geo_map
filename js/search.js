import { CONFIG } from './config.js';
import { el } from './dom.js';
import { focusFieldTripSpot } from './fieldTrips.js';
import { t } from './i18n.js';
import { addOverlayForItem, isItemOverlayed, zoomToMapItem } from './inspector.js';
import { fitAllVisibleItems, setLeftDrawerCollapsed, syncSettingsUI, updateResultCount } from './map.js';
import {
  buildTooltipText,
  computeIntersectionArea,
  extractCoreMapName,
  getItemBounds,
  getLocalizedMeta,
  normalizeProperties,
  normalizeSearchText,
  styleByScale
} from './normalize.js';
import { querySeamlessPointGeology } from './seamless.js';
import { dom, saveSettings, state } from './state.js';

let yearFilterTimer = null;

/**
 * 絞り込み結果リストを描画する
 */
export function renderResultList() {
  const dict = t();
  dom.resultList.innerHTML = '';

  if (state.hoveredListItem) {
    const prev = state.hoveredListItem;
    state.hoveredListItem = null;
    if (!isItemOverlayed(prev) && prev.layer) {
      prev.layer.setStyle(styleByScale(prev.meta.scaleDenominator, prev.meta.mapType));
    }
  }

  const fragment = document.createDocumentFragment();
  const displayItems = state.filteredItems.slice(0, CONFIG.MAX_LIST_ITEMS);

  displayItems.forEach((item) => {
    const { meta } = item;
    const loc = item.cachedLoc || getLocalizedMeta(meta);
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    const isSelected = isItemOverlayed(item);
    button.className = 'result-list-item';
    if (isSelected) {
      button.classList.add('is-selected');
    }
    button.setAttribute('aria-pressed', String(isSelected));

    const mainSpan = document.createElement('span');
    mainSpan.className = 'result-item-main';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'result-item-name';
    nameSpan.textContent = loc.title;

    const authorSpan = document.createElement('span');
    authorSpan.className = 'result-item-author';
    authorSpan.textContent = loc.authors;

    mainSpan.append(nameSpan, authorSpan);

    const yearSpan = document.createElement('span');
    yearSpan.className = 'result-item-year';
    yearSpan.textContent = meta.publishedYear != null ? `${meta.publishedYear}` : '';

    button.append(mainSpan, yearSpan);
    const highlightItem = () => {
      if (state.hoveredListItem && state.hoveredListItem !== item && !isItemOverlayed(state.hoveredListItem) && state.hoveredListItem.layer) {
        state.hoveredListItem.layer.setStyle(styleByScale(state.hoveredListItem.meta.scaleDenominator, state.hoveredListItem.meta.mapType));
      }
      state.hoveredListItem = item;
      if (!isItemOverlayed(item) && state.showIndexFrames) {
        item.layer.setStyle(CONFIG.POLYGON_STYLE.hover);
      }
    };
    const unhighlightItem = () => {
      if (state.hoveredListItem === item) {
        state.hoveredListItem = null;
      }
      if (!isItemOverlayed(item) && state.showIndexFrames) {
        item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
      }
    };

    button.addEventListener('mouseenter', highlightItem);
    button.addEventListener('mouseleave', unhighlightItem);
    button.addEventListener('focus', highlightItem);
    button.addEventListener('blur', unhighlightItem);
    button.addEventListener('click', () => {
      addOverlayForItem(item);
      zoomToMapItem(item);
    });

    li.appendChild(button);
    fragment.appendChild(li);
  });

  if (state.filteredItems.length > CONFIG.MAX_LIST_ITEMS) {
    const noteLi = document.createElement('li');
    noteLi.className = 'result-list-note';
    noteLi.textContent = dict.moreItems(state.filteredItems.length - CONFIG.MAX_LIST_ITEMS);
    fragment.appendChild(noteLi);
  } else if (state.filteredItems.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'result-list-note';
    emptyLi.textContent = dict.noMatch;
    fragment.appendChild(emptyLi);
  }

  dom.resultList.appendChild(fragment);
}

/**
 * 適用中の詳細フィルター件数バッジを更新する
 */
export function updateActiveFilterBadge() {
  const { minBound, maxBound, currentMin, currentMax } = state.yearRange;
  let count = 0;
  if (currentMin > minBound || currentMax < maxBound) {
    count += 1;
  }
  count += state.selectedScales.size;
  count += state.selectedResourceFlags.size;

  dom.activeFilterBadge.textContent = String(count);
  dom.activeFilterBadge.hidden = count === 0;
}

/**
 * 検索文字列・地図範囲・発行年・縮尺・資料有無に基づき即時フィルタリングする
 */
export function applyFilters() {
  const queryTokens = normalizeSearchText(dom.searchInput.value.trim()).split(/\s+/).filter(Boolean);
  const { minBound, maxBound, currentMin, currentMax } = state.yearRange;
  const hasMapTypeFilter = state.selectedMapType !== 'all';
  const hasYearFilter = currentMin > minBound || currentMax < maxBound;
  const hasScaleFilter = state.selectedScales.size > 0;
  const hasFlagFilter = state.selectedResourceFlags.size > 0;
  const viewBounds = state.viewportOnly && state.map ? state.map.getBounds() : null;
  const nextFiltered = [];

  state.allItems.forEach((item) => {
    const { layer, meta } = item;
    const loc = item.cachedLoc || getLocalizedMeta(meta);
    const year = Number(meta.publishedYear);
    const hasValidYear = meta.publishedYear !== null && !Number.isNaN(year);

    const matchesMapType = !hasMapTypeFilter || meta.mapType === state.selectedMapType;
    const matchesText = queryTokens.length === 0 || queryTokens.every((tok) => loc.searchTokens.includes(tok));
    const matchesYear = !hasYearFilter || (hasValidYear && year >= currentMin && year <= currentMax);
    const matchesScale = !hasScaleFilter || state.selectedScales.has(meta.scale);
    const matchesViewport = !viewBounds || computeIntersectionArea(viewBounds, getItemBounds(item)) > 0;

    let matchesFlags = true;
    if (hasFlagFilter) {
      if (state.selectedResourceFlags.has('pdf') && !meta.pdfUrl) {
        matchesFlags = false;
      }
      if (state.selectedResourceFlags.has('legend') && !meta.legendImageUrl) {
        matchesFlags = false;
      }
      if (state.selectedResourceFlags.has('original') && !meta.originalImageUrl) {
        matchesFlags = false;
      }
    }

    const isVisible =
      matchesMapType &&
      matchesText &&
      matchesYear &&
      matchesScale &&
      matchesFlags &&
      matchesViewport;

    if (isVisible) {
      if (!state.indexLayerGroup.hasLayer(layer)) {
        state.indexLayerGroup.addLayer(layer);
      }
      nextFiltered.push(item);
    } else if (state.indexLayerGroup.hasLayer(layer)) {
      state.indexLayerGroup.removeLayer(layer);
    }
  });

  state.filteredItems = nextFiltered;
  if (dom.fitAllBtn) {
    dom.fitAllBtn.disabled = nextFiltered.length === 0;
  }
  if (dom.drawerFilterDot) {
    const hasNarrowing =
      queryTokens.length > 0 ||
      state.viewportOnly ||
      hasYearFilter ||
      hasScaleFilter ||
      hasFlagFilter ||
      (state.selectedMapType !== 'all' && state.selectedMapType !== 'geological_map_sheet');
    dom.drawerFilterDot.hidden = !hasNarrowing;
  }
  updateActiveFilterBadge();
  updateResultCount(nextFiltered.length, state.allItems.length);
  renderResultList();
}

export function renderScaleChips() {
  dom.scaleChips.innerHTML = '';
  const scalesSet = new Set();
  state.allItems.forEach(({ meta }) => {
    if (meta.scale) {
      scalesSet.add(meta.scale);
    }
  });

  const sortedScales = [...scalesSet].sort((a, b) => {
    const numA = parseInt(a.replace(/[^\d]/g, ''), 10) || Number.MAX_SAFE_INTEGER;
    const numB = parseInt(b.replace(/[^\d]/g, ''), 10) || Number.MAX_SAFE_INTEGER;
    return numA - numB || a.localeCompare(b, state.lang);
  });

  const fragment = document.createDocumentFragment();
  sortedScales.forEach((scale) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isSelected = state.selectedScales.has(scale);
    btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
    btn.textContent = scale;
    btn.setAttribute('aria-pressed', String(isSelected));

    btn.addEventListener('click', () => {
      if (state.selectedScales.has(scale)) {
        state.selectedScales.delete(scale);
        btn.classList.remove('is-selected');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        state.selectedScales.add(scale);
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');
      }
      applyFilters();
    });

    fragment.appendChild(btn);
  });

  dom.scaleChips.appendChild(fragment);
}

export function renderMapTypeChips() {
  const dict = t();
  dom.mapTypeChips.innerHTML = '';

  const typesSet = new Set();
  state.allItems.forEach(({ meta }) => {
    if (meta.mapType) {
      typesSet.add(meta.mapType);
    }
  });

  const entries = [
    ['all', dict.mapTypeAll],
    ...[...typesSet].map((typeKey) => [typeKey, dict.mapTypes[typeKey] || typeKey])
  ];

  if (state.selectedMapType !== 'all' && !typesSet.has(state.selectedMapType)) {
    state.selectedMapType = 'all';
  }

  const fragment = document.createDocumentFragment();
  entries.forEach(([typeKey, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isSelected = state.selectedMapType === typeKey;
    btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
    btn.textContent = label;
    btn.dataset.mapType = typeKey;
    btn.setAttribute('aria-pressed', String(isSelected));

    btn.addEventListener('click', () => {
      const changed = state.selectedMapType !== typeKey;
      if (changed) {
        state.selectedMapType = typeKey;
        state.selectedScales.clear();
        renderScaleChips();
      }
      dom.mapTypeChips.querySelectorAll('.decade-chip').forEach((c) => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
      applyFilters();
    });

    fragment.appendChild(btn);
  });

  dom.mapTypeChips.appendChild(fragment);
}

export function renderOtherChips() {
  const dict = t();
  dom.otherChips.innerHTML = '';

  const flagDefs = [
    ['pdf', dict.flagPdf],
    ['legend', dict.flagLegend],
    ['original', dict.flagOriginal]
  ];

  const fragment = document.createDocumentFragment();
  flagDefs.forEach(([flagKey, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isSelected = state.selectedResourceFlags.has(flagKey);
    btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
    btn.textContent = label;
    btn.setAttribute('aria-pressed', String(isSelected));

    btn.addEventListener('click', () => {
      if (state.selectedResourceFlags.has(flagKey)) {
        state.selectedResourceFlags.delete(flagKey);
        btn.classList.remove('is-selected');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        state.selectedResourceFlags.add(flagKey);
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');
      }
      applyFilters();
    });

    fragment.appendChild(btn);
  });

  dom.otherChips.appendChild(fragment);
}

function renderYearTicks() {
  const { minBound, maxBound } = state.yearRange;
  const span = Math.max(5, maxBound - minBound);

  if (dom.yearRangeTicks) {
    dom.yearRangeTicks.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let y = minBound; y <= maxBound; y += 5) {
      const dot = document.createElement('span');
      dot.className = 'year-tick-dot';
      if (y % 20 === 0) {
        dot.classList.add('is-major');
      }
      dot.dataset.year = String(y);
      dot.style.left = `${((y - minBound) / span) * 100}%`;
      frag.appendChild(dot);
    }
    dom.yearRangeTicks.appendChild(frag);
  }

  if (dom.yearRangeLabels) {
    dom.yearRangeLabels.innerHTML = '';
    for (let y = minBound; y <= maxBound; y += 5) {
      if (y % 20 !== 0) {
        continue;
      }
      const spanEl = document.createElement('span');
      spanEl.className = 'year-tick-label';
      spanEl.textContent = String(y);
      spanEl.style.left = `${((y - minBound) / span) * 100}%`;
      dom.yearRangeLabels.appendChild(spanEl);
    }
  }
}

export function updateYearSliderUI() {
  const { minBound, maxBound, dataMaxYear, currentMin, currentMax } = state.yearRange;
  const suffix = t().yearSuffix;
  const displayMax = currentMax >= maxBound ? dataMaxYear : currentMax;
  dom.yearRangeDisplay.textContent = `${currentMin}${suffix} 〜 ${displayMax}${suffix}`;

  const span = Math.max(1, maxBound - minBound);
  const leftPct = ((currentMin - minBound) / span) * 100;
  const rightPct = ((currentMax - minBound) / span) * 100;
  dom.yearRangeTrack.style.left = `${leftPct}%`;
  dom.yearRangeTrack.style.width = `${Math.max(0, rightPct - leftPct)}%`;

  if (dom.yearRangeTicks) {
    dom.yearRangeTicks.querySelectorAll('.year-tick-dot').forEach((dot) => {
      const y = Number(dot.dataset.year);
      dot.classList.toggle('is-in-range', y >= currentMin && y <= currentMax);
    });
  }

  if (currentMin >= maxBound - 5) {
    dom.yearRangeMin.style.zIndex = '4';
    dom.yearRangeMax.style.zIndex = '3';
  } else {
    dom.yearRangeMin.style.zIndex = '3';
    dom.yearRangeMax.style.zIndex = '4';
  }
}

export function initYearSlider() {
  const years = state.allItems
    .map((item) => Number(item.meta.publishedYear))
    .filter((y) => !Number.isNaN(y) && y > 0);

  const rawMin = years.length > 0 ? Math.min(...years) : 1950;
  const rawMax = years.length > 0 ? Math.max(...years) : 2026;
  const minYear = Math.floor(rawMin / 5) * 5;
  const maxYear = Math.ceil(rawMax / 5) * 5;

  state.yearRange = {
    minBound: minYear,
    maxBound: maxYear,
    dataMaxYear: rawMax,
    currentMin: minYear,
    currentMax: maxYear
  };

  dom.yearRangeMin.min = String(minYear);
  dom.yearRangeMin.max = String(maxYear);
  dom.yearRangeMin.step = '5';
  dom.yearRangeMin.value = String(minYear);

  dom.yearRangeMax.min = String(minYear);
  dom.yearRangeMax.max = String(maxYear);
  dom.yearRangeMax.step = '5';
  dom.yearRangeMax.value = String(maxYear);

  renderYearTicks();
  updateYearSliderUI();
}

export function handleYearSliderInput(changedHandle) {
  let minVal = Number(dom.yearRangeMin.value);
  let maxVal = Number(dom.yearRangeMax.value);

  if (changedHandle === 'min' && minVal > maxVal) {
    minVal = maxVal;
    dom.yearRangeMin.value = String(minVal);
  } else if (changedHandle === 'max' && maxVal < minVal) {
    maxVal = minVal;
    dom.yearRangeMax.value = String(maxVal);
  }

  state.yearRange.currentMin = minVal;
  state.yearRange.currentMax = maxVal;
  updateYearSliderUI();
  if (yearFilterTimer) {
    clearTimeout(yearFilterTimer);
  }
  yearFilterTimer = setTimeout(() => {
    yearFilterTimer = null;
    applyFilters();
  }, 70);
}

export function toggleFiltersPanel() {
  const isExpanded = dom.toggleFiltersBtn.getAttribute('aria-expanded') === 'true';
  const nextExpanded = !isExpanded;
  dom.toggleFiltersBtn.setAttribute('aria-expanded', String(nextExpanded));
  if (dom.filterPanelWrap) {
    dom.filterPanelWrap.classList.toggle('is-open', nextExpanded);
    dom.filterPanelWrap.inert = !nextExpanded;
  }
}

export function resetFilters() {
  dom.searchInput.value = '';
  state.selectedMapType = 'all';
  renderMapTypeChips();
  state.selectedScales.clear();
  state.selectedResourceFlags.clear();
  state.yearRange.currentMin = state.yearRange.minBound;
  state.yearRange.currentMax = state.yearRange.maxBound;
  dom.yearRangeMin.value = String(state.yearRange.minBound);
  dom.yearRangeMax.value = String(state.yearRange.maxBound);
  updateYearSliderUI();
  renderScaleChips();
  renderOtherChips();
  state.viewportOnly = false;
  state.settings.viewportOnly = false;
  saveSettings();
  syncSettingsUI();
  applyFilters();
}

export function buildSuggestionPool() {
  const dict = t();
  const pool = [];
  const seenKeys = new Set();

  state.allItems.forEach((item) => {
    const { meta } = item;
    const loc = item.cachedLoc || getLocalizedMeta(meta);
    const mapKey = `map:${meta.mapId || `${loc.title}_${meta.scale}_${meta.publishedYear}`}`;
    const suffix = meta.publishedYear ? ` (${meta.publishedYear})` : '';

    if (!seenKeys.has(mapKey)) {
      seenKeys.add(mapKey);
      const coreJa = extractCoreMapName(meta.mapNameJa);
      const coreEn = extractCoreMapName(meta.mapNameEn);
      pool.push({
        type: 'map',
        label: `${loc.shortTitle}${suffix}`,
        filterValue: loc.coreTitle || loc.title,
        badge: dict.badgeMap,
        coreNormalized: normalizeSearchText(loc.coreTitle || loc.title),
        primaryText: normalizeSearchText([loc.coreTitle, loc.shortTitle, loc.title, coreJa, coreEn].filter(Boolean).join(' ')),
        searchText: loc.searchTokens,
        item
      });
    }

    const volcanoName = state.lang === 'en'
      ? (meta.volcanoNameEn || meta.volcanoNameJa)
      : (meta.volcanoNameJa || meta.volcanoNameEn);
    if (volcanoName) {
      const volcanoKey = `volcano:${meta.mapId || `${volcanoName}_${meta.scale}_${meta.publishedYear}`}`;
      if (!seenKeys.has(volcanoKey)) {
        seenKeys.add(volcanoKey);
        pool.push({
          type: 'volcano',
          label: `${volcanoName}${suffix}`,
          filterValue: volcanoName,
          badge: dict.badgeVolcano,
          coreNormalized: normalizeSearchText(volcanoName),
          primaryText: normalizeSearchText(`${meta.volcanoNameJa} ${meta.volcanoNameEn}`),
          searchText: normalizeSearchText(`${meta.volcanoNameJa} ${meta.volcanoNameEn} ${meta.publishedYear || ''}`),
          item
        });
      }
    }

    loc.authorList.forEach((author) => {
      const authorKey = `author:${author}`;
      if (!seenKeys.has(authorKey)) {
        seenKeys.add(authorKey);
        const normAuthor = normalizeSearchText(author);
        pool.push({
          type: 'author',
          label: author,
          filterValue: author,
          badge: dict.badgeAuthor,
          coreNormalized: normAuthor,
          primaryText: normAuthor,
          searchText: normAuthor,
          item: null
        });
      }
    });

    loc.regionList.forEach((region) => {
      const regionKey = `region:${region}`;
      if (!seenKeys.has(regionKey)) {
        seenKeys.add(regionKey);
        const normRegion = normalizeSearchText(region);
        pool.push({
          type: 'region',
          label: region,
          filterValue: region,
          badge: dict.badgeRegion,
          coreNormalized: normRegion,
          primaryText: normRegion,
          searchText: normRegion,
          item: null
        });
      }
    });
  });

  state.fieldTripItems.forEach((ftItem) => {
    const { props, normalizedSearchText } = ftItem;
    const ftKey = `field_trip:${props.id}`;
    if (!seenKeys.has(ftKey)) {
      seenKeys.add(ftKey);
      const label = `${props.stop_name} (${props.year} ${props.course_abbr})`;
      pool.push({
        type: 'field_trip',
        category: props.category || '',
        label,
        filterValue: props.stop_name,
        badge: dict.badgeFieldTrip,
        coreNormalized: normalizeSearchText(`${props.stop_name} ${props.stop_abbr}`),
        primaryText: normalizeSearchText(`${props.stop_name} ${props.stop_abbr} ${props.course_abbr} ${props.course_name}`),
        searchText: normalizedSearchText || normalizeSearchText(
          `${props.id} ${props.year} ${props.course_abbr} ${props.course_name} ${props.authors || ''} ${props.stop_no} ${props.stop_abbr} ${props.stop_name} ${props.description}`
        ),
        item: ftItem
      });
    }
  });

  state.suggestionPool = pool;
}

export function hideSuggestions() {
  dom.searchSuggestions.classList.remove('is-open');
  dom.searchInput.setAttribute('aria-expanded', 'false');
  state.currentSuggestions = [];
  state.activeSuggestionIndex = -1;
}

export function selectSuggestion(suggestion) {
  if (!suggestion) {
    return;
  }

  dom.searchInput.value = suggestion.filterValue || suggestion.label;
  hideSuggestions();
  applyFilters();

  if ((suggestion.type === 'map' || suggestion.type === 'volcano') && suggestion.item) {
    if (!state.filteredItems.includes(suggestion.item)) {
      state.selectedMapType = suggestion.item.meta.mapType || 'all';
      renderMapTypeChips();
      state.selectedScales.clear();
      state.selectedResourceFlags.clear();
      state.yearRange.currentMin = state.yearRange.minBound;
      state.yearRange.currentMax = state.yearRange.maxBound;
      dom.yearRangeMin.value = String(state.yearRange.minBound);
      dom.yearRangeMax.value = String(state.yearRange.maxBound);
      updateYearSliderUI();
      renderScaleChips();
      renderOtherChips();
      applyFilters();
    }
    addOverlayForItem(suggestion.item);
    zoomToMapItem(suggestion.item);
  } else if (suggestion.type === 'field_trip' && suggestion.item) {
    focusFieldTripSpot(suggestion.item);
  } else {
    if (state.isLeftDrawerCollapsed) {
      setLeftDrawerCollapsed(false);
    }
    fitAllVisibleItems();
  }
}

function buildHighlightedLabel(label, rawTokens) {
  const frag = document.createDocumentFragment();
  if (!rawTokens || rawTokens.length === 0) {
    frag.appendChild(document.createTextNode(label));
    return frag;
  }

  const escaped = rawTokens
    .filter(Boolean)
    .map((tok) => tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escaped.length === 0) {
    frag.appendChild(document.createTextNode(label));
    return frag;
  }

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  let lastIdx = 0;
  let match;
  while ((match = regex.exec(label)) !== null) {
    if (match.index > lastIdx) {
      frag.appendChild(document.createTextNode(label.slice(lastIdx, match.index)));
    }
    const mark = document.createElement('mark');
    mark.className = 'suggestion-highlight';
    mark.textContent = match[0];
    frag.appendChild(mark);
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < label.length) {
    frag.appendChild(document.createTextNode(label.slice(lastIdx)));
  }
  return frag;
}

function scoreSuggestion(entry, tokens) {
  if (!tokens.every((tok) => entry.searchText.includes(tok))) {
    return -1;
  }
  let score = 0;
  const firstToken = tokens[0];
  if (entry.coreNormalized === firstToken) {
    score += 100;
  } else if (entry.coreNormalized.startsWith(firstToken)) {
    score += 70;
  } else if (entry.primaryText.includes(firstToken)) {
    score += 40;
  } else {
    score += 15;
  }

  if (entry.type === 'map' || entry.type === 'volcano') {
    score += 8;
  } else if (entry.type === 'region') {
    score += 4;
  }
  return score;
}

function updateActiveSuggestionHighlight() {
  const items = dom.searchSuggestions.querySelectorAll('.suggestion-item');
  items.forEach((li, idx) => {
    const isActive = idx === state.activeSuggestionIndex;
    li.classList.toggle('is-active', isActive);
    li.setAttribute('aria-selected', String(isActive));
    if (isActive) {
      li.scrollIntoView({ block: 'nearest' });
    }
  });
}

export function renderSuggestions() {
  const rawQuery = dom.searchInput.value.trim();
  const rawTokens = rawQuery.split(/[\s\u3000]+/).filter(Boolean);
  const normTokens = normalizeSearchText(rawQuery).split(/\s+/).filter(Boolean);

  if (normTokens.length === 0) {
    hideSuggestions();
    return;
  }

  const dict = t();
  const mapMatches = [];
  const fieldTripMatches = [];
  const regionMatches = [];
  const authorMatches = [];

  for (const entry of state.suggestionPool) {
    const matchScore = scoreSuggestion(entry, normTokens);
    if (matchScore < 0) {
      continue;
    }
    const scored = { ...entry, matchScore };
    if (entry.type === 'map' || entry.type === 'volcano') {
      mapMatches.push(scored);
    } else if (entry.type === 'field_trip') {
      fieldTripMatches.push(scored);
    } else if (entry.type === 'region') {
      regionMatches.push(scored);
    } else if (entry.type === 'author') {
      authorMatches.push(scored);
    }
  }

  const sortFn = (a, b) => b.matchScore - a.matchScore || a.label.localeCompare(b.label, state.lang);
  mapMatches.sort(sortFn);
  fieldTripMatches.sort(sortFn);
  regionMatches.sort(sortFn);
  authorMatches.sort(sortFn);

  const groups = [
    { title: dict.suggestionGroupMaps, items: mapMatches.slice(0, 5) },
    { title: dict.suggestionGroupFieldTrips, items: fieldTripMatches.slice(0, 4) },
    { title: dict.suggestionGroupRegions, items: regionMatches.slice(0, 3) },
    { title: dict.suggestionGroupAuthors, items: authorMatches.slice(0, 3) }
  ].filter((g) => g.items.length > 0);

  if (groups.length === 0) {
    hideSuggestions();
    return;
  }

  const flatItems = [];
  dom.searchSuggestions.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const badgeClassMap = {
    map: 'is-map',
    volcano: 'is-volcano',
    field_trip: 'is-field-trip',
    region: 'is-region',
    author: 'is-author'
  };

  groups.forEach((group) => {
    fragment.appendChild(
      el('li', { className: 'suggestion-group-header', role: 'presentation' }, group.title)
    );

    group.items.forEach((entry) => {
      const itemIndex = flatItems.length;
      flatItems.push(entry);

      const badgeClass = badgeClassMap[entry.type] || 'is-author';
      const badgeDataset = entry.type === 'field_trip' && entry.category ? { tripCategory: entry.category } : {};
      const li = el('li', {
        className: 'suggestion-item',
        role: 'option',
        'aria-selected': 'false',
        onMousedown: (event) => {
          event.preventDefault();
          selectSuggestion(entry);
        },
        onMousemove: () => {
          state.activeSuggestionIndex = itemIndex;
          updateActiveSuggestionHighlight();
        }
      },
        el('span', { className: 'suggestion-text' }, buildHighlightedLabel(entry.label, rawTokens)),
        el('span', { className: `suggestion-badge ${badgeClass}`, dataset: badgeDataset }, entry.badge)
      );
      fragment.appendChild(li);
    });
  });

  state.currentSuggestions = flatItems;
  state.activeSuggestionIndex = -1;
  dom.searchSuggestions.appendChild(fragment);
  dom.searchSuggestions.classList.add('is-open');
  dom.searchInput.setAttribute('aria-expanded', 'true');
}

export function handleSearchKeydown(event) {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  const hasSuggestions = dom.searchSuggestions.classList.contains('is-open') && state.currentSuggestions.length > 0;

  if (event.key === 'ArrowDown' && hasSuggestions) {
    event.preventDefault();
    state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % state.currentSuggestions.length;
    updateActiveSuggestionHighlight();
  } else if (event.key === 'ArrowUp' && hasSuggestions) {
    event.preventDefault();
    state.activeSuggestionIndex =
      (state.activeSuggestionIndex - 1 + state.currentSuggestions.length) % state.currentSuggestions.length;
    updateActiveSuggestionHighlight();
  } else if (event.key === 'Enter') {
    if (hasSuggestions && state.activeSuggestionIndex >= 0) {
      event.preventDefault();
      selectSuggestion(state.currentSuggestions[state.activeSuggestionIndex]);
    } else {
      hideSuggestions();
      applyFilters();
    }
  } else if (event.key === 'Escape' && hasSuggestions) {
    event.preventDefault();
    event.stopPropagation();
    hideSuggestions();
  }
}

function getFeatureBboxArea(feature) {
  const b = feature?.properties?.map?.bounds || feature?.properties?.tile?.bounds;
  if (Array.isArray(b) && b.length === 4) {
    return Math.abs((Number(b[2]) - Number(b[0])) * (Number(b[3]) - Number(b[1])));
  }
  const ring = feature?.geometry?.coordinates?.[0];
  if (Array.isArray(ring) && ring.length > 0) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    ring.forEach(([x, y]) => {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });
    return Math.abs((maxX - minX) * (maxY - minY));
  }
  return 0;
}

/**
 * GeoJSONデータからポリゴンレイヤー群を生成してマップに描画する
 */
export function renderGeoJsonFeatures(geojsonData, { skipInitialFit = false } = {}) {
  const sortedGeoJson = geojsonData && Array.isArray(geojsonData.features)
    ? {
      ...geojsonData,
      features: [...geojsonData.features].sort((a, b) => getFeatureBboxArea(b) - getFeatureBboxArea(a))
    }
    : geojsonData;

  L.geoJSON(sortedGeoJson, {
    style: (feature) => styleByScale(
      feature?.properties?.map?.scale_denominator ?? null,
      feature?.properties?.map?.map_type ?? 'geological_map_sheet'
    ),
    onEachFeature: (feature, layer) => {
      const meta = normalizeProperties(feature.properties);
      const item = { layer, meta, cachedLoc: getLocalizedMeta(meta) };

      layer.bindTooltip(buildTooltipText(meta), {
        sticky: true,
        direction: 'top',
        offset: [0, -6],
        className: 'map-hover-tooltip'
      });

      layer.on('mouseover', () => {
        if (!isItemOverlayed(item)) {
          layer.setStyle(CONFIG.POLYGON_STYLE.hover);
        }
      });

      layer.on('mouseout', () => {
        if (!isItemOverlayed(item)) {
          layer.setStyle(styleByScale(meta.scaleDenominator, meta.mapType));
        }
      });

      layer.on('click', (event) => {
        L.DomEvent.stopPropagation(event);
        if (state.seamlessLayer && state.seamlessQueryPriority && event.latlng) {
          querySeamlessPointGeology(event.latlng);
          return;
        }
        addOverlayForItem(item);
      });

      state.allItems.push(item);
      state.indexLayerGroup.addLayer(layer);
    }
  });

  state.filteredItems = [...state.allItems];

  if (state.allItems.some(({ meta }) => meta.mapType === 'geological_map_sheet')) {
    state.selectedMapType = 'geological_map_sheet';
  }

  renderMapTypeChips();
  initYearSlider();
  renderScaleChips();
  renderOtherChips();
  buildSuggestionPool();
  applyFilters();
  if (!skipInitialFit) {
    if (state.map) {
      const initialZoom = window.innerWidth <= 720 ? 5.0 : 5.75;
      state.map.setView(CONFIG.INITIAL_CENTER, initialZoom, { animate: false });
    } else {
      fitAllVisibleItems({ animate: false });
    }
  }
}
