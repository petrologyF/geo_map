import { CONFIG } from './config.js';
import { t } from './i18n.js';
import { getItemBounds } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { saveSettings, state, dom } from './state.js';

/**
 * ステータスメッセージを表示/非表示にする
 */
export function setStatusMessage(message) {
  if (!dom.statusMessage) {
    return;
  }
  if (!message) {
    dom.statusMessage.textContent = '';
    dom.statusMessage.hidden = true;
  } else {
    dom.statusMessage.textContent = message;
    dom.statusMessage.hidden = false;
  }
}

/**
 * 件数バッジを更新する
 */
export function updateResultCount(visibleCount, totalCount) {
  if (dom.resultCount) {
    dom.resultCount.textContent = t().resultCount(visibleCount, totalCount);
  }
}

/**
 * 各種設定コントロールの表示状態を state.settings と同期する
 */
export function syncSettingsUI() {
  const s = state.settings;
  if (dom.showIndexToggle) {
    dom.showIndexToggle.checked = Boolean(state.showIndexFrames);
  }
  if (dom.fieldTripsFabBtn) {
    const isOn = Boolean(state.showFieldTrips);
    dom.fieldTripsFabBtn.classList.toggle('is-field-trip-active', isOn);
    dom.fieldTripsFabBtn.setAttribute('aria-pressed', String(isOn));
  }
  if (dom.drawerTripYearFilter) {
    dom.drawerTripYearFilter.value = state.fieldTripYear;
  }
  if (dom.drawerTripCourseFilter) {
    dom.drawerTripCourseFilter.value = state.fieldTripCourse;
  }
  if (dom.viewportOnlyToggle) {
    dom.viewportOnlyToggle.checked = Boolean(state.viewportOnly);
  }
  if (dom.seamless200kToggle) {
    dom.seamless200kToggle.checked = Boolean(s.seamless200k);
  }
  const seamlessPct = Math.round(state.seamlessOpacity * 100);
  if (dom.seamlessOpacitySlider) {
    dom.seamlessOpacitySlider.value = String(seamlessPct);
  }
  if (dom.seamlessOpacityValue) {
    dom.seamlessOpacityValue.textContent = `${seamlessPct}%`;
  }
  if (dom.seamlessOpacityRow) {
    dom.seamlessOpacityRow.hidden = !Boolean(s.seamless200k);
  }
  if (dom.seamlessQueryRow) {
    dom.seamlessQueryRow.hidden = !Boolean(s.seamless200k);
  }
  if (dom.seamlessQueryToggle) {
    dom.seamlessQueryToggle.checked = Boolean(state.seamlessQueryPriority);
  }
  if (dom.mapEl) {
    dom.mapEl.classList.toggle('map-query-cursor', Boolean(s.seamless200k && state.seamlessQueryPriority));
  }
  dom.basemapButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.basemap === state.activeBasemapKey);
  });
  dom.themeChoiceButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.themeChoice === state.theme);
  });
  dom.langButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
  });
  if (dom.wheelZoomSpeedSlider) {
    dom.wheelZoomSpeedSlider.value = String(state.wheelZoomSpeed);
  }
  if (dom.wheelZoomSpeedValue) {
    dom.wheelZoomSpeedValue.textContent = `${state.wheelZoomSpeed.toFixed(1)}x`;
  }
  const overlayPct = Math.round(state.overlayOpacity * 100);
  if (dom.defaultOverlayOpacitySlider) {
    dom.defaultOverlayOpacitySlider.value = String(overlayPct);
  }
  if (dom.defaultOverlayOpacityValue) {
    dom.defaultOverlayOpacityValue.textContent = `${overlayPct}%`;
  }
  if (dom.showScaleToggle) {
    dom.showScaleToggle.checked = Boolean(state.showScaleBar);
  }
  if (dom.showTripRouteToggle) {
    dom.showTripRouteToggle.checked = Boolean(state.showFieldTripRoute);
  }
}

/**
 * ベースマップ（背景地図）を切り替える
 */
export function switchBasemap(key) {
  if (!CONFIG.BASEMAPS[key] || !state.map) {
    return;
  }

  if (state.activeBaseLayer) {
    state.map.removeLayer(state.activeBaseLayer);
  }

  const def = CONFIG.BASEMAPS[key];
  state.activeBaseLayer = L.tileLayer(def.url, {
    attribution: def.attribution,
    maxNativeZoom: def.maxNativeZoom || def.maxZoom || CONFIG.MAX_ZOOM,
    maxZoom: def.maxZoom || CONFIG.MAX_ZOOM,
    keepBuffer: 4,
    zIndex: 1
  });

  state.activeBaseLayer.addTo(state.map);
  state.activeBaseLayer.bringToBack();
  state.activeBasemapKey = key;
  state.settings.basemap = key;
  saveSettings();
  syncSettingsUI();
}

/**
 * ドロワー・インスペクタ・下部ドックの実測サイズを考慮した fitBounds 用パディングを返す
 */
export function getMapFitPadding() {
  const isMobile = window.innerWidth <= 720;
  let leftPad = 24;
  let rightPad = 24;
  let topPad = isMobile ? 60 : 24;
  let bottomPad = isMobile ? 64 : 24;

  if (!isMobile) {
    if (dom.leftDrawer && !dom.leftDrawer.classList.contains('is-collapsed')) {
      const rect = dom.leftDrawer.getBoundingClientRect();
      if (rect.width > 0) {
        leftPad = Math.max(leftPad, Math.round(rect.right + 16));
      }
    }
    if (dom.rightInspector && dom.rightInspector.classList.contains('is-open')) {
      const rect = dom.rightInspector.getBoundingClientRect();
      if (rect.width > 0) {
        rightPad = Math.max(rightPad, Math.round(window.innerWidth - rect.left + 16));
      }
    }
  }

  if (dom.fieldTripActiveBar && !dom.fieldTripActiveBar.hidden) {
    const barRect = dom.fieldTripActiveBar.getBoundingClientRect();
    if (barRect.height > 0) {
      bottomPad = Math.max(bottomPad, Math.round(window.innerHeight - barRect.top + 16));
    }
  }

  return {
    paddingTopLeft: [leftPad, topPad],
    paddingBottomRight: [rightPad, bottomPad]
  };
}

/**
 * 指定されたアイテム群の全体が収まるよう地図をフィットする
 */
export function fitBoundsForItems(items, { animate = true } = {}) {
  if (!state.map || !items || items.length === 0) {
    return;
  }
  let merged = null;
  items.forEach((item) => {
    const b = getItemBounds(item);
    if (b && b.isValid()) {
      merged = merged ? merged.extend(b) : L.latLngBounds(b.getSouthWest(), b.getNorthEast());
    }
  });
  if (merged && merged.isValid()) {
    state.map.stop();
    const pad = getMapFitPadding();
    if (animate) {
      state.map.flyToBounds(merged, { ...pad, maxZoom: 11, duration: 0.65 });
    } else {
      state.map.fitBounds(merged, { ...pad, maxZoom: 11, animate: false });
    }
  }
}

/**
 * 絞り込み中の全図幅にズームする
 */
export function fitAllVisibleItems(options = {}) {
  const targets = state.filteredItems.filter((it) => it.meta.geometryModel !== 'continuous_polygon');
  fitBoundsForItems(targets.length > 0 ? targets : state.filteredItems, options);
}

/**
 * スケールバー（縮尺）の表示/非表示を地図に反映する
 */
export function applyScaleBarVisibility() {
  if (!state.map || !state.scaleControl) {
    return;
  }
  if (state.showScaleBar) {
    if (!state.scaleControl._map) {
      state.scaleControl.addTo(state.map);
    }
  } else if (state.scaleControl._map) {
    state.scaleControl.remove();
  }
}

/**
 * モバイル表示時のアクティブパネルを切り替える
 */
export function switchMobileView(view) {
  dom.appLayout.dataset.mobileView = view;
  dom.mobileNavButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.mobileView === view);
  });
  if (dom.leftDrawerWrap) {
    const isMobileSearch = window.innerWidth <= 720 && view === 'search';
    dom.leftDrawerWrap.inert = state.isLeftDrawerCollapsed && !isMobileSearch;
  }
  if (view === 'map' && state.map) {
    setTimeout(() => state.map.invalidateSize({ animate: false, pan: false }), 50);
  }
}

/**
 * 左検索・一覧ドロワーの折りたたみ状態を切り替える
 */
export function setLeftDrawerCollapsed(collapsed) {
  state.isLeftDrawerCollapsed = Boolean(collapsed);
  dom.leftDrawer.classList.toggle('is-collapsed', state.isLeftDrawerCollapsed);
  if (dom.appLayout) {
    dom.appLayout.classList.toggle('has-left-drawer', !state.isLeftDrawerCollapsed);
  }
  if (!state.isLeftDrawerCollapsed && window.innerWidth > 720 && window.innerWidth < 1100) {
    if (dom.rightInspector && dom.rightInspector.classList.contains('is-open')) {
      state.isRightInspectorCollapsed = true;
      dom.rightInspector.classList.remove('is-open');
      dom.rightInspector.inert = true;
      dom.appLayout.classList.remove('has-right-inspector');
      if (dom.reopenRightBtn) {
        dom.reopenRightBtn.classList.add('is-open');
        dom.reopenRightBtn.inert = false;
      }
    }
  }
  if (dom.leftDrawerWrap) {
    const isMobileSearch = window.innerWidth <= 720 && dom.appLayout.dataset.mobileView === 'search';
    dom.leftDrawerWrap.inert = state.isLeftDrawerCollapsed && !isMobileSearch;
  }
  dom.toggleLeftDrawerBtn.setAttribute('aria-expanded', String(!state.isLeftDrawerCollapsed));
  const title = state.isLeftDrawerCollapsed ? t().toggleDrawerExpand : t().toggleDrawerCollapse;
  dom.toggleLeftDrawerBtn.title = title;
  dom.toggleLeftDrawerBtn.setAttribute('aria-label', title);
}

/**
 * すべてのマップポップオーバー（レイヤー設定・環境設定）を閉じる
 */
export function closeAllPopovers() {
  [
    [dom.layersPopoverBtn, dom.layersPopover],
    [dom.prefsPopoverBtn, dom.prefsPopover]
  ].forEach(([btn, popover]) => {
    if (popover) {
      popover.classList.remove('is-open');
      popover.inert = true;
    }
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 指定ポップオーバーの開閉を切り替える
 */
export function togglePopover(btn, popover) {
  if (!btn || !popover) {
    return;
  }
  const willOpen = !popover.classList.contains('is-open');
  closeAllPopovers();
  if (willOpen) {
    popover.classList.add('is-open');
    popover.inert = false;
    btn.setAttribute('aria-expanded', 'true');
  }
}

/**
 * テーマ（light / dark）を適用し、必要に応じて保存する
 */
export function applyTheme(theme, { persist = false } = {}) {
  const next = theme === 'dark' ? 'dark' : 'light';
  state.theme = next;
  if (next === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  if (persist) {
    state.settings.theme = next;
    saveSettings();
  }
  syncSettingsUI();
}

/**
 * 保存済み設定または OS 設定から初期テーマを決定する
 */
export function initTheme() {
  const saved = state.settings.theme;
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

/**
 * ブラウザの Geolocation API で現在地を取得し、拡大移動する
 */
export function locateCurrentPosition() {
  const dict = t();
  if (!navigator.geolocation) {
    setStatusMessage(dict.locateUnsupported);
    return;
  }
  if (!state.map) {
    return;
  }

  setStatusMessage('');
  if (dom.locateMeBtn) {
    dom.locateMeBtn.classList.add('is-locating');
    dom.locateMeBtn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (dom.locateMeBtn) {
        dom.locateMeBtn.classList.remove('is-locating');
        dom.locateMeBtn.disabled = false;
      }
      const { latitude, longitude, accuracy } = pos.coords;
      const latlng = L.latLng(latitude, longitude);

      if (state.userLocationLayerGroup) {
        state.userLocationLayerGroup.clearLayers();
        if (Number.isFinite(accuracy) && accuracy > 0) {
          L.circle(latlng, {
            radius: accuracy,
            color: '#1a73e8',
            weight: 1,
            opacity: 0.45,
            fillColor: '#1a73e8',
            fillOpacity: 0.12,
            interactive: false
          }).addTo(state.userLocationLayerGroup);
        }
        const dotIcon = L.divIcon({
          className: 'user-location-marker',
          html: '<div class="user-location-dot"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        L.marker(latlng, { icon: dotIcon, interactive: false, pane: 'fieldTripsPane' }).addTo(state.userLocationLayerGroup);
      }

      const targetZoom = Math.max(state.map.getZoom(), 14);
      state.map.flyTo(latlng, targetZoom, { duration: 0.9 });
    },
    (err) => {
      if (dom.locateMeBtn) {
        dom.locateMeBtn.classList.remove('is-locating');
        dom.locateMeBtn.disabled = false;
      }
      if (err && err.code === 1) {
        setStatusMessage(dict.locateDenied);
      } else {
        setStatusMessage(dict.locateFailed);
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

/**
 * Leaflet マップを初期化する
 */
export function initMap({ onMoveEnd, onZoomEnd, onMapClick, onPopupClose } = {}) {
  const canvasRenderer = L.canvas({ padding: 0.8, tolerance: 4 });
  const map = L.map('map', {
    center: CONFIG.INITIAL_CENTER,
    zoom: CONFIG.INITIAL_ZOOM,
    minZoom: CONFIG.MIN_ZOOM,
    maxZoom: CONFIG.MAX_ZOOM,
    zoomControl: false,
    preferCanvas: true,
    renderer: canvasRenderer,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: Math.round(100 / (state.wheelZoomSpeed || 1.0)),
    wheelDebounceTime: 16,
    inertia: true,
    inertiaDeceleration: 2200,
    inertiaMaxSpeed: 2200,
    easeLinearity: 0.2,
    zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true
  });

  state.map = map;
  switchBasemap(state.settings.basemap);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  if (dom.mapBottomRightControls) {
    const BottomRightToolbar = L.Control.extend({
      options: { position: 'bottomright' },
      onAdd: () => {
        L.DomEvent.disableClickPropagation(dom.mapBottomRightControls);
        L.DomEvent.disableScrollPropagation(dom.mapBottomRightControls);
        return dom.mapBottomRightControls;
      }
    });
    new BottomRightToolbar().addTo(map);
  }
  state.scaleControl = L.control.scale({ imperial: false, position: 'bottomleft' });
  if (state.showScaleBar) {
    state.scaleControl.addTo(map);
  }

  state.indexLayerGroup = L.layerGroup();
  if (state.showIndexFrames) {
    state.indexLayerGroup.addTo(map);
  }

  const fieldTripsPane = map.createPane('fieldTripsPane');
  fieldTripsPane.style.zIndex = '650';
  state.fieldTripsLayerGroup = L.layerGroup();
  if (state.showFieldTrips) {
    state.fieldTripsLayerGroup.addTo(map);
  }

  state.userLocationLayerGroup = L.layerGroup().addTo(map);

  map.on('moveend', () => {
    schedulePermalinkSync();
    if (typeof onMoveEnd === 'function') {
      onMoveEnd();
    }
  });

  map.on('zoomend', () => {
    if (typeof onZoomEnd === 'function') {
      onZoomEnd();
    }
  });

  map.on('click', (event) => {
    if (typeof onMapClick === 'function') {
      onMapClick(event);
    }
  });

  map.on('popupclose', (event) => {
    if (typeof onPopupClose === 'function') {
      onPopupClose(event);
    }
  });

  return map;
}
