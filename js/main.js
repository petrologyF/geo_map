import { CONFIG } from './config.js';
import { getCourseKey } from './dom.js';
import {
  collapseAllFieldTrips,
  expandAllFieldTrips,
  fetchFieldTrips,
  fitExpandedFieldTrips,
  fitFilteredFieldTrips,
  getFilteredFieldTripItems,
  overlayGeoMapAtCurrentSpot,
  populateFieldTripFilters,
  renderFieldTripCategoryChips,
  renderFieldTripList,
  renderFieldTripMarkers,
  setFieldTripsVisible,
  stepFieldTripStop,
  switchDrawerMode,
  syncFieldTripActiveBar,
  updateFieldTripFilter
} from './fieldTrips.js';
import { I18N, t } from './i18n.js';
import {
  addOverlayForItem,
  buildSeamlessGeologyNode,
  clearAllOverlays,
  hideLegendLoupe,
  onLegendImageError,
  refreshLoupeRects,
  renderActiveOverlayList,
  renderInspectorDetail,
  renderSeamlessPointCard,
  setRightInspectorCollapsed,
  switchInspectorTab,
  updateAutoInspectedItem,
  updateLegendLoupe
} from './inspector.js';
import {
  applyScaleBarVisibility,
  applyTheme,
  closeAllPopovers,
  fitAllVisibleItems,
  initMap,
  initTheme,
  locateCurrentPosition,
  setLeftDrawerCollapsed,
  setStatusMessage,
  switchBasemap,
  switchMobileView,
  syncSettingsUI,
  togglePopover
} from './map.js';
import { buildTooltipText, getLocalizedMeta } from './normalize.js';
import { parsePermalinkHash, schedulePermalinkSync } from './permalink.js';
import {
  applyFilters,
  buildSuggestionPool,
  handleSearchKeydown,
  handleYearSliderInput,
  hideSuggestions,
  renderGeoJsonFeatures,
  renderMapTypeChips,
  renderOtherChips,
  renderScaleChips,
  renderSuggestions,
  resetFilters,
  toggleFiltersPanel,
  updateYearSliderUI
} from './search.js';
import {
  handleSeamlessOpacityChange,
  loadSeamlessProvider,
  querySeamlessPointGeology,
  toggleSeamless200k
} from './seamless.js';
import { debouncedSaveSettings, dom, loadSettings, saveSettings, state } from './state.js';

function toggleIndexFrames() {
  state.showIndexFrames = dom.showIndexToggle.checked;
  state.settings.showIndexFrames = state.showIndexFrames;
  saveSettings();
  syncSettingsUI();

  if (!state.map || !state.indexLayerGroup) {
    return;
  }
  if (state.showIndexFrames) {
    if (!state.map.hasLayer(state.indexLayerGroup)) {
      state.indexLayerGroup.addTo(state.map);
    }
  } else if (state.map.hasLayer(state.indexLayerGroup)) {
    state.map.removeLayer(state.indexLayerGroup);
  }
}

function resetAllSettings() {
  state.settings = { ...CONFIG.DEFAULT_SETTINGS };
  state.showIndexFrames = state.settings.showIndexFrames;
  state.showFieldTrips = state.settings.showFieldTrips;
  state.showScaleBar = state.settings.showScaleBar;
  state.showFieldTripRoute = state.settings.showFieldTripRoute;
  state.wheelZoomSpeed = state.settings.wheelZoomSpeed;
  state.fieldTripYear = state.settings.fieldTripYear;
  state.fieldTripCourse = state.settings.fieldTripCourse;
  state.selectedFieldTripCategories.clear();
  state.settings.fieldTripCategories = [];
  state.viewportOnly = state.settings.viewportOnly;
  state.overlayOpacity = state.settings.overlayOpacity;
  state.seamlessOpacity = state.settings.seamlessOpacity;
  state.seamlessQueryPriority = state.settings.seamlessQueryPriority;

  if (state.map) {
    state.map.options.wheelPxPerZoomLevel = Math.round(100 / state.wheelZoomSpeed);
  }
  applyScaleBarVisibility();

  if (dom.showIndexToggle) {
    dom.showIndexToggle.checked = state.showIndexFrames;
    toggleIndexFrames();
  }
  setFieldTripsVisible(state.showFieldTrips);
  renderFieldTripCategoryChips();
  populateFieldTripFilters();
  renderFieldTripMarkers();
  renderFieldTripList();
  if (dom.viewportOnlyToggle) {
    dom.viewportOnlyToggle.checked = state.viewportOnly;
    applyFilters();
  }
  if (dom.seamless200kToggle) {
    dom.seamless200kToggle.checked = state.settings.seamless200k;
    toggleSeamless200k();
  }

  switchBasemap(CONFIG.DEFAULT_SETTINGS.basemap);
  applyTheme('light', { persist: true });
  if (state.lang !== CONFIG.DEFAULT_SETTINGS.lang) {
    switchLanguage(CONFIG.DEFAULT_SETTINGS.lang);
  }
  saveSettings();
  syncSettingsUI();
}

function getPopoverPairs() {
  return [
    [dom.layersPopoverBtn, dom.layersPopover],
    [dom.prefsPopoverBtn, dom.prefsPopover]
  ].filter(([btn, pop]) => btn && pop);
}

function bindDebouncedSearchInput(inputEl, onApply, delayMs = 100, { onInput } = {}) {
  if (!inputEl) {
    return;
  }
  let timer = null;
  inputEl.addEventListener('input', (event) => {
    if (event.isComposing) {
      return;
    }
    if (typeof onInput === 'function') {
      onInput();
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      onApply();
    }, delayMs);
  });
  inputEl.addEventListener('compositionend', () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (typeof onInput === 'function') {
      onInput();
    }
    onApply();
  });
}

function handleGlobalKeydown(event) {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  const activeEl = document.activeElement;
  const isInputFocused = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl?.tagName);
  const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

  if (event.key === 'Escape') {
    if (getPopoverPairs().some(([, pop]) => pop.classList.contains('is-open'))) {
      event.preventDefault();
      closeAllPopovers();
      return;
    }
    if (isInputFocused) {
      activeEl.blur();
      hideSuggestions();
    }
    return;
  }

  if ((event.key === '/' && !isInputFocused && !hasModifier) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
    event.preventDefault();
    closeAllPopovers();
    dom.searchInput.focus();
    dom.searchInput.select();
    return;
  }

  if (!isInputFocused && !hasModifier && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    const moved = stepFieldTripStop(event.key === 'ArrowLeft' ? -1 : 1);
    if (moved) {
      event.preventDefault();
    }
  }
}

function applyDeclarativeI18n(dict) {
  document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria-label]').forEach((node) => {
    const { i18n, i18nPlaceholder, i18nTitle, i18nAriaLabel } = node.dataset;
    if (i18n && dict[i18n] !== undefined) {
      node.textContent = dict[i18n];
    }
    if (i18nPlaceholder && dict[i18nPlaceholder] !== undefined) {
      node.placeholder = dict[i18nPlaceholder];
    }
    if (i18nTitle && dict[i18nTitle] !== undefined) {
      node.title = dict[i18nTitle];
    }
    if (i18nAriaLabel && dict[i18nAriaLabel] !== undefined) {
      node.setAttribute('aria-label', dict[i18nAriaLabel]);
    }
  });
}

function switchLanguage(lang) {
  if (!I18N[lang] || state.lang === lang) {
    return;
  }

  state.lang = lang;
  state.settings.lang = lang;
  saveSettings();
  document.documentElement.lang = lang;
  const dict = t();

  applyDeclarativeI18n(dict);
  renderFieldTripCategoryChips();
  populateFieldTripFilters();
  renderFieldTripMarkers();
  renderFieldTripList();
  syncFieldTripActiveBar();
  setLeftDrawerCollapsed(state.isLeftDrawerCollapsed);

  state.allItems.forEach((item) => {
    item.cachedLoc = getLocalizedMeta(item.meta);
    if (typeof item.layer.setTooltipContent === 'function') {
      item.layer.setTooltipContent(buildTooltipText(item.meta));
    }
  });

  hideSuggestions();
  renderMapTypeChips();
  updateYearSliderUI();
  renderScaleChips();
  renderOtherChips();
  buildSuggestionPool();
  applyFilters();
  renderActiveOverlayList();
  if (state.inspectedItem) {
    renderInspectorDetail(state.inspectedItem, true);
  }
  if (state.lastSeamlessPoint && state.seamlessPopup && state.seamlessPopup.isOpen()) {
    state.seamlessPopup.setContent(buildSeamlessGeologyNode(state.lastSeamlessPoint));
  }
  renderSeamlessPointCard();
  syncSettingsUI();
}

function bindSearchEvents() {
  bindDebouncedSearchInput(dom.searchInput, applyFilters, 100, { onInput: renderSuggestions });
  dom.searchInput.addEventListener('focus', renderSuggestions);
  dom.searchInput.addEventListener('blur', hideSuggestions);
  dom.searchInput.addEventListener('keydown', handleSearchKeydown);

  dom.toggleLeftDrawerBtn.addEventListener('click', () => {
    setLeftDrawerCollapsed(!state.isLeftDrawerCollapsed);
  });
  if (dom.drawerTabMaps) {
    dom.drawerTabMaps.addEventListener('click', () => switchDrawerMode('maps'));
  }
  if (dom.drawerTabTrips) {
    dom.drawerTabTrips.addEventListener('click', () => switchDrawerMode('trips'));
  }
}

function bindFilterEvents() {
  dom.viewportOnlyToggle.addEventListener('change', () => {
    state.viewportOnly = dom.viewportOnlyToggle.checked;
    state.settings.viewportOnly = state.viewportOnly;
    saveSettings();
    syncSettingsUI();
    applyFilters();
  });
  dom.yearRangeMin.addEventListener('input', () => handleYearSliderInput('min'));
  dom.yearRangeMax.addEventListener('input', () => handleYearSliderInput('max'));
  dom.toggleFiltersBtn.addEventListener('click', toggleFiltersPanel);
  dom.resetFiltersBtn.addEventListener('click', () => {
    hideSuggestions();
    resetFilters();
  });
  dom.fitAllBtn.addEventListener('click', fitAllVisibleItems);
}

function bindFieldTripEvents() {
  if (dom.fieldTripsFabBtn) {
    dom.fieldTripsFabBtn.addEventListener('click', () => {
      setFieldTripsVisible(!state.showFieldTrips);
    });
  }
  if (dom.drawerTripYearFilter) {
    dom.drawerTripYearFilter.addEventListener('change', () => {
      updateFieldTripFilter(dom.drawerTripYearFilter.value, state.fieldTripCourse);
    });
  }
  if (dom.drawerTripCourseFilter) {
    dom.drawerTripCourseFilter.addEventListener('change', () => {
      updateFieldTripFilter(state.fieldTripYear, dom.drawerTripCourseFilter.value);
    });
  }
  if (dom.drawerTripSearch) {
    bindDebouncedSearchInput(dom.drawerTripSearch, () => {
      state.fieldTripQuery = dom.drawerTripSearch.value || '';
      renderFieldTripMarkers();
      renderFieldTripList();
    });
  }
  if (dom.fitFieldTripsBtn) {
    dom.fitFieldTripsBtn.addEventListener('click', fitFilteredFieldTrips);
  }
  if (dom.toggleExpandTripsBtn) {
    dom.toggleExpandTripsBtn.addEventListener('click', () => {
      const filtered = getFilteredFieldTripItems();
      const hasExpanded = filtered.some((it) => state.expandedFieldTripCourses.has(getCourseKey(it.props)));
      if (hasExpanded) {
        collapseAllFieldTrips();
      } else {
        expandAllFieldTrips();
      }
    });
  }
  if (dom.fieldTripBarFitBtn) {
    dom.fieldTripBarFitBtn.addEventListener('click', fitExpandedFieldTrips);
  }
  if (dom.fieldTripBarCollapseBtn) {
    dom.fieldTripBarCollapseBtn.addEventListener('click', collapseAllFieldTrips);
  }
  if (dom.fieldTripBarOverlayBtn) {
    dom.fieldTripBarOverlayBtn.addEventListener('click', overlayGeoMapAtCurrentSpot);
  }
  if (dom.fieldTripPrevStopBtn) {
    dom.fieldTripPrevStopBtn.addEventListener('click', () => stepFieldTripStop(-1));
  }
  if (dom.fieldTripNextStopBtn) {
    dom.fieldTripNextStopBtn.addEventListener('click', () => stepFieldTripStop(1));
  }
}

function bindInspectorEvents() {
  dom.clearWmsBtn.addEventListener('click', clearAllOverlays);
  dom.collapseRightBtn.addEventListener('click', () => setRightInspectorCollapsed(true));
  dom.reopenRightBtn.addEventListener('click', () => setRightInspectorCollapsed(false));

  dom.legendZoomWrapper.addEventListener('mouseenter', (event) => {
    refreshLoupeRects();
    updateLegendLoupe(event);
  });
  dom.legendZoomWrapper.addEventListener('mousemove', updateLegendLoupe);
  dom.legendZoomWrapper.addEventListener('mouseleave', hideLegendLoupe);
  dom.legendImage.addEventListener('error', onLegendImageError);
  dom.rightInspector.addEventListener('scroll', () => {
    hideLegendLoupe();
    refreshLoupeRects();
  }, { capture: true, passive: true });

  [dom.tabLegendBtn, dom.tabSectionBtn, dom.tabDetailBtn].forEach((btn) => {
    btn.addEventListener('click', () => {
      switchInspectorTab(btn.dataset.inspectorTab);
    });
  });
}

function bindMapControlEvents() {
  dom.showIndexToggle.addEventListener('change', toggleIndexFrames);
  if (dom.locateMeBtn) {
    dom.locateMeBtn.addEventListener('click', locateCurrentPosition);
  }
  if (dom.wheelZoomSpeedSlider) {
    dom.wheelZoomSpeedSlider.addEventListener('input', () => {
      const speed = Math.min(2.5, Math.max(0.4, Number(dom.wheelZoomSpeedSlider.value) || 1.0));
      state.wheelZoomSpeed = speed;
      state.settings.wheelZoomSpeed = speed;
      if (dom.wheelZoomSpeedValue) {
        dom.wheelZoomSpeedValue.textContent = `${speed.toFixed(1)}x`;
      }
      if (state.map) {
        state.map.options.wheelPxPerZoomLevel = Math.round(100 / speed);
      }
      debouncedSaveSettings();
    });
    dom.wheelZoomSpeedSlider.addEventListener('change', saveSettings);
  }
  if (dom.defaultOverlayOpacitySlider) {
    dom.defaultOverlayOpacitySlider.addEventListener('input', () => {
      const pct = Math.min(100, Math.max(10, Number(dom.defaultOverlayOpacitySlider.value) || 85));
      const opacity = pct / 100;
      state.overlayOpacity = opacity;
      state.settings.overlayOpacity = opacity;
      if (dom.defaultOverlayOpacityValue) {
        dom.defaultOverlayOpacityValue.textContent = `${pct}%`;
      }
      debouncedSaveSettings();
    });
    dom.defaultOverlayOpacitySlider.addEventListener('change', saveSettings);
  }
  if (dom.showScaleToggle) {
    dom.showScaleToggle.addEventListener('change', () => {
      state.showScaleBar = dom.showScaleToggle.checked;
      state.settings.showScaleBar = state.showScaleBar;
      applyScaleBarVisibility();
      saveSettings();
    });
  }
  if (dom.showTripRouteToggle) {
    dom.showTripRouteToggle.addEventListener('change', () => {
      state.showFieldTripRoute = dom.showTripRouteToggle.checked;
      state.settings.showFieldTripRoute = state.showFieldTripRoute;
      renderFieldTripMarkers();
      saveSettings();
    });
  }
  dom.seamless200kToggle.addEventListener('change', toggleSeamless200k);
  dom.seamlessOpacitySlider.addEventListener('input', handleSeamlessOpacityChange);
  dom.seamlessOpacitySlider.addEventListener('change', saveSettings);
  if (dom.seamlessQueryToggle) {
    dom.seamlessQueryToggle.addEventListener('change', () => {
      state.seamlessQueryPriority = dom.seamlessQueryToggle.checked;
      state.settings.seamlessQueryPriority = state.seamlessQueryPriority;
      saveSettings();
      syncSettingsUI();
    });
  }

  let resizeTimer = null;
  let lastWasMobile = window.innerWidth <= 720;
  window.addEventListener('resize', () => {
    hideLegendLoupe();
    refreshLoupeRects();
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      const isNowMobile = window.innerWidth <= 720;
      if (isNowMobile !== lastWasMobile) {
        lastWasMobile = isNowMobile;
        setLeftDrawerCollapsed(state.isLeftDrawerCollapsed);
      }
      if (state.map) {
        state.map.invalidateSize({ animate: false, pan: false });
      }
      if (state.fieldTripItems.length > 0) {
        renderFieldTripMarkers();
      }
    }, 150);
  }, { passive: true });
}

function initEventListeners() {
  bindSearchEvents();
  bindFilterEvents();
  bindFieldTripEvents();
  bindInspectorEvents();
  bindMapControlEvents();

  const popoverPairs = getPopoverPairs();
  popoverPairs.forEach(([btn, pop]) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      togglePopover(btn, pop);
    });
  });

  document.addEventListener('click', (event) => {
    const insidePopover = popoverPairs.some(([btn, pop]) => pop.contains(event.target) || btn.contains(event.target));
    if (!insidePopover) {
      closeAllPopovers();
    }
  });

  dom.basemapButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchBasemap(btn.dataset.basemap));
  });

  dom.themeChoiceButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeChoice, { persist: true }));
  });

  dom.langButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });

  dom.resetSettingsBtn.addEventListener('click', resetAllSettings);

  dom.mobileNavButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchMobileView(btn.dataset.mobileView));
  });

  document.addEventListener('keydown', handleGlobalKeydown);
}

async function fetchMapIndex(url) {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(t().loadErrorMessage);
  }
  return response.json();
}

async function init() {
  const permalink = parsePermalinkHash();
  loadSettings();
  initTheme();
  syncSettingsUI();
  setLeftDrawerCollapsed(true);
  switchMobileView('map');

  state.map = initMap({
    onMoveEnd: () => {
      if (state.viewportOnly) {
        applyFilters();
      }
      updateAutoInspectedItem();
    },
    onZoomEnd: () => {
      if (state.fieldTripItems.length > 0) {
        renderFieldTripMarkers();
      }
    },
    onMapClick: (event) => {
      if (state.seamlessLayer && event && event.latlng) {
        querySeamlessPointGeology(event.latlng);
      }
    },
    onPopupClose: (event) => {
      if (event && event.popup === state.seamlessPopup) {
        if (state.seamlessPointMarker && state.map) {
          state.map.removeLayer(state.seamlessPointMarker);
        }
        state.seamlessPointMarker = null;
        state.seamlessPopup = null;
      }
    }
  });

  if (permalink && permalink.hasView) {
    state.permalinkRestoredView = true;
    state.map.setView([permalink.lat, permalink.lng], permalink.z, { animate: false });
  }

  initEventListeners();
  renderFieldTripCategoryChips();
  if (state.settings.lang && state.settings.lang !== state.lang) {
    switchLanguage(state.settings.lang);
  }

  const seamlessPromise = loadSeamlessProvider({ forceEnable: Boolean(permalink && permalink.seamless) });
  const fieldTripsPromise = fetchFieldTrips({
    onLoaded: () => {
      buildSuggestionPool();
      if (permalink && permalink.trip) {
        const exists = state.fieldTripItems.some(
          (it) => getCourseKey(it.props) === permalink.trip
        );
        if (exists) {
          if (!state.showFieldTrips) {
            setFieldTripsVisible(true);
          }
          state.expandedFieldTripCourses.clear();
          state.expandedFieldTripCourses.add(permalink.trip);
          renderFieldTripMarkers();
          renderFieldTripList();
          if (!state.permalinkRestoredView) {
            fitExpandedFieldTrips();
          }
        }
      }
    }
  });

  try {
    const geojsonData = await fetchMapIndex(CONFIG.GEOJSON_URL);
    renderGeoJsonFeatures(geojsonData, {
      skipInitialFit: state.permalinkRestoredView || Boolean(permalink && permalink.trip)
    });

    if (permalink && permalink.maps.length > 0) {
      permalink.maps.forEach((mapId) => {
        const match = state.allItems.find((it) => String(it.meta.mapId) === String(mapId));
        if (match) {
          addOverlayForItem(match);
        }
      });
    }
  } catch {
    dom.resultCount.textContent = t().loadErrorCount;
    setStatusMessage(t().loadErrorMessage);
  }

  await Promise.allSettled([seamlessPromise, fieldTripsPromise]);
  if (permalink && permalink.hasView) {
    state.map.setView([permalink.lat, permalink.lng], permalink.z, { animate: false });
  }
  schedulePermalinkSync();
}

document.addEventListener('DOMContentLoaded', init);
