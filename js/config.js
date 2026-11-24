/**
 * アプリケーション設定定数・地域/提供機関英語マッピング
 */
export const CONFIG = {
  GEOJSON_URL: 'data/map_index.geojson',
  FIELD_TRIPS_GEOJSON_URL: 'data/field_trips.geojson',
  SEAMLESS_PROVIDER_URL: 'data/providers/gsj_seamless_200k.json',
  SEAMLESS_LEGEND_API_URL: 'https://gbank.gsj.jp/seamless/v2/api/1.2/legend.json',
  BASEMAPS: {
    blank: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（白地図）</a>',
      maxNativeZoom: 14,
      maxZoom: 18
    },
    pale: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（淡色）</a>',
      maxZoom: 18
    },
    std: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（標準）</a>',
      maxZoom: 18
    },
    photo: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（航空写真）</a>',
      maxZoom: 18
    }
  },
  GSJ_ATTRIBUTION: '産業技術総合研究所 地質調査総合センター',
  INITIAL_CENTER: [36.5, 138.0],
  INITIAL_ZOOM: 5.5,
  MIN_ZOOM: 2,
  MAX_ZOOM: 18,
  MAX_LIST_ITEMS: 100,
  MAX_SUGGESTIONS: 10,
  MAX_OVERLAYS: 4,
  LOUPE_ZOOM: 2.8,
  DEFAULT_OVERLAY_OPACITY: 0.85,
  DEFAULT_SEAMLESS_OPACITY: 0.65,
  SETTINGS_STORAGE_KEY: 'geomap_settings_v1',
  DEFAULT_SETTINGS: {
    basemap: 'blank',
    showIndexFrames: true,
    showFieldTrips: true,
    fieldTripYear: 'all',
    fieldTripCourse: 'all',
    fieldTripCategories: [],
    viewportOnly: false,
    seamless200k: false,
    seamlessOpacity: 0.65,
    seamlessQueryPriority: false,
    overlayOpacity: 0.85,
    wheelZoomSpeed: 1.0,
    showScaleBar: true,
    showFieldTripRoute: true,
    theme: '',
    lang: 'ja'
  },
  WMS_OPTIONS: {
    layers: 'geo_A',
    transparent: true,
    format: 'image/png',
    version: '1.1.1'
  },
  POLYGON_STYLE: {
    default: {
      color: '#1557b0',
      weight: 1.8,
      opacity: 0.85,
      fillColor: '#1a73e8',
      fillOpacity: 0.08
    },
    hover: {
      color: '#0d47a1',
      weight: 2.6,
      opacity: 0.98,
      fillColor: '#1a73e8',
      fillOpacity: 0.2
    },
    selected: {
      color: '#0b57d0',
      weight: 3,
      opacity: 1,
      fillColor: '#1a73e8',
      fillOpacity: 0.14
    }
  }
};

export const REGION_EN_MAP = {
  '北海道': 'Hokkaido',
  '富山県': 'Toyama',
  '石川県': 'Ishikawa',
  '長野県': 'Nagano',
  '岐阜県': 'Gifu',
  '山梨県': 'Yamanashi',
  '静岡県': 'Shizuoka',
  '福岡県': 'Fukuoka',
  '宮城県': 'Miyagi',
  '全国': 'Nationwide'
};

export const PROVIDER_EN_MAP = {
  '産業技術総合研究所 地質調査総合センター': 'Geological Survey of Japan, AIST',
  '北海道立総合研究機構 エネルギー・環境・地質研究所': 'Geological Survey of Hokkaido, HRO'
};

export const FIELD_TRIP_CATEGORIES = {
  volcano: { color: '#fecdd3', darkColor: '#fda4af', accentDark: '#fda4af', routeColor: '#fb7185' },
  basement: { color: '#bbf7d0', darkColor: '#86efac', accentDark: '#86efac', routeColor: '#4ade80' },
  sedimentary: { color: '#bfdbfe', darkColor: '#93c5fd', accentDark: '#93c5fd', routeColor: '#60a5fa' },
  hazard_geo: { color: '#e2e8f0', darkColor: '#cbd5e1', accentDark: '#cbd5e1', routeColor: '#94a3b8' }
};

export const FIELD_TRIP_CATEGORY_KEYS = Object.keys(FIELD_TRIP_CATEGORIES);
