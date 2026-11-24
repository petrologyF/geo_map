import { CONFIG } from './config.js';
import { t } from './i18n.js';
import {
  buildSeamlessGeologyNode,
  createGeologicalLayer,
  getFallbackInspectorItem,
  renderActiveOverlayList,
  renderInspectorDetail,
  renderSeamlessPointCard
} from './inspector.js';
import { setStatusMessage, syncSettingsUI } from './map.js';
import { normalizeProperties } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { debouncedSaveSettings, saveSettings, state, dom } from './state.js';

/**
 * シームレス地質図の地点マーカー・ポップアップ・進行中リクエストを片付ける
 */
export function clearSeamlessPointUI() {
  if (state.seamlessAbortController) {
    state.seamlessAbortController.abort();
    state.seamlessAbortController = null;
  }
  if (state.map && state.seamlessPopup) {
    state.map.closePopup(state.seamlessPopup);
    state.seamlessPopup = null;
  }
  if (state.map && state.seamlessPointMarker) {
    state.map.removeLayer(state.seamlessPointMarker);
    state.seamlessPointMarker = null;
  }
  state.lastSeamlessPoint = null;
  renderSeamlessPointCard();
}

/**
 * 20万分の1シームレス地質図 V2 API で指定座標の地質情報を照会し、ポップアップ＋右インスペクタに反映する
 */
export async function querySeamlessPointGeology(latlng) {
  if (!state.map || !state.seamlessLayer || !latlng) {
    return;
  }
  const lat = Number(latlng.lat);
  const lng = Number(latlng.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return;
  }

  if (state.seamlessAbortController) {
    state.seamlessAbortController.abort();
    state.seamlessAbortController = null;
  }

  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;

  if (!state.seamlessPointMarker) {
    state.seamlessPointMarker = L.circleMarker([lat, lng], {
      radius: 7,
      color: '#ffffff',
      weight: 2.5,
      fillColor: '#00796b',
      fillOpacity: 1,
      interactive: false
    }).addTo(state.map);
  } else {
    state.seamlessPointMarker.setLatLng([lat, lng]);
  }

  if (!state.seamlessPopup) {
    state.seamlessPopup = L.popup({
      className: 'seamless-leaflet-popup',
      maxWidth: 280,
      autoPanPadding: [24, 24]
    });
  }

  const showResult = (record) => {
    state.lastSeamlessPoint = record;
    if (state.seamlessPopup && state.map) {
      state.seamlessPopup
        .setLatLng([lat, lng])
        .setContent(buildSeamlessGeologyNode(record))
        .openOn(state.map);
    }
    renderSeamlessPointCard();
  };

  if (state.seamlessPointCache.has(cacheKey)) {
    showResult({ status: 'ok', lat, lng, data: state.seamlessPointCache.get(cacheKey) });
    return;
  }

  showResult({ status: 'loading', lat, lng, data: null });

  const controller = new AbortController();
  state.seamlessAbortController = controller;

  try {
    const url = `${CONFIG.SEAMLESS_LEGEND_API_URL}?point=${lat.toFixed(6)},${lng.toFixed(6)}`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const text = await response.text();
    const data = text.trim() ? JSON.parse(text) : {};
    if (state.seamlessPointCache.size >= 200) {
      const oldestKey = state.seamlessPointCache.keys().next().value;
      state.seamlessPointCache.delete(oldestKey);
    }
    state.seamlessPointCache.set(cacheKey, data);
    if (state.seamlessAbortController === controller) {
      state.seamlessAbortController = null;
      showResult({ status: 'ok', lat, lng, data });
    }
  } catch (error) {
    if (error && error.name === 'AbortError') {
      return;
    }
    console.warn('Seamless V2 legend query failed:', error);
    if (state.seamlessAbortController === controller) {
      state.seamlessAbortController = null;
      showResult({ status: 'error', lat, lng, data: null });
    }
  }
}

/**
 * 20万分の1日本シームレス地質図 V2 の表示/非表示を切り替える
 */
export function toggleSeamless200k() {
  const enabled = dom.seamless200kToggle.checked;
  state.settings.seamless200k = enabled;
  saveSettings();
  syncSettingsUI();

  if (!state.map) {
    return;
  }

  if (!enabled) {
    clearSeamlessPointUI();
    if (state.seamlessLayer) {
      if (typeof state.seamlessLayer.off === 'function') {
        state.seamlessLayer.off();
      }
      state.map.removeLayer(state.seamlessLayer);
      state.seamlessLayer = null;
    }
    if (state.inspectedItem === state.seamlessVirtualItem) {
      state.inspectedItem = getFallbackInspectorItem();
    }
    renderInspectorDetail(state.inspectedItem);
    schedulePermalinkSync();
    return;
  }

  if (!state.seamlessMeta) {
    dom.seamless200kToggle.checked = false;
    state.settings.seamless200k = false;
    saveSettings();
    syncSettingsUI();
    setStatusMessage(t().seamlessMissingMessage);
    return;
  }

  if (!state.seamlessLayer) {
    state.seamlessLayer = createGeologicalLayer(state.seamlessMeta, null, 200, state.seamlessOpacity);
    if (state.seamlessLayer) {
      let seamlessLoadedCount = 0;
      let seamlessErrorCount = 0;
      state.seamlessLayer.on('loading', () => {
        seamlessLoadedCount = 0;
        seamlessErrorCount = 0;
      });
      state.seamlessLayer.on('tileload', () => {
        seamlessLoadedCount += 1;
      });
      state.seamlessLayer.on('tileerror', () => {
        seamlessErrorCount += 1;
      });
      state.seamlessLayer.on('load', () => {
        if (seamlessLoadedCount === 0 && seamlessErrorCount > 0) {
          console.warn('Seamless V2 tile load failed:', state.seamlessMeta.overlayUrl);
          setStatusMessage(t().seamlessTileErrorMessage);
        }
      });
      state.seamlessLayer.addTo(state.map);
    }
  }
  if (!state.inspectedItem && state.seamlessVirtualItem) {
    // オーバーレイが0件のときは自動で全高パネルを開かず、再展開タブから開ける状態にする
    if (state.activeOverlays.length === 0) {
      state.isRightInspectorCollapsed = true;
    }
    renderInspectorDetail(state.seamlessVirtualItem);
    renderActiveOverlayList();
  }
  schedulePermalinkSync();
}

/**
 * シームレス地質図V2の透過度スライダー操作を反映する
 */
export function handleSeamlessOpacityChange() {
  const pct = Number(dom.seamlessOpacitySlider.value);
  const opacity = Math.min(1, Math.max(0, pct / 100));
  state.seamlessOpacity = opacity;
  state.settings.seamlessOpacity = opacity;
  if (dom.seamlessOpacityValue) {
    dom.seamlessOpacityValue.textContent = `${pct}%`;
  }
  if (state.seamlessLayer && typeof state.seamlessLayer.setOpacity === 'function') {
    state.seamlessLayer.setOpacity(opacity);
  }
  debouncedSaveSettings();
}

/**
 * 20万分の1シームレス地質図プロバイダ設定を読み込む
 */
export async function loadSeamlessProvider({ forceEnable = false } = {}) {
  try {
    const response = await fetch(CONFIG.SEAMLESS_PROVIDER_URL, { cache: 'no-cache' });
    if (!response.ok) {
      return;
    }
    const records = await response.json();
    if (Array.isArray(records) && records.length > 0) {
      state.seamlessMeta = normalizeProperties(records[0]);
      state.seamlessVirtualItem = { layer: null, meta: state.seamlessMeta };
      if ((forceEnable || state.settings.seamless200k) && dom.seamless200kToggle) {
        dom.seamless200kToggle.checked = true;
        toggleSeamless200k();
      }
    }
  } catch {
    // ignore optional seamless config failure
  }
}
