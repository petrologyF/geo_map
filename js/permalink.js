import { CONFIG } from './config.js';
import { state } from './state.js';

let permalinkSyncTimer = null;

/**
 * URL ハッシュ（#lat=...&lng=...&z=...&maps=...&seamless=1&trip=...）を安全にパースする
 */
export function parsePermalinkHash(hashStr = window.location.hash) {
  const raw = (hashStr || '').replace(/^#/, '').trim();
  if (!raw) {
    return null;
  }
  const params = new URLSearchParams(raw);
  const result = {
    hasView: false,
    lat: null,
    lng: null,
    z: null,
    maps: [],
    seamless: false,
    trip: ''
  };

  const lat = Number(params.get('lat'));
  const lng = Number(params.get('lng'));
  const z = Number(params.get('z'));
  if (
    params.has('lat') &&
    params.has('lng') &&
    params.has('z') &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Number.isFinite(z) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    z >= CONFIG.MIN_ZOOM &&
    z <= CONFIG.MAX_ZOOM
  ) {
    result.hasView = true;
    result.lat = lat;
    result.lng = lng;
    result.z = z;
  }

  const mapsRaw = params.get('maps');
  if (mapsRaw) {
    result.maps = mapsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, CONFIG.MAX_OVERLAYS);
  }

  const seamlessRaw = params.get('seamless');
  result.seamless = seamlessRaw === '1' || seamlessRaw === 'true';

  const tripRaw = params.get('trip');
  if (tripRaw && tripRaw.trim()) {
    result.trip = tripRaw.trim();
  }

  const hasAny = result.hasView || result.maps.length > 0 || result.seamless || Boolean(result.trip);
  return hasAny ? result : null;
}

/**
 * 現在の地図・オーバーレイ・シームレス・展開中巡検コースを URL ハッシュへ反映する
 */
export function syncPermalinkNow() {
  if (permalinkSyncTimer) {
    clearTimeout(permalinkSyncTimer);
    permalinkSyncTimer = null;
  }
  if (!state.map) {
    return;
  }

  const params = new URLSearchParams();
  const center = state.map.getCenter();
  const zoom = state.map.getZoom();
  if (center && Number.isFinite(center.lat) && Number.isFinite(center.lng) && Number.isFinite(zoom)) {
    params.set('lat', center.lat.toFixed(4));
    params.set('lng', center.lng.toFixed(4));
    params.set('z', String(Math.round(zoom * 100) / 100));
  }

  const mapIds = state.activeOverlays
    .map((entry) => entry?.item?.meta?.mapId)
    .filter(Boolean);
  if (mapIds.length > 0) {
    params.set('maps', mapIds.join(','));
  }

  if (state.seamlessLayer) {
    params.set('seamless', '1');
  }

  if (state.expandedFieldTripCourses.size > 0) {
    const firstCourse = Array.from(state.expandedFieldTripCourses)[0];
    if (firstCourse) {
      params.set('trip', firstCourse);
    }
  }

  const nextHash = `#${params.toString()}`;
  if (window.location.hash !== nextHash) {
    try {
      history.replaceState(null, '', nextHash);
    } catch {
      // ignore history errors
    }
  }
}

/**
 * URL ハッシュ同期をデバウンス付きでスケジュールする
 */
export function schedulePermalinkSync() {
  if (permalinkSyncTimer) {
    clearTimeout(permalinkSyncTimer);
  }
  permalinkSyncTimer = setTimeout(() => {
    permalinkSyncTimer = null;
    syncPermalinkNow();
  }, 250);
}
