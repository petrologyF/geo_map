(() => {
  'use strict';

  /**
   * アプリケーション設定定数
   */
  const CONFIG = {
    GEOJSON_URL: 'data/map_index.geojson',
    BASEMAPS: {
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
    INITIAL_CENTER: [36.2048, 138.2529],
    INITIAL_ZOOM: 5,
    MIN_ZOOM: 2,
    MAX_ZOOM: 18,
    MAX_LIST_ITEMS: 100,
    MAX_SUGGESTIONS: 10,
    MAX_OVERLAYS: 4,
    DEFAULT_OVERLAY_OPACITY: 0.85,
    WMS_OPTIONS: {
      layers: 'geo_A',
      transparent: true,
      format: 'image/png',
      version: '1.1.1'
    },
    POLYGON_STYLE: {
      default: {
        color: '#1a73e8',
        weight: 1.5,
        opacity: 0.55,
        fillColor: '#1a73e8',
        fillOpacity: 0.03
      },
      hover: {
        color: '#174ea6',
        weight: 2.2,
        opacity: 0.85,
        fillColor: '#1a73e8',
        fillOpacity: 0.12
      },
      selected: {
        color: '#1967d2',
        weight: 2.5,
        opacity: 0.95,
        fillColor: '#1a73e8',
        fillOpacity: 0.08
      }
    }
  };

  /**
   * UIテキスト多言語辞書
   */
  const I18N = {
    ja: {
      appTitle: '5万分の1地質図幅',
      searchPlaceholder: '図幅名または著者で検索',
      decadeLabel: '発行年（複数選択可）',
      decadeUnit: '年代',
      reset: 'リセット',
      basemapLabel: '背景地図',
      basemapPale: '淡色',
      basemapStd: '標準',
      basemapPhoto: '航空写真',
      activeMapsTitle: (n, max) => `表示中の地質図 (${n}/${max})`,
      clearAll: 'すべて閉じる',
      opacity: '透過度',
      resultListLabel: '該当図幅一覧',
      resultCount: (v, t) => `${v} / ${t} 件`,
      noMatch: '条件に一致する図幅がありません',
      moreItems: (n) => `ほか ${n} 件（検索で絞り込めます）`,
      badgeMap: '図幅',
      badgeAuthor: '著者',
      eyebrow: '表示中の図幅詳細',
      yearLabel: '発行年',
      yearSuffix: '年',
      yearUnknown: '不明',
      authorsLabel: '著者',
      publisherLabel: '発行',
      regionLabel: '地域',
      linkDetail: '詳細情報',
      linkPdf: '説明書PDF',
      linkOriginal: '原図JPG',
      legendTitle: '地質凡例',
      legendOpen: '拡大',
      legendNone: '凡例画像なし',
      unknownAuthor: '不明'
    },
    en: {
      appTitle: '1:50K GeoMap',
      searchPlaceholder: 'Search by map name or author',
      decadeLabel: 'Published Decade (Multi-select)',
      decadeUnit: 's',
      reset: 'Reset',
      basemapLabel: 'Basemap',
      basemapPale: 'Pale',
      basemapStd: 'Std',
      basemapPhoto: 'Photo',
      activeMapsTitle: (n, max) => `Active Maps (${n}/${max})`,
      clearAll: 'Clear all',
      opacity: 'Opacity',
      resultListLabel: 'Matching Maps',
      resultCount: (v, t) => `${v} / ${t} maps`,
      noMatch: 'No matching maps found',
      moreItems: (n) => `${n} more (refine search)`,
      badgeMap: 'Map',
      badgeAuthor: 'Author',
      eyebrow: 'Active Map Details',
      yearLabel: 'Year',
      yearSuffix: '',
      yearUnknown: 'Unknown',
      authorsLabel: 'Authors',
      publisherLabel: 'Publisher',
      regionLabel: 'Region',
      linkDetail: 'Details',
      linkPdf: 'PDF',
      linkOriginal: 'Original JPG',
      legendTitle: 'Legend',
      legendOpen: 'Open',
      legendNone: 'No legend image',
      unknownAuthor: 'Unknown'
    }
  };

  /**
   * アプリケーション状態
   */
  const state = {
    lang: 'ja',
    map: null,
    activeBaseLayer: null,
    indexLayerGroup: null,
    allItems: [],
    filteredItems: [],
    selectedDecades: new Set(),
    suggestionPool: [],
    currentSuggestions: [],
    activeSuggestionIndex: -1,
    activeOverlays: [],
    dominantLegendItem: null,
    overlayOpacity: CONFIG.DEFAULT_OVERLAY_OPACITY
  };

  /**
   * DOM要素のキャッシュ
   */
  const dom = {
    appTitle: document.getElementById('app-title'),
    langButtons: document.querySelectorAll('.segmented-btn[data-lang]'),
    fitAllBtn: document.getElementById('fit-all-btn'),
    searchInput: document.getElementById('search-input'),
    searchSuggestions: document.getElementById('search-suggestions'),
    decadeLabel: document.getElementById('decade-label'),
    decadeChips: document.getElementById('decade-chips'),
    resetFiltersBtn: document.getElementById('reset-filters'),
    basemapLabel: document.getElementById('basemap-label'),
    basemapButtons: document.querySelectorAll('.segmented-btn[data-basemap]'),
    resultCount: document.getElementById('result-count'),
    activeWmsBar: document.getElementById('active-wms-bar'),
    wmsStatusDot: document.getElementById('wms-status-dot'),
    activeWmsName: document.getElementById('active-wms-name'),
    activeOverlayList: document.getElementById('active-overlay-list'),
    clearWmsBtn: document.getElementById('clear-wms-btn'),
    opacityLabel: document.getElementById('opacity-label'),
    wmsOpacitySlider: document.getElementById('wms-opacity'),
    wmsOpacityValue: document.getElementById('wms-opacity-value'),
    legendSidebar: document.getElementById('legend-sidebar'),
    dominantInfoEyebrow: document.getElementById('dominant-info-eyebrow'),
    dominantInfoTitle: document.getElementById('dominant-info-title'),
    dominantInfoSubtitle: document.getElementById('dominant-info-subtitle'),
    dominantInfoMeta: document.getElementById('dominant-info-meta'),
    dominantInfoLinks: document.getElementById('dominant-info-links'),
    legendPanelTitle: document.getElementById('legend-panel-title'),
    legendMapName: document.getElementById('legend-map-name'),
    legendOpenLink: document.getElementById('legend-open-link'),
    legendImage: document.getElementById('legend-image'),
    resultListLabel: document.getElementById('result-list-label'),
    resultList: document.getElementById('result-list'),
    statusMessage: document.getElementById('status-message')
  };

  /**
   * URLが安全なスキーム（http/https）であるか検証する
   * @param {string} url - 検証対象のURL
   * @returns {boolean} 有効なURLならtrue
   */
  function isSafeUrl(url) {
    if (typeof url !== 'string' || !url.trim()) {
      return false;
    }
    try {
      const parsed = new URL(url, window.location.href);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * 推奨GeoJSONスキーマおよび従来スキーマの両方を統一フォーマットに正規化する
   * @param {Object} props - Featureのproperties
   * @returns {Object} 正規化されたメタデータ
   */
  function normalizeProperties(props = {}) {
    const mapNameJa = props.map_name_ja || props.map_name || props.map_name_en || '名称不明';
    const mapNameEn = props.map_name_en || props.map_name_ja || props.map_name || 'Untitled';
    const authorsJaList = Array.isArray(props.authors_ja)
      ? props.authors_ja.map((a) => String(a).trim()).filter(Boolean)
      : (typeof props.authors === 'string' && props.authors.trim()
        ? props.authors.split(/[・,、]/).map((a) => a.trim()).filter(Boolean)
        : []);
    const authorsEnList = Array.isArray(props.authors_en)
      ? props.authors_en.map((a) => String(a).trim()).filter(Boolean)
      : [];

    const authorsJa = authorsJaList.join('・');
    const authorsEn = authorsEnList.join(', ');

    const prefectures = Array.isArray(props.prefectures) && props.prefectures.length > 0
      ? props.prefectures.join('・')
      : (props.region || '');

    const tile = props.tile || {};
    const xyzUrl = tile.webp_template || tile.png_template || tile.xyz_template || '';
    const canUseXyz = props.is_tile_available !== false && isSafeUrl(xyzUrl);

    const wmsUrl = props.wms_url || '';
    const canUseWms = !canUseXyz && props.is_wms_available !== false && isSafeUrl(wmsUrl);

    const zoom = props.zoom || {};
    const zoomMin = typeof zoom.min === 'number'
      ? zoom.min
      : (typeof tile.min_zoom === 'number' ? tile.min_zoom : CONFIG.MIN_ZOOM);
    const zoomMax = typeof zoom.max === 'number'
      ? zoom.max
      : (typeof tile.max_zoom === 'number' ? tile.max_zoom : CONFIG.MAX_ZOOM);

    const rawBounds = Array.isArray(props.bounds) && props.bounds.length === 4
      ? props.bounds
      : (Array.isArray(tile.bounds) && tile.bounds.length === 4 ? tile.bounds : null);

    const attribution = props.license?.attribution || CONFIG.GSJ_ATTRIBUTION;
    const rawPdfUrl = props.downloads?.pdf || props.downloads?.PDF || '';
    const mapCode = props.map_code || props.layer_name || '';
    const mapId = props.map_id ?? null;
    const fallbackMetadataUrl = mapId != null
      ? `https://gbank.gsj.jp/ld/resource/publication/map/g050/map${String(mapId).padStart(5, '0')}.html`
      : '';
    const detailUrl = [
      props.metadata_url,
      fallbackMetadataUrl,
      props.related_resources?.publication_uri,
      props.related_resources?.catalog_url
    ].find((url) => isSafeUrl(url)) || '';

    const searchTokensJa = [mapNameJa, authorsJa, mapCode, prefectures].join(' ').toLowerCase();
    const searchTokensEn = [mapNameEn, authorsEn, mapCode, prefectures].join(' ').toLowerCase();

    return {
      mapId,
      mapCode,
      mapNameJa,
      mapNameEn,
      authorsJa,
      authorsEn,
      authorsJaList,
      authorsEnList,
      publishedYear: props.published_year ?? null,
      publisherJa: props.publisher_ja || props.publisher_en || '',
      publisherEn: props.publisher_en || props.publisher_ja || '',
      prefectures,
      bounds: rawBounds,
      zoomMin,
      zoomMax,
      overlayType: canUseXyz ? 'xyz' : (canUseWms ? 'wms' : null),
      overlayUrl: canUseXyz ? xyzUrl : (canUseWms ? wmsUrl : ''),
      attribution,
      legendImageUrl: isSafeUrl(props.legend_image_url) ? props.legend_image_url : '',
      originalImageUrl: isSafeUrl(props.original_image_url) ? props.original_image_url : '',
      detailUrl,
      pdfUrl: isSafeUrl(rawPdfUrl) ? rawPdfUrl : '',
      searchTokensJa,
      searchTokensEn
    };
  }

  /**
   * 現在の言語に対応するUI辞書を返す
   */
  function t() {
    return I18N[state.lang] || I18N.ja;
  }

  /**
   * 現在の言語に応じた図幅タイトル・著者・発行者・検索トークンを返す
   * @param {Object} meta - normalizeProperties() の返却オブジェクト
   */
  function getLocalizedMeta(meta) {
    const isEn = state.lang === 'en';
    const title = isEn ? meta.mapNameEn : meta.mapNameJa;
    const subtitle = isEn
      ? (meta.mapNameJa !== meta.mapNameEn ? meta.mapNameJa : '')
      : (meta.mapNameEn !== meta.mapNameJa ? meta.mapNameEn : '');
    const authors = isEn
      ? (meta.authorsEn || meta.authorsJa || t().unknownAuthor)
      : (meta.authorsJa || meta.authorsEn || t().unknownAuthor);
    const authorList = isEn
      ? (meta.authorsEnList.length > 0 ? meta.authorsEnList : meta.authorsJaList)
      : (meta.authorsJaList.length > 0 ? meta.authorsJaList : meta.authorsEnList);
    const publisher = isEn ? meta.publisherEn : meta.publisherJa;
    const searchTokens = isEn ? meta.searchTokensEn : meta.searchTokensJa;

    return { title, subtitle, authors, authorList, publisher, searchTokens };
  }

  /**
   * ステータスメッセージ（エラー等）を表示または非表示にする
   * @param {string} message - 表示するメッセージ（空文字で非表示）
   */
  function setStatusMessage(message) {
    if (!message) {
      dom.statusMessage.textContent = '';
      dom.statusMessage.hidden = true;
      return;
    }
    dom.statusMessage.textContent = message;
    dom.statusMessage.hidden = false;
  }

  /**
   * 表示中の図幅件数バッジを更新する
   * @param {number} visibleCount - 現在の表示件数
   * @param {number} totalCount - 全図幅件数
   */
  function updateResultCount(visibleCount, totalCount) {
    dom.resultCount.textContent = t().resultCount(visibleCount, totalCount);
  }

  /**
   * ベースマップ（背景地図）を切り替える
   * @param {'pale'|'std'|'photo'} key - CONFIG.BASEMAPS のキー
   */
  function switchBasemap(key) {
    const basemap = CONFIG.BASEMAPS[key];
    if (!basemap || !state.map) {
      return;
    }

    if (state.activeBaseLayer) {
      state.map.removeLayer(state.activeBaseLayer);
    }

    state.activeBaseLayer = L.tileLayer(basemap.url, {
      attribution: basemap.attribution,
      maxZoom: basemap.maxZoom
    }).addTo(state.map);

    state.activeBaseLayer.bringToBack();

    dom.basemapButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.basemap === key);
    });
  }

  /**
   * 表示中の全図幅が画面内に収まるようにズーム・パンする
   */
  function fitAllVisibleItems() {
    if (!state.map) {
      return;
    }
    const targetItems = state.filteredItems.length > 0 ? state.filteredItems : state.allItems;
    const combinedBounds = L.latLngBounds([]);

    targetItems.forEach((item) => {
      const bounds = getItemBounds(item);
      if (bounds && bounds.isValid()) {
        combinedBounds.extend(bounds);
      }
    });

    if (combinedBounds.isValid()) {
      state.map.fitBounds(combinedBounds, { padding: [48, 48], maxZoom: 11 });
    }
  }

  /**
   * Leafletマップと地理院淡色地図ベースレイヤーを初期化する
   * @returns {L.Map} 初期化されたLeafletマップインスタンス
   */
  function initMap() {
    const map = L.map('map', {
      center: CONFIG.INITIAL_CENTER,
      zoom: CONFIG.INITIAL_ZOOM,
      minZoom: CONFIG.MIN_ZOOM,
      maxZoom: CONFIG.MAX_ZOOM,
      zoomControl: false
    });

    state.map = map;

    // 地理院地図（淡色地図）を初期ベースマップとして追加
    switchBasemap('pale');

    // ズームコントロールを画面右下に配置
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // メートル法のスケールバーを画面左下に配置
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // 図郭ポリゴン管理用のレイヤーグループを追加
    state.indexLayerGroup = L.layerGroup().addTo(map);

    // 地図移動・ズーム完了時に現在表示中の地質図のうち最も広いものの凡例を更新
    map.on('moveend', updateDominantLegend);

    return map;
  }

  /**
   * GeoJSONファイルを非同期で読み込む
   * @param {string} url - GeoJSONファイルのURL
   * @returns {Promise<Object>} GeoJSONオブジェクト
   */
  async function fetchMapIndex(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`図幅インデックスの読み込みに失敗しました (HTTP ${response.status})`);
    }
    return response.json();
  }

  /**
   * ホバーツールチップ用のテキストを生成する
   * @param {Object} meta - normalizeProperties() の返却オブジェクト
   * @returns {string} ツールチップ文字列
   */
  function buildTooltipText(meta) {
    const loc = getLocalizedMeta(meta);
    const yearSuffix = meta.publishedYear != null ? ` (${meta.publishedYear})` : '';
    return `${loc.title}${yearSuffix}`;
  }

  /**
   * 図幅アイテムの LatLngBounds を取得する
   * @param {Object} item - { layer, meta } オブジェクト
   * @returns {L.LatLngBounds|null} 境界オブジェクト
   */
  function getItemBounds(item) {
    if (!item) {
      return null;
    }
    if (item.meta.bounds) {
      const [west, south, east, north] = item.meta.bounds;
      return L.latLngBounds([[south, west], [north, east]]);
    }
    if (item.layer && typeof item.layer.getBounds === 'function') {
      return item.layer.getBounds();
    }
    return null;
  }

  /**
   * 2つの LatLngBounds の交差面積（緯度経度矩形の積）を計算する
   * @param {L.LatLngBounds} boundsA
   * @param {L.LatLngBounds} boundsB
   * @returns {number} 交差面積（交差しない場合は 0）
   */
  function computeIntersectionArea(boundsA, boundsB) {
    if (!boundsA || !boundsB || !boundsA.isValid() || !boundsB.isValid()) {
      return 0;
    }
    const west = Math.max(boundsA.getWest(), boundsB.getWest());
    const east = Math.min(boundsA.getEast(), boundsB.getEast());
    const south = Math.max(boundsA.getSouth(), boundsB.getSouth());
    const north = Math.min(boundsA.getNorth(), boundsB.getNorth());

    if (east <= west || north <= south) {
      return 0;
    }
    return (east - west) * (north - south);
  }

  /**
   * 右サイドバー（最広表示図幅の詳細情報 & 地質凡例）の表示内容を更新する
   * @param {Object|null} item - 表示対象の図幅アイテム（nullで非表示）
   */
  function renderLegendPanel(item, forceUpdate = false) {
    const wasHidden = dom.legendSidebar.hidden;
    const dict = t();

    if (!item) {
      state.dominantLegendItem = null;
      dom.legendSidebar.hidden = true;
      dom.dominantInfoTitle.textContent = '';
      dom.dominantInfoSubtitle.textContent = '';
      dom.dominantInfoSubtitle.hidden = true;
      dom.dominantInfoMeta.innerHTML = '';
      dom.dominantInfoLinks.innerHTML = '';
      dom.legendMapName.textContent = '';
      dom.legendImage.removeAttribute('src');
      dom.legendOpenLink.href = '#';
      if (!wasHidden && state.map) {
        state.map.invalidateSize();
      }
      return;
    }

    if (!forceUpdate && state.dominantLegendItem === item && !dom.legendSidebar.hidden) {
      return;
    }

    const { meta } = item;
    const loc = getLocalizedMeta(meta);
    state.dominantLegendItem = item;

    // 上段：詳細情報
    dom.dominantInfoTitle.textContent = loc.title;
    if (loc.subtitle) {
      dom.dominantInfoSubtitle.textContent = loc.subtitle;
      dom.dominantInfoSubtitle.hidden = false;
    } else {
      dom.dominantInfoSubtitle.textContent = '';
      dom.dominantInfoSubtitle.hidden = true;
    }

    dom.dominantInfoMeta.innerHTML = '';
    const yearValue = meta.publishedYear != null
      ? `${meta.publishedYear}${dict.yearSuffix}`
      : dict.yearUnknown;
    const metaEntries = [
      [dict.yearLabel, yearValue],
      [dict.authorsLabel, loc.authors]
    ];
    if (loc.publisher) {
      metaEntries.push([dict.publisherLabel, loc.publisher]);
    }
    if (meta.prefectures) {
      metaEntries.push([dict.regionLabel, meta.prefectures]);
    }

    metaEntries.forEach(([label, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      dom.dominantInfoMeta.append(dt, dd);
    });

    dom.dominantInfoLinks.innerHTML = '';
    const linkDefs = [
      [dict.linkDetail, meta.detailUrl],
      [dict.linkPdf, meta.pdfUrl],
      [dict.linkOriginal, meta.originalImageUrl]
    ];
    linkDefs.forEach(([label, url]) => {
      if (!url) {
        return;
      }
      const a = document.createElement('a');
      a.className = 'dominant-info-link';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = label;
      dom.dominantInfoLinks.appendChild(a);
    });

    // 下段：凡例画像
    if (meta.legendImageUrl) {
      dom.legendMapName.textContent = loc.title;
      dom.legendImage.src = meta.legendImageUrl;
      dom.legendImage.alt = `${loc.title} ${dict.legendTitle}`;
      dom.legendImage.hidden = false;
      dom.legendOpenLink.href = meta.legendImageUrl;
      dom.legendOpenLink.hidden = false;
    } else {
      dom.legendMapName.textContent = dict.legendNone;
      dom.legendImage.removeAttribute('src');
      dom.legendImage.hidden = true;
      dom.legendOpenLink.href = '#';
      dom.legendOpenLink.hidden = true;
    }

    dom.legendSidebar.hidden = false;

    if (wasHidden && state.map) {
      state.map.invalidateSize();
    }
  }

  /**
   * 現在オーバーレイ表示されている地質図の中で最も広く表示されているものを特定し、右サイドバーを更新する
   */
  function updateDominantLegend() {
    if (!state.map || state.activeOverlays.length === 0) {
      renderLegendPanel(null);
      return;
    }

    const viewBounds = state.map.getBounds();
    let bestItem = null;
    let maxArea = 0;

    state.activeOverlays.forEach(({ item }) => {
      const itemBounds = getItemBounds(item);
      const area = computeIntersectionArea(viewBounds, itemBounds);
      if (area > maxArea) {
        maxArea = area;
        bestItem = item;
      }
    });

    renderLegendPanel(bestItem || state.activeOverlays[state.activeOverlays.length - 1].item);
  }

  /**
   * 指定した図幅アイテムが現在オーバーレイ表示中か判定する
   * @param {Object} item - 図幅アイテム
   * @returns {boolean} 表示中ならtrue
   */
  function isItemOverlayed(item) {
    return state.activeOverlays.some((entry) => entry.item === item);
  }

  /**
   * 左サイドバーの「表示中の地質図（最大4件）」リストを描画する
   */
  function renderActiveOverlayList() {
    dom.activeOverlayList.innerHTML = '';
    const dict = t();

    if (state.activeOverlays.length === 0) {
      dom.activeWmsBar.hidden = true;
      dom.activeWmsName.textContent = '';
      return;
    }

    dom.activeWmsBar.hidden = false;
    dom.activeWmsName.textContent = dict.activeMapsTitle(state.activeOverlays.length, CONFIG.MAX_OVERLAYS);

    const fragment = document.createDocumentFragment();

    state.activeOverlays.forEach(({ item }) => {
      const { meta } = item;
      const loc = getLocalizedMeta(meta);
      const li = document.createElement('li');
      li.className = 'active-overlay-item';

      const topRow = document.createElement('div');
      topRow.className = 'active-overlay-top';

      const label = document.createElement('span');
      label.className = 'active-overlay-label';
      label.textContent = loc.title;
      label.title = loc.title;
      label.addEventListener('click', () => zoomToMapItem(item));

      const btns = document.createElement('div');
      btns.className = 'active-overlay-btns';

      const zoomBtn = document.createElement('button');
      zoomBtn.type = 'button';
      zoomBtn.className = 'icon-button';
      zoomBtn.title = 'Zoom';
      zoomBtn.setAttribute('aria-label', `${loc.title} zoom`);
      zoomBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
      zoomBtn.addEventListener('click', () => zoomToMapItem(item));

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'icon-button';
      removeBtn.title = 'Close';
      removeBtn.setAttribute('aria-label', `${loc.title} close`);
      removeBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      removeBtn.addEventListener('click', () => removeOverlayByItem(item));

      btns.append(zoomBtn, removeBtn);
      topRow.append(label, btns);

      const metaRow = document.createElement('div');
      metaRow.className = 'active-overlay-meta';
      const yearText = meta.publishedYear != null ? `${meta.publishedYear}${dict.yearSuffix}` : dict.yearUnknown;
      const infoSpan = document.createElement('span');
      infoSpan.textContent = `${yearText} / ${loc.authors}`;
      metaRow.appendChild(infoSpan);

      if (meta.detailUrl) {
        const detailLink = document.createElement('a');
        detailLink.className = 'active-overlay-link';
        detailLink.href = meta.detailUrl;
        detailLink.target = '_blank';
        detailLink.rel = 'noopener noreferrer';
        detailLink.textContent = dict.linkDetail;
        metaRow.appendChild(detailLink);
      }

      if (meta.pdfUrl) {
        const pdfLink = document.createElement('a');
        pdfLink.className = 'active-overlay-link';
        pdfLink.href = meta.pdfUrl;
        pdfLink.target = '_blank';
        pdfLink.rel = 'noopener noreferrer';
        pdfLink.textContent = dict.linkPdf;
        metaRow.appendChild(pdfLink);
      }

      li.append(topRow, metaRow);
      fragment.appendChild(li);
    });

    dom.activeOverlayList.appendChild(fragment);
  }

  /**
   * 指定された図幅のオーバーレイを解除する
   * @param {Object} item - 解除対象の図幅アイテム
   */
  function removeOverlayByItem(item) {
    const idx = state.activeOverlays.findIndex((entry) => entry.item === item);
    if (idx === -1) {
      return;
    }

    const [removed] = state.activeOverlays.splice(idx, 1);
    if (state.map && removed.layer) {
      state.map.removeLayer(removed.layer);
    }
    if (removed.item.layer) {
      removed.item.layer.setStyle(CONFIG.POLYGON_STYLE.default);
    }

    renderActiveOverlayList();
    syncSelectedListItem();
    updateDominantLegend();
  }

  /**
   * 選択中のすべての地質図オーバーレイおよびポリゴン強調を解除する
   */
  function clearAllOverlays() {
    state.activeOverlays.forEach(({ item, layer }) => {
      if (state.map && layer) {
        state.map.removeLayer(layer);
      }
      if (item.layer) {
        item.layer.setStyle(CONFIG.POLYGON_STYLE.default);
      }
    });
    state.activeOverlays = [];
    dom.wmsStatusDot.classList.remove('is-loading');
    renderActiveOverlayList();
    syncSelectedListItem();
    updateDominantLegend();
  }

  /**
   * XYZタイル（優先）またはWMSで地質図オーバーレイレイヤーを追加する（最大4図幅まで保持）
   * @param {Object} item - { layer, meta } オブジェクト
   */
  function addOverlayForItem(item) {
    const { meta } = item;

    // すでに表示中の場合は最前面へ移動して終了
    const existing = state.activeOverlays.find((entry) => entry.item === item);
    if (existing) {
      if (typeof existing.layer.bringToFront === 'function') {
        existing.layer.bringToFront();
      }
      updateDominantLegend();
      return;
    }

    if (!meta.overlayType || !meta.overlayUrl) {
      setStatusMessage(`「${meta.mapNameJa}」には利用可能なタイルURLまたはWMS URLがありません。`);
      return;
    }

    setStatusMessage('');

    // 最大4図幅に達している場合、最も古いオーバーレイを1つ外す
    if (state.activeOverlays.length >= CONFIG.MAX_OVERLAYS) {
      removeOverlayByItem(state.activeOverlays[0].item);
    }

    const layerBounds = getItemBounds(item);
    const commonOptions = {
      opacity: state.overlayOpacity,
      attribution: meta.attribution,
      ...(layerBounds && layerBounds.isValid() ? { bounds: layerBounds } : {})
    };

    const overlayLayer = meta.overlayType === 'xyz'
      ? L.tileLayer(meta.overlayUrl, {
          ...commonOptions,
          minZoom: CONFIG.MIN_ZOOM,
          maxNativeZoom: meta.zoomMax,
          maxZoom: CONFIG.MAX_ZOOM
        })
      : L.tileLayer.wms(meta.overlayUrl, {
          ...CONFIG.WMS_OPTIONS,
          ...commonOptions,
          maxZoom: CONFIG.MAX_ZOOM
        });

    let loadedTileCount = 0;
    let errorTileCount = 0;

    overlayLayer.on('loading', () => {
      loadedTileCount = 0;
      errorTileCount = 0;
      dom.wmsStatusDot.classList.add('is-loading');
    });

    overlayLayer.on('tileload', () => {
      loadedTileCount += 1;
    });

    overlayLayer.on('tileerror', () => {
      errorTileCount += 1;
    });

    overlayLayer.on('load', () => {
      dom.wmsStatusDot.classList.remove('is-loading');
      if (loadedTileCount === 0 && errorTileCount > 0) {
        setStatusMessage(`「${meta.mapNameJa}」の地質図タイル取得中にエラーが発生しました。`);
      }
    });

    overlayLayer.addTo(state.map);
    state.activeOverlays.push({ item, layer: overlayLayer });
    item.layer.setStyle(CONFIG.POLYGON_STYLE.selected);

    renderActiveOverlayList();
    syncSelectedListItem();
    updateDominantLegend();
  }

  /**
   * 選択中の図幅の範囲（bounds優先）へマップをズームする
   * @param {Object} item - { layer, meta } オブジェクト
   */
  function zoomToMapItem(item) {
    const bounds = getItemBounds(item);
    if (bounds && bounds.isValid()) {
      state.map.fitBounds(bounds, { padding: [48, 48], maxZoom: item.meta.zoomMax });
    }
  }

  /**
   * リスト上の選択状態クラスを同期する
   */
  function syncSelectedListItem() {
    const buttons = dom.resultList.querySelectorAll('.result-list-item');
    buttons.forEach((btn, idx) => {
      const targetItem = state.filteredItems[idx];
      btn.classList.toggle('is-selected', isItemOverlayed(targetItem));
    });
  }

  /**
   * 絞り込み結果リストを描画する（常時表示）
   */
  function renderResultList() {
    const dict = t();
    dom.resultList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const displayItems = state.filteredItems.slice(0, CONFIG.MAX_LIST_ITEMS);

    displayItems.forEach((item) => {
      const { meta } = item;
      const loc = getLocalizedMeta(meta);
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'result-list-item';
      if (isItemOverlayed(item)) {
        button.classList.add('is-selected');
      }

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
      button.addEventListener('click', () => {
        zoomToMapItem(item);
        addOverlayForItem(item);
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
   * データ内の最小発行年から現在年（例: 2026年→2020年代、2030年→2030年代）まで
   * 10年ごとの年代マルチセレクトチップを自動生成する
   */
  function renderDecadeChips() {
    const dict = t();
    const years = state.allItems
      .map(({ meta }) => Number(meta.publishedYear))
      .filter((year) => !Number.isNaN(year) && year > 0);

    const currentDecade = Math.floor(new Date().getFullYear() / 10) * 10;
    const minDecade = years.length > 0
      ? Math.floor(Math.min(...years) / 10) * 10
      : currentDecade;
    const maxDataDecade = years.length > 0
      ? Math.floor(Math.max(...years) / 10) * 10
      : currentDecade;
    const maxDecade = Math.max(maxDataDecade, currentDecade);

    const sortedDecades = [];
    for (let decade = minDecade; decade <= maxDecade; decade += 10) {
      sortedDecades.push(decade);
    }

    dom.decadeChips.innerHTML = '';

    const fragment = document.createDocumentFragment();
    sortedDecades.forEach((decade) => {
      const isSelected = state.selectedDecades.has(decade);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
      btn.textContent = `${decade}${dict.decadeUnit}`;
      btn.dataset.decade = String(decade);
      btn.setAttribute('aria-pressed', String(isSelected));

      btn.addEventListener('click', () => {
        if (state.selectedDecades.has(decade)) {
          state.selectedDecades.delete(decade);
          btn.classList.remove('is-selected');
          btn.setAttribute('aria-pressed', 'false');
        } else {
          state.selectedDecades.add(decade);
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
        }
        applyFilters();
      });

      fragment.appendChild(btn);
    });

    dom.decadeChips.appendChild(fragment);
  }

  /**
   * GeoJSONデータからポリゴンレイヤー群を生成してマップに描画する
   * @param {Object} geojsonData - GeoJSON FeatureCollection
   */
  function renderGeoJsonFeatures(geojsonData) {
    const geoJsonLayer = L.geoJSON(geojsonData, {
      style: () => CONFIG.POLYGON_STYLE.default,
      onEachFeature: (feature, layer) => {
        const meta = normalizeProperties(feature.properties);
        const item = { layer, meta };

        // ホバー時の図幅名ツールチップ
        layer.bindTooltip(buildTooltipText(meta), {
          sticky: true,
          direction: 'top',
          offset: [0, -6],
          className: 'map-hover-tooltip'
        });

        // ホバー時のハイライト
        layer.on('mouseover', () => {
          if (!isItemOverlayed(item)) {
            layer.setStyle(CONFIG.POLYGON_STYLE.hover);
          }
        });

        layer.on('mouseout', () => {
          if (!isItemOverlayed(item)) {
            layer.setStyle(CONFIG.POLYGON_STYLE.default);
          }
        });

        // クリック時は左サイドバーのオーバーレイ管理へ追加（最大4図幅）
        layer.on('click', () => {
          addOverlayForItem(item);
        });

        state.allItems.push(item);
        state.indexLayerGroup.addLayer(layer);
      }
    });

    state.filteredItems = [...state.allItems];

    // GeoJSONのバウンディングボックスがあれば初期表示領域に合わせる
    const bounds = geoJsonLayer.getBounds();
    if (bounds.isValid()) {
      state.map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11 });
    }

    renderDecadeChips();
    updateResultCount(state.allItems.length, state.allItems.length);
    buildSuggestionPool();
    renderResultList();
    updateDominantLegend();
  }

  /**
   * 図幅名および著者名のサジェスト候補プールを構築する
   */
  function buildSuggestionPool() {
    const dict = t();
    const pool = [];
    const seenKeys = new Set();

    state.allItems.forEach((item) => {
      const { meta } = item;
      const loc = getLocalizedMeta(meta);
      const mapKey = `map:${loc.title}`;
      if (!seenKeys.has(mapKey)) {
        seenKeys.add(mapKey);
        pool.push({
          type: 'map',
          label: loc.title,
          badge: dict.badgeMap,
          searchText: `${loc.title} ${meta.mapCode}`.toLowerCase(),
          item
        });
      }

      loc.authorList.forEach((author) => {
        const authorKey = `author:${author}`;
        if (!seenKeys.has(authorKey)) {
          seenKeys.add(authorKey);
          pool.push({
            type: 'author',
            label: author,
            badge: dict.badgeAuthor,
            searchText: author.toLowerCase(),
            item: null
          });
        }
      });
    });

    state.suggestionPool = pool;
  }

  /**
   * サジェストドロップダウンを閉じる
   */
  function hideSuggestions() {
    dom.searchSuggestions.hidden = true;
    dom.searchInput.setAttribute('aria-expanded', 'false');
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
  }

  /**
   * サジェスト候補を選択した際の処理
   * @param {Object} suggestion - サジェスト候補オブジェクト
   */
  function selectSuggestion(suggestion) {
    if (!suggestion) {
      return;
    }

    dom.searchInput.value = suggestion.label;
    hideSuggestions();
    applyFilters();

    if (suggestion.type === 'map' && suggestion.item) {
      zoomToMapItem(suggestion.item);
      addOverlayForItem(suggestion.item);
    } else {
      fitAllVisibleItems();
    }
  }

  /**
   * 現在の検索入力値に応じたサジェスト候補を描画する
   */
  function renderSuggestions() {
    const query = dom.searchInput.value.trim().toLowerCase();
    const candidates = query
      ? state.suggestionPool.filter((entry) => entry.searchText.includes(query))
      : state.suggestionPool;

    const limited = candidates.slice(0, CONFIG.MAX_SUGGESTIONS);
    state.currentSuggestions = limited;
    state.activeSuggestionIndex = -1;

    if (limited.length === 0) {
      hideSuggestions();
      return;
    }

    dom.searchSuggestions.innerHTML = '';
    const fragment = document.createDocumentFragment();

    limited.forEach((entry, index) => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');

      const textSpan = document.createElement('span');
      textSpan.className = 'suggestion-text';
      textSpan.textContent = entry.label;

      const badgeSpan = document.createElement('span');
      badgeSpan.className = `suggestion-badge ${entry.type === 'map' ? 'is-map' : 'is-author'}`;
      badgeSpan.textContent = entry.badge;

      li.append(textSpan, badgeSpan);
      li.addEventListener('mousedown', (event) => {
        event.preventDefault();
        selectSuggestion(entry);
      });
      li.addEventListener('mousemove', () => {
        state.activeSuggestionIndex = index;
        updateActiveSuggestionHighlight();
      });

      fragment.appendChild(li);
    });

    dom.searchSuggestions.appendChild(fragment);
    dom.searchSuggestions.hidden = false;
    dom.searchInput.setAttribute('aria-expanded', 'true');
  }

  /**
   * サジェストリストのアクティブハイライトを更新する
   */
  function updateActiveSuggestionHighlight() {
    const items = dom.searchSuggestions.querySelectorAll('.suggestion-item');
    items.forEach((el, idx) => {
      const isActive = idx === state.activeSuggestionIndex;
      el.classList.toggle('is-active', isActive);
      el.setAttribute('aria-selected', String(isActive));
      if (isActive) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  /**
   * 検索欄でのキーボード操作（上下移動・Enter確定・Esc閉じ）を処理する
   * @param {KeyboardEvent} event - キーダウンイベント
   */
  function handleSearchKeydown(event) {
    if (dom.searchSuggestions.hidden || state.currentSuggestions.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % state.currentSuggestions.length;
      updateActiveSuggestionHighlight();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      state.activeSuggestionIndex =
        (state.activeSuggestionIndex - 1 + state.currentSuggestions.length) % state.currentSuggestions.length;
      updateActiveSuggestionHighlight();
    } else if (event.key === 'Enter' && state.activeSuggestionIndex >= 0) {
      event.preventDefault();
      selectSuggestion(state.currentSuggestions[state.activeSuggestionIndex]);
    } else if (event.key === 'Escape') {
      event.stopPropagation();
      hideSuggestions();
    }
  }

  /**
   * 検索文字列と選択中の年代チップに基づき、図郭ポリゴンを即時フィルタリングする
   */
  function applyFilters() {
    const query = dom.searchInput.value.trim().toLowerCase();
    const hasDecadeFilter = state.selectedDecades.size > 0;
    const nextFiltered = [];

    state.allItems.forEach((item) => {
      const { layer, meta } = item;
      const year = Number(meta.publishedYear);
      const decade = (meta.publishedYear !== null && !Number.isNaN(year))
        ? Math.floor(year / 10) * 10
        : null;

      const matchesText = !query || getLocalizedMeta(meta).searchTokens.includes(query);
      const matchesDecade = !hasDecadeFilter || (decade !== null && state.selectedDecades.has(decade));

      const isVisible = matchesText && matchesDecade;

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
    updateResultCount(nextFiltered.length, state.allItems.length);
    renderResultList();
  }

  /**
   * フィルタ条件をすべてリセットして再描画する
   */
  function resetFilters() {
    dom.searchInput.value = '';
    state.selectedDecades.clear();
    dom.decadeChips.querySelectorAll('.decade-chip').forEach((chip) => {
      chip.classList.remove('is-selected');
      chip.setAttribute('aria-pressed', 'false');
    });
    applyFilters();
  }

  /**
   * オーバーレイレイヤーの不透明度を更新する
   */
  function handleOpacityChange() {
    const percent = Number(dom.wmsOpacitySlider.value);
    state.overlayOpacity = percent / 100;
    dom.wmsOpacityValue.textContent = `${percent}%`;

    state.activeOverlays.forEach(({ layer }) => {
      if (layer && typeof layer.setOpacity === 'function') {
        layer.setOpacity(state.overlayOpacity);
      }
    });
  }

  /**
   * キーボードショートカットを処理する（`/` または `Ctrl+K` で検索フォーカス）
   * @param {KeyboardEvent} event - キーダウンイベント
   */
  function handleGlobalKeydown(event) {
    const isInputFocused = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

    if ((event.key === '/' && !isInputFocused) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      dom.searchInput.focus();
      dom.searchInput.select();
      return;
    }

    if (event.key === 'Escape' && isInputFocused) {
      document.activeElement.blur();
      hideSuggestions();
    }
  }

  /**
   * 表示言語（日本語 / 英語）を切り替え、UI・検索・サジェスト・ツールチップを再描画する
   * @param {'ja'|'en'} lang - 言語コード
   */
  function switchLanguage(lang) {
    if (!I18N[lang] || state.lang === lang) {
      return;
    }

    state.lang = lang;
    document.documentElement.lang = lang;
    const dict = t();

    dom.langButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    dom.appTitle.textContent = dict.appTitle;
    dom.searchInput.placeholder = dict.searchPlaceholder;
    dom.searchInput.setAttribute('aria-label', dict.searchPlaceholder);
    dom.decadeLabel.textContent = dict.decadeLabel;
    dom.resetFiltersBtn.textContent = dict.reset;
    dom.basemapLabel.textContent = dict.basemapLabel;
    dom.clearWmsBtn.textContent = dict.clearAll;
    dom.opacityLabel.textContent = dict.opacity;
    dom.resultListLabel.textContent = dict.resultListLabel;
    dom.dominantInfoEyebrow.textContent = dict.eyebrow;
    dom.legendPanelTitle.textContent = dict.legendTitle;
    dom.legendOpenLink.textContent = dict.legendOpen;

    const basemapLabelMap = {
      pale: dict.basemapPale,
      std: dict.basemapStd,
      photo: dict.basemapPhoto
    };
    dom.basemapButtons.forEach((btn) => {
      const key = btn.dataset.basemap;
      if (basemapLabelMap[key]) {
        btn.textContent = basemapLabelMap[key];
      }
    });

    // ホバーツールチップの言語を更新
    state.allItems.forEach(({ layer, meta }) => {
      if (typeof layer.setTooltipContent === 'function') {
        layer.setTooltipContent(buildTooltipText(meta));
      }
    });

    hideSuggestions();
    renderDecadeChips();
    buildSuggestionPool();
    applyFilters();
    renderActiveOverlayList();
    if (state.dominantLegendItem) {
      renderLegendPanel(state.dominantLegendItem, true);
    }
  }

  /**
   * UIおよびキーボードイベントリスナーを登録する
   */
  function initEventListeners() {
    dom.searchInput.addEventListener('input', () => {
      applyFilters();
      renderSuggestions();
    });
    dom.searchInput.addEventListener('focus', renderSuggestions);
    dom.searchInput.addEventListener('blur', hideSuggestions);
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);

    dom.resetFiltersBtn.addEventListener('click', () => {
      hideSuggestions();
      resetFilters();
    });
    dom.fitAllBtn.addEventListener('click', fitAllVisibleItems);
    dom.clearWmsBtn.addEventListener('click', clearAllOverlays);
    dom.wmsOpacitySlider.addEventListener('input', handleOpacityChange);

    dom.basemapButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchBasemap(btn.dataset.basemap));
    });

    dom.langButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    document.addEventListener('keydown', handleGlobalKeydown);
  }

  /**
   * アプリケーションのエントリポイント
   */
  async function init() {
    state.map = initMap();
    initEventListeners();

    try {
      const geojsonData = await fetchMapIndex(CONFIG.GEOJSON_URL);
      renderGeoJsonFeatures(geojsonData);
    } catch (error) {
      console.error(error);
      dom.resultCount.textContent = '読込エラー';
      setStatusMessage(error.message || 'データの読み込み中にエラーが発生しました。');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
