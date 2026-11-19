(() => {
  'use strict';

  /**
   * アプリケーション設定定数
   */
  const CONFIG = {
    GEOJSON_URL: 'data/map_index.geojson',
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
    INITIAL_CENTER: [36.2048, 138.2529],
    INITIAL_ZOOM: 5,
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
      viewportOnly: false,
      seamless200k: false,
      seamlessOpacity: 0.65,
      seamlessQueryPriority: false,
      overlayOpacity: 0.85,
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

  /**
   * UIテキスト多言語辞書
   */
  const I18N = {
    ja: {
      searchPlaceholder: '図幅名・火山名・著者・地域で検索',
      mapTypeLabel: '地図種別',
      mapTypeAll: 'すべて',
      mapTypes: {
        geological_map_sheet: '地質図幅',
        seamless_geological_map: 'シームレス地質図',
        volcanic_geological_map: '火山地質図',
        marine_geological_map: '海洋地質図',
        active_fault_strip_map: '活断層図',
        large_pyroclastic_flow_map: '大規模火砕流分布図',
        hydrogeological_map: '水文地質図',
        geophysical_map: '地球物理図',
        geochemical_map: '地球化学図',
        resource_map: '鉱物・エネルギー資源図'
      },
      viewportOnlyLabel: '表示範囲内のみ',
      showIndexLabel: '図郭枠を表示',
      seamless200kLabel: '20万分の1 シームレス地質図 V2',
      seamlessOpacityLabel: 'シームレス透過度',
      seamlessQueryLabel: '地点の地質を調べる',
      seamlessLoading: '地質情報を取得中...',
      seamlessNoData: 'この地点の地質データはありません（海域・範囲外）',
      seamlessFetchError: '地質情報の取得に失敗しました。',
      seamlessGroupLabel: '大区分',
      seamlessAgeLabel: '時代',
      seamlessLithologyLabel: '岩相',
      filterAccordionLabel: '詳細フィルター',
      decadeLabel: '発行年',
      scaleFilterLabel: '縮尺・シリーズ',
      otherFilterLabel: '資料有無',
      flagPdf: '説明書PDFあり',
      flagLegend: '凡例あり',
      flagOriginal: '原図JPGあり',
      reset: 'リセット',
      basemapLabel: '背景地図',
      basemapBlank: '白地図',
      basemapPale: '淡色',
      basemapStd: '標準',
      basemapPhoto: '写真',
      activeMapsTitle: (n, max) => (n > 0 ? `表示中の地質図 (${n}/${max})` : '図幅インスペクタ'),
      clearAll: 'すべて閉じる',
      resultListLabel: '該当図幅一覧',
      resultCount: (v, t) => `${v} / ${t} 件`,
      noMatch: '条件に一致する図幅がありません',
      moreItems: (n) => `ほか ${n} 件（検索で絞り込めます）`,
      badgeMap: '図幅',
      badgeVolcano: '火山',
      badgeAuthor: '著者',
      badgeRegion: '地域',
      suggestionGroupMaps: '図幅・火山',
      suggestionGroupRegions: '地域',
      suggestionGroupAuthors: '著者',
      pinnedLabel: '固定',
      unpinTitle: '固定を解除して自動追従に戻す',
      mapTypeFieldLabel: '種別',
      volcanoLabel: '火山名',
      yearLabel: '発行年',
      yearSuffix: '年',
      yearUnknown: '不明',
      scaleLabel: '縮尺',
      authorsLabel: '著者',
      publisherLabel: '発行',
      providerLabel: '提供機関',
      regionLabel: '地域',
      linkDetail: '詳細情報',
      linkPdf: '説明書を見る',
      linkFullPdf: '詳細版PDF',
      linkOriginal: '原図JPG',
      tabLegend: '凡例',
      tabSections: '断面図',
      tabDetail: '詳細・PDF',
      legendOpen: '拡大',
      legendNone: '凡例画像なし',
      unknownAuthor: '不明',
      moveUpTitle: '前面へ移動',
      moveDownTitle: '背面へ移動',
      zoomTitle: 'この図幅にズーム',
      closeTitle: 'この地質図を閉じる',
      fitAllTitle: '絞り込み中の全図幅にズーム',
      collapseRightTitle: 'パネルを折りたたむ',
      reopenRightLabel: '凡例',
      reopenRightTitle: '凡例・詳細パネルを開く',
      toggleDrawerCollapse: '検索・一覧パネルを閉じる',
      toggleDrawerExpand: '検索・一覧パネルを開く',
      layersBtnTitle: '背景地図・レイヤー',
      prefsBtnTitle: '環境設定',
      prefsThemeLabel: 'テーマ',
      prefsThemeLight: 'ライト',
      prefsThemeDark: 'ダーク',
      prefsLangLabel: '表示言語',
      prefsResetLabel: '初期設定に戻す',
      mobileTabMap: '地図',
      mobileTabSearch: '検索・一覧',
      mobileTabLegend: '凡例・詳細',
      loadErrorCount: '読込エラー',
      loadErrorMessage: '図幅データの読み込みに失敗しました。',
      tileErrorMessage: (name) => `「${name}」の地質図タイルを取得できませんでした。`,
      seamlessMissingMessage: '20万分の1シームレス地質図の設定が読み込まれていません。'
    },
    en: {
      searchPlaceholder: 'Search map, volcano, author, or region',
      mapTypeLabel: 'Map Type',
      mapTypeAll: 'All',
      mapTypes: {
        geological_map_sheet: 'Geological Map Sheet',
        seamless_geological_map: 'Seamless Geological Map',
        volcanic_geological_map: 'Volcanic Geological Map',
        marine_geological_map: 'Marine Geological Map',
        active_fault_strip_map: 'Active Fault Map',
        large_pyroclastic_flow_map: 'Pyroclastic Flow Map',
        hydrogeological_map: 'Hydrogeological Map',
        geophysical_map: 'Geophysical Map',
        geochemical_map: 'Geochemical Map',
        resource_map: 'Resource Map'
      },
      viewportOnlyLabel: 'In map view only',
      showIndexLabel: 'Show map frames',
      seamless200kLabel: '1:200K Seamless GeoMap V2',
      seamlessOpacityLabel: 'Seamless opacity',
      seamlessQueryLabel: 'Inspect point geology',
      seamlessLoading: 'Loading geology...',
      seamlessNoData: 'No geological data at this point',
      seamlessFetchError: 'Failed to fetch point geology.',
      seamlessGroupLabel: 'Group',
      seamlessAgeLabel: 'Age',
      seamlessLithologyLabel: 'Lithology',
      filterAccordionLabel: 'Filters',
      decadeLabel: 'Published Year',
      scaleFilterLabel: 'Scale / Series',
      otherFilterLabel: 'Resources',
      flagPdf: 'Has PDF',
      flagLegend: 'Has Legend',
      flagOriginal: 'Has Original JPG',
      reset: 'Reset',
      basemapLabel: 'Basemap',
      basemapBlank: 'Blank',
      basemapPale: 'Pale',
      basemapStd: 'Std',
      basemapPhoto: 'Photo',
      activeMapsTitle: (n, max) => (n > 0 ? `Active Maps (${n}/${max})` : 'Map Inspector'),
      clearAll: 'Clear all',
      resultListLabel: 'Matching Maps',
      resultCount: (v, t) => `${v} / ${t} maps`,
      noMatch: 'No matching maps found',
      moreItems: (n) => `${n} more (refine search)`,
      badgeMap: 'Map',
      badgeVolcano: 'Volcano',
      badgeAuthor: 'Author',
      badgeRegion: 'Region',
      suggestionGroupMaps: 'Maps & Volcanoes',
      suggestionGroupRegions: 'Regions',
      suggestionGroupAuthors: 'Authors',
      pinnedLabel: 'Pin',
      unpinTitle: 'Unpin (resume auto-follow)',
      mapTypeFieldLabel: 'Type',
      volcanoLabel: 'Volcano',
      yearLabel: 'Year',
      yearSuffix: '',
      yearUnknown: 'Unknown',
      scaleLabel: 'Scale',
      authorsLabel: 'Authors',
      publisherLabel: 'Publisher',
      providerLabel: 'Provider',
      regionLabel: 'Region',
      linkDetail: 'Details',
      linkPdf: 'View Manual',
      linkFullPdf: 'Full PDF',
      linkOriginal: 'Original JPG',
      tabLegend: 'Legend',
      tabSections: 'Sections',
      tabDetail: 'Details & PDF',
      legendOpen: 'Open',
      legendNone: 'No legend image',
      unknownAuthor: 'Unknown',
      moveUpTitle: 'Bring forward',
      moveDownTitle: 'Send backward',
      zoomTitle: 'Zoom to map',
      closeTitle: 'Close overlay',
      fitAllTitle: 'Fit all matching maps',
      collapseRightTitle: 'Collapse panel',
      reopenRightLabel: 'Legend',
      reopenRightTitle: 'Open legend & details panel',
      toggleDrawerCollapse: 'Collapse search panel',
      toggleDrawerExpand: 'Expand search panel',
      layersBtnTitle: 'Basemap & Layers',
      prefsBtnTitle: 'Preferences',
      prefsThemeLabel: 'Theme',
      prefsThemeLight: 'Light',
      prefsThemeDark: 'Dark',
      prefsLangLabel: 'Language',
      prefsResetLabel: 'Reset to defaults',
      mobileTabMap: 'Map',
      mobileTabSearch: 'Search',
      mobileTabLegend: 'Legend',
      loadErrorCount: 'Load Error',
      loadErrorMessage: 'Failed to load geological map index data.',
      tileErrorMessage: (name) => `Failed to load geological map tiles for "${name}".`,
      seamlessMissingMessage: '1:200K Seamless WMS configuration is not loaded.'
    }
  };

  /**
   * 地域・提供機関の英語表記マッピング
   */
  const REGION_EN_MAP = {
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

  const PROVIDER_EN_MAP = {
    '産業技術総合研究所 地質調査総合センター': 'Geological Survey of Japan, AIST',
    '北海道立総合研究機構 エネルギー・環境・地質研究所': 'Geological Survey of Hokkaido, HRO'
  };

  /**
   * アプリケーション状態
   */
  const state = {
    lang: 'ja',
    theme: 'light',
    map: null,
    activeBaseLayer: null,
    activeBasemapKey: 'blank',
    indexLayerGroup: null,
    allItems: [],
    filteredItems: [],
    yearRange: {
      minBound: 1950,
      maxBound: 2026,
      dataMaxYear: 2026,
      currentMin: 1950,
      currentMax: 2026
    },
    selectedMapType: 'all',
    selectedScales: new Set(),
    selectedResourceFlags: new Set(),
    viewportOnly: false,
    showIndexFrames: true,
    isLeftDrawerCollapsed: true,
    isRightInspectorCollapsed: false,
    hoveredListItem: null,
    activeOverlays: [],
    selectedItem: null,
    inspectedItem: null,
    pinnedInspectItem: null,
    seamlessLayer: null,
    seamlessMeta: null,
    seamlessVirtualItem: null,
    seamlessOpacity: CONFIG.DEFAULT_SEAMLESS_OPACITY,
    seamlessQueryPriority: false,
    seamlessPointMarker: null,
    seamlessPopup: null,
    seamlessAbortController: null,
    seamlessPointCache: new Map(),
    lastSeamlessPoint: null,
    loadingLayerCount: 0,
    suggestionPool: [],
    currentSuggestions: [],
    activeSuggestionIndex: -1,
    inspectorTab: 'legend',
    activeSectionIndex: 0,
    overlayOpacity: CONFIG.DEFAULT_OVERLAY_OPACITY,
    settings: { ...CONFIG.DEFAULT_SETTINGS }
  };

  /**
   * DOM要素のキャッシュ
   */
  const dom = {
    appLayout: document.querySelector('.app-layout'),
    mapEl: document.getElementById('map'),
    mobileNavButtons: document.querySelectorAll('.mobile-nav-btn[data-mobile-view]'),
    mobileLegendTab: document.getElementById('mobile-legend-tab'),
    leftDrawer: document.getElementById('left-drawer'),
    leftDrawerWrap: document.getElementById('left-drawer-wrap'),
    leftDrawerBody: document.getElementById('left-drawer-body'),
    toggleLeftDrawerBtn: document.getElementById('toggle-left-drawer-btn'),
    drawerFilterDot: document.getElementById('drawer-filter-dot'),
    searchInput: document.getElementById('search-input'),
    searchSuggestions: document.getElementById('search-suggestions'),
    mapTypeLabel: document.getElementById('map-type-label'),
    mapTypeChips: document.getElementById('map-type-chips'),
    viewportOnlyToggle: document.getElementById('viewport-only-toggle'),
    viewportOnlyLabel: document.getElementById('viewport-only-label'),
    toggleFiltersBtn: document.getElementById('toggle-filters-btn'),
    filterAccordionLabel: document.getElementById('filter-accordion-label'),
    activeFilterBadge: document.getElementById('active-filter-badge'),
    filterPanelWrap: document.getElementById('filter-panel-wrap'),
    filterPanelBody: document.getElementById('filter-panel-body'),
    decadeLabel: document.getElementById('decade-label'),
    yearRangeDisplay: document.getElementById('year-range-display'),
    yearRangeTrack: document.getElementById('year-range-track'),
    yearRangeMin: document.getElementById('year-range-min'),
    yearRangeMax: document.getElementById('year-range-max'),
    yearRangeTicks: document.getElementById('year-range-ticks'),
    yearRangeLabels: document.getElementById('year-range-labels'),
    scaleFilterLabel: document.getElementById('scale-filter-label'),
    scaleChips: document.getElementById('scale-chips'),
    otherFilterLabel: document.getElementById('other-filter-label'),
    otherChips: document.getElementById('other-chips'),
    resetFiltersBtn: document.getElementById('reset-filters'),
    statusMessage: document.getElementById('status-message'),
    resultListLabel: document.getElementById('result-list-label'),
    resultCount: document.getElementById('result-count'),
    fitAllBtn: document.getElementById('fit-all-btn'),
    resultList: document.getElementById('result-list'),
    rightInspector: document.getElementById('right-inspector'),
    wmsStatusDot: document.getElementById('wms-status-dot'),
    activeWmsName: document.getElementById('active-wms-name'),
    clearWmsBtn: document.getElementById('clear-wms-btn'),
    collapseRightBtn: document.getElementById('collapse-right-btn'),
    reopenRightBtn: document.getElementById('reopen-right-btn'),
    reopenRightLabel: document.getElementById('reopen-right-label'),
    activeOverlaysSection: document.getElementById('active-overlays-section'),
    activeOverlayList: document.getElementById('active-overlay-list'),
    tabLegendBtn: document.getElementById('tab-legend-btn'),
    tabSectionBtn: document.getElementById('tab-section-btn'),
    tabDetailBtn: document.getElementById('tab-detail-btn'),
    legendOpenLink: document.getElementById('legend-open-link'),
    inspectorVisualPane: document.getElementById('inspector-visual-pane'),
    inspectorDetailPane: document.getElementById('inspector-detail-pane'),
    legendMapName: document.getElementById('legend-map-name'),
    seamlessPointCard: document.getElementById('seamless-point-card'),
    sectionChips: document.getElementById('section-chips'),
    legendZoomWrapper: document.getElementById('legend-zoom-wrapper'),
    legendImage: document.getElementById('legend-image'),
    legendLensIndicator: document.getElementById('legend-lens-indicator'),
    legendLoupe: document.getElementById('legend-loupe'),
    mapBottomRightControls: document.getElementById('map-bottom-right-controls'),
    dominantInfoTitle: document.getElementById('dominant-info-title'),
    dominantInfoSubtitle: document.getElementById('dominant-info-subtitle'),
    dominantInfoMeta: document.getElementById('dominant-info-meta'),
    dominantInfoLinks: document.getElementById('dominant-info-links'),
    layersPopoverBtn: document.getElementById('layers-popover-btn'),
    layersPopover: document.getElementById('layers-popover'),
    basemapLabel: document.getElementById('basemap-label'),
    basemapButtons: document.querySelectorAll('.segmented-btn[data-basemap]'),
    showIndexToggle: document.getElementById('show-index-toggle'),
    showIndexLabel: document.getElementById('show-index-label'),
    seamless200kToggle: document.getElementById('seamless-200k-toggle'),
    seamless200kLabel: document.getElementById('seamless-200k-label'),
    seamlessOpacityRow: document.getElementById('seamless-opacity-row'),
    seamlessOpacityLabel: document.getElementById('seamless-opacity-label'),
    seamlessOpacitySlider: document.getElementById('seamless-opacity'),
    seamlessOpacityValue: document.getElementById('seamless-opacity-value'),
    seamlessQueryRow: document.getElementById('seamless-query-row'),
    seamlessQueryLabel: document.getElementById('seamless-query-label'),
    seamlessQueryToggle: document.getElementById('seamless-query-toggle'),
    prefsPopoverBtn: document.getElementById('prefs-popover-btn'),
    prefsPopover: document.getElementById('prefs-popover'),
    prefsThemeLabel: document.getElementById('prefs-theme-label'),
    themeChoiceButtons: document.querySelectorAll('.segmented-btn[data-theme-choice]'),
    prefsLangLabel: document.getElementById('prefs-lang-label'),
    langButtons: document.querySelectorAll('.segmented-btn[data-lang]'),
    resetSettingsBtn: document.getElementById('reset-settings-btn')
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
   * 共通スキーマ（source/map/display/documents）および従来スキーマの両方を統一フォーマットに正規化する
   * @param {Object} props - Featureのproperties または 共通スキーマレコード
   * @returns {Object} 正規化されたメタデータ
   */
  function normalizeProperties(props = {}) {
    const src = props.source || {};
    const m = props.map || props;
    const disp = props.display || {};
    const docs = props.documents || {};

    const providerId = src.provider_id || 'gsj_50k';
    const providerNameJa = src.provider_name_ja || '';

    const mapNameJa = m.map_name_ja || m.map_name || m.map_name_en || '名称不明';
    const mapNameEn = m.map_name_en || m.map_name_ja || m.map_name || 'Untitled';
    const authorsJaList = Array.isArray(m.authors_ja)
      ? m.authors_ja.map((a) => String(a).trim()).filter(Boolean)
      : (Array.isArray(m.authors)
        ? m.authors.map((a) => String(a).trim()).filter(Boolean)
        : (typeof m.authors === 'string' && m.authors.trim()
          ? m.authors.split(/[・,、]/).map((a) => a.trim()).filter(Boolean)
          : []));
    const authorsEnList = Array.isArray(m.authors_en)
      ? m.authors_en.map((a) => String(a).trim()).filter(Boolean)
      : [];

    const authorsJa = authorsJaList.join('・');
    const authorsEn = authorsEnList.join(', ');

    const prefectures = Array.isArray(m.prefectures) && m.prefectures.length > 0
      ? m.prefectures.join('・')
      : (m.region || '');
    const regionList = Array.isArray(m.prefectures) && m.prefectures.length > 0
      ? m.prefectures.map((r) => String(r).trim()).filter(Boolean)
      : (typeof m.region === 'string' && m.region.trim()
        ? m.region.split(/[・,、]/).map((r) => r.trim()).filter(Boolean)
        : []);

    const tile = props.tile || {};
    const xyzUrl = disp.tile_type === 'xyz'
      ? (disp.tile_url || '')
      : (tile.webp_template || tile.png_template || tile.xyz_template || '');
    const canUseXyz = (disp.tile_type === 'xyz' || props.is_tile_available !== false) && isSafeUrl(xyzUrl);

    const wmsUrl = disp.tile_type === 'wms' ? (disp.wms_url || '') : (props.wms_url || '');
    const wmsLayers = disp.wms_layers || CONFIG.WMS_OPTIONS.layers;
    const canUseWms = !canUseXyz && (disp.tile_type === 'wms' || props.is_wms_available !== false) && isSafeUrl(wmsUrl);

    const rasterImageUrl = [disp.raster_image_url, docs.original_image_url, props.original_image_url].find((u) => isSafeUrl(u)) || '';
    const canUseRaster = !canUseXyz && !canUseWms && disp.tile_type === 'raster' && Boolean(rasterImageUrl);

    const overlayType = canUseXyz ? 'xyz' : (canUseWms ? 'wms' : (canUseRaster ? 'raster' : null));
    const overlayUrl = canUseXyz ? xyzUrl : (canUseWms ? wmsUrl : (canUseRaster ? rasterImageUrl : ''));

    const zoom = m.zoom || {};
    const zoomMin = typeof zoom.min === 'number'
      ? zoom.min
      : (typeof tile.min_zoom === 'number' ? tile.min_zoom : CONFIG.MIN_ZOOM);
    const zoomMax = typeof zoom.max === 'number'
      ? zoom.max
      : (typeof tile.max_zoom === 'number' ? tile.max_zoom : CONFIG.MAX_ZOOM);

    const rawBounds = Array.isArray(m.bounds) && m.bounds.length === 4
      ? m.bounds
      : (Array.isArray(tile.bounds) && tile.bounds.length === 4 ? tile.bounds : null);

    const attribution = src.attribution || props.license?.attribution || CONFIG.GSJ_ATTRIBUTION;
    const downloads = props.downloads || {};
    const downloadEntries = Object.entries(downloads).filter(([, url]) => isSafeUrl(url));
    const lightPdfEntry = downloadEntries.find(([key, url]) =>
      /light|軽量|low/i.test(key) || /_D-L\.pdf(?:$|\?)|_(?:l|light|low)\.pdf(?:$|\?)/i.test(url)
    );
    const normalPdfEntry = downloadEntries.find(([key, url]) =>
      /^pdf$/i.test(key) || (/\.pdf(?:$|\?)/i.test(url) && !/_D-L\.pdf(?:$|\?)|_(?:l|light|low)\.pdf(?:$|\?)/i.test(url))
    );

    const desc = props.description || {};
    const lightPdfUrl = [docs.light_pdf_url, desc.light_pdf_url, lightPdfEntry?.[1], downloads.pdf_light].find((u) => isSafeUrl(u)) || '';
    const fullPdfUrl = [docs.full_pdf_url, desc.full_pdf_url, downloads.pdf, downloads.PDF, normalPdfEntry?.[1]].find((u) => isSafeUrl(u)) || '';
    const preferredPdf = [docs.preferred_pdf, desc.preferred_pdf, lightPdfUrl, fullPdfUrl].find((u) => isSafeUrl(u)) || '';

    const mapCode = m.map_code || m.layer_name || '';
    const scaleDenominator = typeof m.scale_denominator === 'number' ? m.scale_denominator : null;
    const scaleMatch = String(m.series_en || m.series_ja || m.series || mapNameEn || mapNameJa).match(/1\s*:\s*[\d,]+/);
    let scale = m.scale || (scaleDenominator ? `1:${scaleDenominator.toLocaleString('en-US')}` : (scaleMatch ? scaleMatch[0].replace(/\s+/g, '') : ''));
    if (!scale) {
      if (/^G50/i.test(mapCode) || /5万分の1/.test(mapNameJa)) scale = '1:50,000';
      else if (/^G200/i.test(mapCode) || /20万分の1/.test(mapNameJa)) scale = '1:200,000';
      else if (/^G75/i.test(mapCode) || /7\.5万分の1/.test(mapNameJa)) scale = '1:75,000';
      else if (/^G500/i.test(mapCode) || /50万分の1/.test(mapNameJa)) scale = '1:500,000';
      else if (/^G1000/i.test(mapCode) || /100万分の1/.test(mapNameJa)) scale = '1:1,000,000';
      else scale = m.series_ja || m.series_en || m.series || '';
    }
    const mapId = m.map_id ?? null;
    const localId = m.local_id ?? mapId;
    const fallbackMetadataUrl = (localId != null && /^\d+$/.test(String(localId)))
      ? `https://gbank.gsj.jp/ld/resource/publication/map/g050/map${String(localId).padStart(5, '0')}.html`
      : '';
    const detailUrl = [
      props.related_resources?.metadata_url,
      props.metadata_url,
      fallbackMetadataUrl,
      props.related_resources?.publication_uri,
      props.related_resources?.catalog_url
    ].find((url) => isSafeUrl(url)) || '';

    const mapType = m.map_type || 'geological_map_sheet';
    const theme = m.theme || 'geology';
    const geometryModel = m.geometry_model || 'map_sheet';
    const volcanoNameJa = m.volcano_name_ja || '';
    const volcanoNameEn = m.volcano_name_en || '';

    const legendImageUrl = [docs.legend_image_url, props.legend_image_url].find((u) => isSafeUrl(u)) || '';
    const originalImageUrl = [docs.original_image_url, props.original_image_url, disp.raster_image_url].find((u) => isSafeUrl(u)) || '';
    const rawSections = Array.isArray(docs.section_images)
      ? docs.section_images
      : (Array.isArray(props.section_images) ? props.section_images : []);
    const sectionImages = rawSections
      .filter((s) => s && isSafeUrl(s.url))
      .map((s, idx) => ({ label: s.label || `Section ${idx + 1}`, url: s.url }));

    const searchTokensJa = [mapNameJa, volcanoNameJa, authorsJa, mapCode, prefectures, scale, providerNameJa].join(' ').toLowerCase();
    const searchTokensEn = [mapNameEn, volcanoNameEn, authorsEn, mapCode, prefectures, scale, providerNameJa].join(' ').toLowerCase();

    return {
      providerId,
      providerNameJa,
      mapId,
      localId,
      mapCode,
      mapType,
      theme,
      geometryModel,
      volcanoNameJa,
      volcanoNameEn,
      scaleDenominator: scaleDenominator || (scale === '1:50,000' ? 50000 : (scale === '1:200,000' ? 200000 : null)),
      scale,
      mapNameJa,
      mapNameEn,
      authorsJa,
      authorsEn,
      authorsJaList,
      authorsEnList,
      publishedYear: m.published_year ?? null,
      publisherJa: m.publisher_ja || m.publisher || m.publisher_en || '',
      publisherEn: m.publisher_en || m.publisher || m.publisher_ja || '',
      prefectures,
      regionList,
      bounds: rawBounds,
      zoomMin,
      zoomMax,
      overlayType,
      overlayUrl,
      wmsLayers,
      rasterImageUrl,
      defaultOpacity: typeof disp.opacity === 'number' ? disp.opacity : CONFIG.DEFAULT_OVERLAY_OPACITY,
      attribution,
      legendImageUrl,
      originalImageUrl,
      sectionImages,
      detailUrl,
      lightPdfUrl,
      fullPdfUrl,
      preferredPdf,
      pdfUrl: preferredPdf,
      searchTokensJa,
      searchTokensEn
    };
  }

  /**
   * 地図種別と縮尺分母に応じた図郭ポリゴンのデフォルトスタイルを返す
   */
  function styleByScale(scaleDenominator, mapType = 'geological_map_sheet') {
    if (mapType === 'volcanic_geological_map') {
      return { ...CONFIG.POLYGON_STYLE.default, color: '#d93025', fillColor: '#d93025' };
    }
    if (mapType === 'seamless_geological_map' || scaleDenominator === 200000) {
      return { ...CONFIG.POLYGON_STYLE.default, color: '#00796b', fillColor: '#00796b' };
    }
    if (scaleDenominator && scaleDenominator !== 50000) {
      return { ...CONFIG.POLYGON_STYLE.default, color: '#5e35b1', fillColor: '#5e35b1' };
    }
    return CONFIG.POLYGON_STYLE.default;
  }

  /**
   * 現在の言語に対応するUI辞書を返す
   */
  function t() {
    return I18N[state.lang] || I18N.ja;
  }

  /**
   * 検索用の文字列正規化（NFKC正規化・小文字化・カタカナ→ひらがな統一）
   */
  function normalizeSearchText(text) {
    if (!text) {
      return '';
    }
    return String(text)
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }

  /**
   * 縮尺を短縮表記（例: 1/5万 / 英語: 1:50k）へ変換する
   */
  function formatScaleAbbrev(scaleDenominator, scale, isEn = false) {
    let denom = Number(scaleDenominator);
    if (!(denom > 0) && scale && /^1:\d/.test(scale)) {
      denom = Number(scale.replace(/^1:/, '').replace(/,/g, ''));
    }
    if (denom > 0) {
      if (isEn) {
        if (denom >= 1000000 && denom % 1000000 === 0) {
          return `1:${denom / 1000000}M`;
        }
        if (denom >= 1000 && denom % 1000 === 0) {
          return `1:${denom / 1000}k`;
        }
        return `1:${denom.toLocaleString('en-US')}`;
      }
      if (denom % 10000 === 0 || denom === 25000 || denom === 75000) {
        return `1/${denom / 10000}万`;
      }
      return `1:${denom.toLocaleString('en-US')}`;
    }
    return scale || '';
  }

  /**
   * 図幅名から装飾を除いた核となる図名を取り出す
   */
  function extractCoreMapName(rawTitle) {
    if (!rawTitle) {
      return '';
    }
    const bracketMatch = rawTitle.match(/「([^」]+)」/);
    if (bracketMatch && bracketMatch[1]) {
      return bracketMatch[1].trim();
    }
    return rawTitle
      .replace(/^Geological Map of Japan\s+1:[\d,]+,?\s*/i, '')
      .trim();
  }

  /**
   * 図幅名をサジェスト・ホバー用の簡潔な略称形式（例: 1/5万 槍ヶ岳）へ整形する
   */
  function formatShortMapTitle(rawTitle, scaleDenominator, scale, mapType, isEn = false) {
    const core = extractCoreMapName(rawTitle);
    const scaleAbbrev = formatScaleAbbrev(scaleDenominator, scale, isEn);
    if (!core) {
      return rawTitle || '';
    }
    if (mapType === 'geological_map_sheet' || core !== rawTitle) {
      return scaleAbbrev ? `${scaleAbbrev} ${core}` : core;
    }
    return rawTitle;
  }

  /**
   * 現在の言語に応じた図幅タイトル・略称・著者・発行者・検索トークンを返す
   */
  function getLocalizedMeta(meta) {
    const isEn = state.lang === 'en';
    const title = isEn ? meta.mapNameEn : meta.mapNameJa;
    const coreTitle = extractCoreMapName(title);
    const shortTitle = formatShortMapTitle(title, meta.scaleDenominator, meta.scale, meta.mapType, isEn);
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
    const providerName = isEn
      ? (PROVIDER_EN_MAP[meta.providerNameJa]?.trim() || meta.providerNameJa)
      : meta.providerNameJa;
    const regionList = isEn
      ? meta.regionList.map((r) => REGION_EN_MAP[r] || r)
      : meta.regionList;
    const region = isEn
      ? (regionList.length > 0 ? regionList.join(', ') : (REGION_EN_MAP[meta.prefectures] || meta.prefectures))
      : meta.prefectures;
    const searchTokens = normalizeSearchText([
      title,
      shortTitle,
      coreTitle,
      meta.mapNameJa,
      meta.mapNameEn,
      meta.searchTokensJa,
      meta.searchTokensEn,
      meta.publishedYear,
      region,
      providerName
    ].filter(Boolean).join(' '));

    return { title, shortTitle, coreTitle, subtitle, authors, authorList, publisher, providerName, region, regionList, searchTokens };
  }

  /**
   * ステータスメッセージを表示または非表示にする
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
   */
  function updateResultCount(visibleCount, totalCount) {
    dom.resultCount.textContent = t().resultCount(visibleCount, totalCount);
  }

  let settingsSaveTimer = null;

  /**
   * 設定を localStorage へ遅延保存する（スライダードラッグ中のフレーム落ち防止）
   */
  function debouncedSaveSettings() {
    if (settingsSaveTimer) {
      clearTimeout(settingsSaveTimer);
    }
    settingsSaveTimer = setTimeout(() => {
      settingsSaveTimer = null;
      saveSettings();
    }, 200);
  }

  /**
   * 設定を localStorage へ保存する
   */
  function saveSettings() {
    if (settingsSaveTimer) {
      clearTimeout(settingsSaveTimer);
      settingsSaveTimer = null;
    }
    try {
      localStorage.setItem(CONFIG.SETTINGS_STORAGE_KEY, JSON.stringify(state.settings));
    } catch {
      // ignore storage errors
    }
  }

  /**
   * localStorage から設定を読み込む
   */
  function loadSettings() {
    let parsed = null;
    try {
      const raw = localStorage.getItem(CONFIG.SETTINGS_STORAGE_KEY);
      if (raw) {
        parsed = JSON.parse(raw);
      }
    } catch {
      parsed = null;
    }

    const merged = {
      ...CONFIG.DEFAULT_SETTINGS,
      ...(parsed && typeof parsed === 'object' ? parsed : {})
    };
    if (!CONFIG.BASEMAPS[merged.basemap]) {
      merged.basemap = CONFIG.DEFAULT_SETTINGS.basemap;
    }
    const opacity = Number(merged.overlayOpacity);
    merged.overlayOpacity = Number.isFinite(opacity)
      ? Math.min(1, Math.max(0, opacity))
      : CONFIG.DEFAULT_SETTINGS.overlayOpacity;
    const seamlessOpacity = Number(merged.seamlessOpacity);
    merged.seamlessOpacity = Number.isFinite(seamlessOpacity)
      ? Math.min(1, Math.max(0, seamlessOpacity))
      : CONFIG.DEFAULT_SETTINGS.seamlessOpacity;

    state.settings = merged;
    state.showIndexFrames = Boolean(merged.showIndexFrames);
    state.viewportOnly = Boolean(merged.viewportOnly);
    state.overlayOpacity = merged.overlayOpacity;
    state.seamlessOpacity = merged.seamlessOpacity;
    state.seamlessQueryPriority = Boolean(merged.seamlessQueryPriority);
  }

  /**
   * 各種設定コントロールの表示状態を state.settings と同期する
   */
  function syncSettingsUI() {
    const s = state.settings;
    if (dom.showIndexToggle) {
      dom.showIndexToggle.checked = Boolean(state.showIndexFrames);
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
  }

  /**
   * ベースマップ（背景地図）を切り替える
   */
  function switchBasemap(key) {
    const basemap = CONFIG.BASEMAPS[key];
    if (!basemap || !state.map) {
      return;
    }

    state.settings.basemap = key;
    saveSettings();

    if (state.activeBasemapKey === key && state.activeBaseLayer) {
      syncSettingsUI();
      return;
    }

    if (state.activeBaseLayer) {
      state.map.removeLayer(state.activeBaseLayer);
    }

    state.activeBasemapKey = key;
    const layerOptions = {
      attribution: basemap.attribution,
      maxZoom: basemap.maxZoom,
      zIndex: 1,
      updateWhenZooming: false,
      updateWhenIdle: false,
      keepBuffer: 6
    };
    if (basemap.maxNativeZoom) {
      layerOptions.maxNativeZoom = basemap.maxNativeZoom;
    }
    state.activeBaseLayer = L.tileLayer(basemap.url, layerOptions).addTo(state.map);
    syncOverlayZIndices();
    syncSettingsUI();
  }

  /**
   * 開いている左右パネルを考慮した fitBounds 用パディングを返す
   */
  function getMapFitPadding() {
    if (window.innerWidth <= 720) {
      return { paddingTopLeft: [24, 60], paddingBottomRight: [24, 48] };
    }
    const leftWidth = state.isLeftDrawerCollapsed ? 28 : (window.innerWidth <= 960 ? 304 : 344);
    const hasRight = dom.rightInspector.classList.contains('is-open') && !state.isRightInspectorCollapsed;
    const rightWidth = hasRight ? (window.innerWidth <= 960 ? 314 : 364) : 48;
    return {
      paddingTopLeft: [leftWidth, 36],
      paddingBottomRight: [rightWidth, 48]
    };
  }

  /**
   * 指定した図幅配列が画面内に収まるように滑らかにズーム・パンする
   */
  function fitBoundsForItems(items, { animate = true } = {}) {
    if (!state.map || !Array.isArray(items) || items.length === 0) {
      return;
    }
    const combinedBounds = L.latLngBounds([]);

    items.forEach((item) => {
      const bounds = getItemBounds(item);
      if (bounds && bounds.isValid()) {
        combinedBounds.extend(bounds);
      }
    });

    if (combinedBounds.isValid()) {
      state.map.stop();
      const pad = getMapFitPadding();
      if (!animate) {
        state.map.fitBounds(combinedBounds, { ...pad, maxZoom: 12, animate: false });
      } else {
        state.map.flyToBounds(combinedBounds, { ...pad, maxZoom: 12, duration: 0.65, easeLinearity: 0.25 });
      }
    }
  }

  /**
   * 絞り込み中の全図幅が画面内に収まるようにズーム・パンする
   */
  function fitAllVisibleItems(options = {}) {
    fitBoundsForItems(state.filteredItems, options);
  }

  /**
   * Leafletマップを Canvas レンダラー＋60fps+ 連続ズーム設定で初期化する
   */
  function initMap() {
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
      wheelPxPerZoomLevel: 100,
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
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    state.indexLayerGroup = L.layerGroup();
    if (state.showIndexFrames) {
      state.indexLayerGroup.addTo(map);
    }

    map.on('moveend', () => {
      if (state.viewportOnly) {
        applyFilters();
      }
      updateAutoInspectedItem();
    });

    map.on('click', (event) => {
      if (state.seamlessLayer && event && event.latlng) {
        querySeamlessPointGeology(event.latlng);
      }
    });

    map.on('popupclose', (event) => {
      if (event && event.popup === state.seamlessPopup) {
        if (state.seamlessPointMarker && state.map) {
          state.map.removeLayer(state.seamlessPointMarker);
        }
        state.seamlessPointMarker = null;
        state.seamlessPopup = null;
      }
    });

    return map;
  }

  /**
   * GeoJSONファイルを非同期で読み込む
   */
  async function fetchMapIndex(url) {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(t().loadErrorMessage);
    }
    return response.json();
  }

  /**
   * ホバーツールチップ用のテキストを生成する
   */
  function buildTooltipText(meta) {
    const loc = getLocalizedMeta(meta);
    const yearSuffix = meta.publishedYear != null ? ` (${meta.publishedYear})` : '';
    return `${loc.shortTitle}${yearSuffix}`;
  }

  /**
   * 図幅アイテムの LatLngBounds を取得する
   */
  function getItemBounds(item) {
    if (!item) {
      return null;
    }
    if (Array.isArray(item.meta.bounds) && item.meta.bounds.length === 4) {
      const [west, south, east, north] = item.meta.bounds.map(Number);
      if (!Number.isNaN(west) && !Number.isNaN(south) && !Number.isNaN(east) && !Number.isNaN(north) && west < east && south < north) {
        return L.latLngBounds([[south, west], [north, east]]);
      }
    }
    if (item.layer && typeof item.layer.getBounds === 'function') {
      const b = item.layer.getBounds();
      return b && b.isValid() ? b : null;
    }
    return null;
  }

  /**
   * 2つの LatLngBounds の交差面積を計算する
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
   * モバイル表示時のアクティブパネルを切り替える
   */
  function switchMobileView(view) {
    dom.appLayout.dataset.mobileView = view;
    dom.mobileNavButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.mobileView === view);
    });
    if (view === 'map' && state.map) {
      setTimeout(() => state.map.invalidateSize({ animate: false, pan: false }), 50);
    }
  }

  /**
   * 左検索・一覧ドロワーの折りたたみ状態を切り替える
   */
  function setLeftDrawerCollapsed(collapsed) {
    state.isLeftDrawerCollapsed = Boolean(collapsed);
    dom.leftDrawer.classList.toggle('is-collapsed', state.isLeftDrawerCollapsed);
    if (dom.leftDrawerWrap) {
      dom.leftDrawerWrap.inert = state.isLeftDrawerCollapsed;
    }
    dom.toggleLeftDrawerBtn.setAttribute('aria-expanded', String(!state.isLeftDrawerCollapsed));
    const title = state.isLeftDrawerCollapsed ? t().toggleDrawerExpand : t().toggleDrawerCollapse;
    dom.toggleLeftDrawerBtn.title = title;
    dom.toggleLeftDrawerBtn.setAttribute('aria-label', title);
  }

  /**
   * 右インスペクタの折りたたみ状態を切り替える（オーバーレイ自体は維持）
   */
  function setRightInspectorCollapsed(collapsed) {
    state.isRightInspectorCollapsed = Boolean(collapsed);
    if (state.isRightInspectorCollapsed) {
      hideLegendLoupe();
    }
    renderSeamlessPointCard();
    syncRightInspectorVisibility();
  }

  /**
   * 右インスペクタと再展開タブの表示状態を同期する
   */
  function syncRightInspectorVisibility() {
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
    }
  }

  /**
   * ポップオーバー（レイヤー / 環境設定）の開閉を管理する
   */
  function closeAllPopovers() {
    if (dom.layersPopover) {
      dom.layersPopover.classList.remove('is-open');
      dom.layersPopover.inert = true;
      dom.layersPopoverBtn.setAttribute('aria-expanded', 'false');
    }
    if (dom.prefsPopover) {
      dom.prefsPopover.classList.remove('is-open');
      dom.prefsPopover.inert = true;
      dom.prefsPopoverBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function togglePopover(popoverEl, triggerBtn) {
    const willOpen = !popoverEl.classList.contains('is-open');
    closeAllPopovers();
    if (willOpen) {
      popoverEl.classList.add('is-open');
      popoverEl.inert = false;
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
  }

  const loupeCache = {
    legendRect: null,
    inspectorRect: null,
    rafId: 0,
    lastClientX: 0,
    lastClientY: 0,
    activeSrc: ''
  };

  /**
   * 凡例画像と右インスペクタの座標矩形キャッシュを更新する
   */
  function refreshLoupeRects() {
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
  function hideLegendLoupe() {
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

  /**
   * requestAnimationFrame 内で 1フレーム1回だけルーペ位置・背景を更新する
   */
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
  function updateLegendLoupe(event) {
    loupeCache.lastClientX = event.clientX;
    loupeCache.lastClientY = event.clientY;
    if (!loupeCache.rafId) {
      loupeCache.rafId = requestAnimationFrame(renderLoupeFrame);
    }
  }

  /**
   * 右インスペクタのタブ（凡例 / 断面図 / 詳細・PDF）を切り替える
   */
  function switchInspectorTab(tab) {
    hideLegendLoupe();
    state.inspectorTab = tab;
    if (state.inspectedItem) {
      renderInspectorDetail(state.inspectedItem, true);
    }
  }

  /**
   * 表示範囲と交差面積が最大のオーバーレイを自動選択する（手動ピン留め時は画面内にある間維持）
   */
  function updateAutoInspectedItem() {
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

  /**
   * インスペクタ下部の表示（凡例/断面図 または 詳細・PDF）を更新する
   */
  function renderInspectorDetail(item, forceUpdate = false) {
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
      dom.legendOpenLink.href = '#';
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

    const hasSections = meta.sectionImages.length > 0;
    if (state.inspectorTab === 'section' && !hasSections) {
      state.inspectorTab = 'legend';
    }

    // タブ状態
    dom.tabLegendBtn.textContent = dict.tabLegend;
    dom.tabSectionBtn.textContent = hasSections ? `${dict.tabSections} (${meta.sectionImages.length})` : dict.tabSections;
    dom.tabSectionBtn.hidden = !hasSections;
    dom.tabDetailBtn.textContent = dict.tabDetail;

    const activeTab = state.inspectorTab;
    dom.tabLegendBtn.classList.toggle('is-active', activeTab === 'legend');
    dom.tabLegendBtn.setAttribute('aria-selected', String(activeTab === 'legend'));
    dom.tabSectionBtn.classList.toggle('is-active', activeTab === 'section');
    dom.tabSectionBtn.setAttribute('aria-selected', String(activeTab === 'section'));
    dom.tabDetailBtn.classList.toggle('is-active', activeTab === 'detail');
    dom.tabDetailBtn.setAttribute('aria-selected', String(activeTab === 'detail'));

    // 詳細・PDFタブの内容
    dom.dominantInfoTitle.textContent = loc.title;
    if (loc.subtitle) {
      dom.dominantInfoSubtitle.textContent = loc.subtitle;
      dom.dominantInfoSubtitle.hidden = false;
    } else {
      dom.dominantInfoSubtitle.textContent = '';
      dom.dominantInfoSubtitle.hidden = true;
    }

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
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      dom.dominantInfoMeta.append(dt, dd);
    });

    dom.dominantInfoLinks.innerHTML = '';
    const linkDefs = [
      [dict.linkDetail, meta.detailUrl],
      [dict.linkPdf, meta.preferredPdf],
      [dict.linkFullPdf, meta.fullPdfUrl !== meta.preferredPdf ? meta.fullPdfUrl : ''],
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

    // ペイン切り替え
    hideLegendLoupe();
    if (activeTab === 'detail') {
      dom.inspectorVisualPane.hidden = true;
      dom.inspectorDetailPane.hidden = false;
      dom.legendOpenLink.hidden = true;
    } else {
      dom.inspectorVisualPane.hidden = false;
      dom.inspectorDetailPane.hidden = true;

      if (activeTab === 'section' && hasSections) {
        dom.sectionChips.innerHTML = '';
        const fragment = document.createDocumentFragment();
        meta.sectionImages.forEach((sec, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = idx === state.activeSectionIndex ? 'decade-chip is-selected' : 'decade-chip';
          btn.textContent = sec.label;
          btn.addEventListener('click', () => {
            state.activeSectionIndex = idx;
            renderInspectorDetail(item, true);
          });
          fragment.appendChild(btn);
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
      } else {
        dom.sectionChips.hidden = true;
        dom.sectionChips.innerHTML = '';
        dom.legendMapName.textContent = loc.title;
        if (meta.legendImageUrl) {
          dom.legendImage.src = meta.legendImageUrl;
          dom.legendImage.alt = `${loc.title} ${dict.tabLegend}`;
          dom.legendImage.hidden = false;
          dom.legendOpenLink.href = meta.legendImageUrl;
          dom.legendOpenLink.hidden = false;
        } else {
          dom.legendMapName.textContent = `${loc.title} — ${dict.legendNone}`;
          dom.legendImage.removeAttribute('src');
          dom.legendImage.hidden = true;
          dom.legendOpenLink.href = '#';
          dom.legendOpenLink.hidden = true;
        }
      }
    }

    renderSeamlessPointCard();
    syncRightInspectorVisibility();
  }

  /**
   * オーバーレイ中の図幅かどうかを判定する
   */
  function isItemOverlayed(item) {
    return state.activeOverlays.some((entry) => entry.item === item) || state.selectedItem === item;
  }

  /**
   * オーバーレイ配列の順番に応じて Leaflet の zIndex を同期する（配列末尾が最前面）
   */
  function syncOverlayZIndices() {
    state.activeOverlays.forEach((entry, idx) => {
      if (entry.layer && typeof entry.layer.setZIndex === 'function') {
        entry.layer.setZIndex(300 + idx);
      }
    });
  }

  /**
   * オーバーレイの重ね順を上下に入れ替える
   */
  function moveOverlayOrder(index, delta) {
    const targetIndex = index + delta;
    if (targetIndex < 0 || targetIndex >= state.activeOverlays.length) {
      return;
    }
    const [moved] = state.activeOverlays.splice(index, 1);
    state.activeOverlays.splice(targetIndex, 0, moved);
    syncOverlayZIndices();
    renderActiveOverlayList();
  }

  /**
   * 右インスペクタ上部の「表示中の地質図（最大4件）」コンパクトリストを描画する
   */
  function renderActiveOverlayList() {
    const dict = t();
    dom.activeOverlayList.innerHTML = '';
    dom.activeWmsName.textContent = dict.activeMapsTitle(state.activeOverlays.length, CONFIG.MAX_OVERLAYS);

    if (state.activeOverlays.length === 0) {
      dom.activeOverlaysSection.hidden = true;
      dom.clearWmsBtn.hidden = true;
      return;
    }

    dom.activeOverlaysSection.hidden = false;
    dom.clearWmsBtn.hidden = false;
    const showOrderButtons = state.activeOverlays.length >= 2;
    const fragment = document.createDocumentFragment();

    // 最前面（配列末尾）をリストの一番上に表示
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

      // 個別透過度スライダー（最新調整値を既定透過度として保存）
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
   * 削除後などにフォールバックとなるインスペクタ表示対象を返す
   */
  function getFallbackInspectorItem() {
    if (state.activeOverlays.length > 0) {
      return state.activeOverlays[state.activeOverlays.length - 1].item;
    }
    if (state.seamlessLayer && state.seamlessVirtualItem) {
      return state.seamlessVirtualItem;
    }
    return null;
  }

  /**
   * 指定された図幅のオーバーレイを解除する
   */
  function removeOverlayByItem(item) {
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
  }

  /**
   * すべての地質図オーバーレイを閉じる
   */
  function clearAllOverlays() {
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
  }

  /**
   * 共通スキーマの display 設定から Leaflet レイヤーを生成する
   */
  function createGeologicalLayer(meta, layerBounds = null, zIndex = 300, customOpacity = null) {
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
        opacity: state.overlayOpacity,
        attribution: meta.attribution,
        zIndex
      });
    }

    return null;
  }

  /**
   * シームレス地質図の地点マーカー・ポップアップ・進行中リクエストを片付ける
   */
  function clearSeamlessPointUI() {
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
   * 地点地質レスポンスから表示用の DOM ノードを構築する
   */
  function buildSeamlessGeologyNode(record) {
    const dict = t();
    const isEn = state.lang === 'en';
    const wrap = document.createElement('div');
    wrap.className = 'seamless-popup';

    if (!record || record.status === 'loading') {
      const msg = document.createElement('div');
      msg.className = 'seamless-popup-status';
      msg.textContent = dict.seamlessLoading;
      wrap.appendChild(msg);
      return wrap;
    }

    if (record.status === 'error') {
      const msg = document.createElement('div');
      msg.className = 'seamless-popup-status';
      msg.textContent = dict.seamlessFetchError;
      wrap.appendChild(msg);
      return wrap;
    }

    const data = record.data;
    if (!data || !data.symbol) {
      const msg = document.createElement('div');
      msg.className = 'seamless-popup-status';
      msg.textContent = dict.seamlessNoData;
      wrap.appendChild(msg);
      return wrap;
    }

    const header = document.createElement('div');
    header.className = 'seamless-geology-header';

    const swatch = document.createElement('span');
    swatch.className = 'seamless-swatch';
    const r = Number(data.r);
    const g = Number(data.g);
    const b = Number(data.b);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      swatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    const symbol = document.createElement('span');
    symbol.className = 'seamless-symbol';
    symbol.textContent = data.symbol;

    const coords = document.createElement('span');
    coords.className = 'seamless-coords';
    coords.textContent = `${record.lat.toFixed(4)}, ${record.lng.toFixed(4)}`;

    header.append(swatch, symbol, coords);
    wrap.appendChild(header);

    const groupVal = isEn ? (data.group_en || data.group_ja) : (data.group_ja || data.group_en);
    const ageVal = isEn ? (data.formationAge_en || data.formationAge_ja) : (data.formationAge_ja || data.formationAge_en);
    const lithVal = isEn ? (data.lithology_en || data.lithology_ja) : (data.lithology_ja || data.lithology_en);

    const dl = document.createElement('dl');
    dl.className = 'seamless-geology-meta';
    [
      [dict.seamlessGroupLabel, groupVal],
      [dict.seamlessAgeLabel, ageVal],
      [dict.seamlessLithologyLabel, lithVal]
    ].forEach(([label, value]) => {
      if (!value) {
        return;
      }
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      dl.append(dt, dd);
    });
    wrap.appendChild(dl);
    return wrap;
  }

  /**
   * 右インスペクタがシームレス表示中のとき、直近クリック地点の地質サマリーを更新する
   */
  function renderSeamlessPointCard() {
    if (!dom.seamlessPointCard) {
      return;
    }
    const isInspectingSeamless = Boolean(
      state.seamlessLayer &&
      state.seamlessVirtualItem &&
      state.inspectedItem === state.seamlessVirtualItem &&
      state.lastSeamlessPoint
    );
    if (!isInspectingSeamless) {
      dom.seamlessPointCard.hidden = true;
      dom.seamlessPointCard.innerHTML = '';
      return;
    }
    dom.seamlessPointCard.innerHTML = '';
    dom.seamlessPointCard.appendChild(buildSeamlessGeologyNode(state.lastSeamlessPoint));
    dom.seamlessPointCard.hidden = false;
  }

  /**
   * クリック地点のシームレス地質図 V2 凡例を API v1.2 から取得して表示する
   */
  async function querySeamlessPointGeology(latlng) {
    if (!state.map || !state.seamlessLayer || !latlng) {
      return;
    }
    const lat = Number(latlng.lat);
    const lng = Number(latlng.lng);
    const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;

    if (state.seamlessAbortController) {
      state.seamlessAbortController.abort();
      state.seamlessAbortController = null;
    }

    if (state.seamlessPointMarker) {
      state.seamlessPointMarker.setLatLng(latlng);
    } else {
      state.seamlessPointMarker = L.circleMarker(latlng, {
        radius: 6,
        color: '#1a73e8',
        weight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.9,
        interactive: false
      }).addTo(state.map);
    }

    if (!state.seamlessPopup) {
      state.seamlessPopup = L.popup({
        className: 'seamless-leaflet-popup',
        maxWidth: 300,
        offset: [0, -6]
      });
    }

    const showResult = (record) => {
      state.lastSeamlessPoint = record;
      if (state.seamlessPopup && state.map) {
        state.seamlessPopup
          .setLatLng(latlng)
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
  function toggleSeamless200k() {
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
        state.seamlessLayer.addTo(state.map);
      }
    }
    if (!state.inspectedItem && state.seamlessVirtualItem) {
      state.isRightInspectorCollapsed = false;
      renderInspectorDetail(state.seamlessVirtualItem);
    }
  }

  /**
   * 図幅を選択し、オーバーレイ追加（最大4図幅）または詳細・凡例表示を行う
   */
  function addOverlayForItem(item) {
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
      return;
    }

    const layerBounds = getItemBounds(item);
    const overlayLayer = createGeologicalLayer(meta, layerBounds, 300);

    setStatusMessage('');

    // タイル未配信（tile_type: "none" 等）の場合はオーバーレイ配列には入れず選択・凡例表示のみ
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
  }

  /**
   * 選択中の図幅の範囲へマップをズームする
   */
  function zoomToMapItem(item) {
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
   * 絞り込み結果リストを描画する
   */
  function renderResultList() {
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
   * 第一階層フィルター：地図種別チップを生成する（state.allItems のみに基づく）
   */
  function renderMapTypeChips() {
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

  /**
   * 詳細フィルター：縮尺・シリーズマルチセレクトチップを生成する
   */
  function renderScaleChips() {
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

  /**
   * 詳細フィルター：資料有無チップを生成する
   */
  function renderOtherChips() {
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

  /**
   * 5年刻みの目盛りドットと20年節目の年号ラベル（位置一致）を描画する
   */
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

  /**
   * デュアルレンジスライダーの表示ラベル・アクティブトラック・ドット・重なり優先度を更新する
   */
  function updateYearSliderUI() {
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

    // 両つまみが右端付近で重なった場合に min つまみがロックされないよう z-index を切り替える
    if (currentMin >= maxBound - 5) {
      dom.yearRangeMin.style.zIndex = '4';
      dom.yearRangeMax.style.zIndex = '3';
    } else {
      dom.yearRangeMin.style.zIndex = '3';
      dom.yearRangeMax.style.zIndex = '4';
    }
  }

  /**
   * 発行年の最小・最大値（5年単位スナップ＋実データ最大年保持）からスライダーを初期化する
   */
  function initYearSlider() {
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

  let yearFilterTimer = null;

  /**
   * デュアルレンジスライダー操作時の補正とデバウンス付き再フィルタリング
   */
  function handleYearSliderInput(changedHandle) {
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

  /**
   * 折りたたみ式詳細フィルターパネルの開閉を切り替える
   */
  function toggleFiltersPanel() {
    const isExpanded = dom.toggleFiltersBtn.getAttribute('aria-expanded') === 'true';
    const nextExpanded = !isExpanded;
    dom.toggleFiltersBtn.setAttribute('aria-expanded', String(nextExpanded));
    if (dom.filterPanelWrap) {
      dom.filterPanelWrap.classList.toggle('is-open', nextExpanded);
      dom.filterPanelWrap.inert = !nextExpanded;
    }
  }

  /**
   * 適用中の詳細フィルター件数バッジを更新する
   */
  function updateActiveFilterBadge() {
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
   * GeoJSON Feature のバウンディングボックス面積を計算する
   */
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
   * （面積降順に事前ソートして登録することで広い図幅を背面・狭い図幅を前面に保つ）
   */
  function renderGeoJsonFeatures(geojsonData) {
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
        const item = { layer, meta };

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

    // 初期表示は「地質図幅」のみ選択（詳細フィルターバッジは 0 のまま）
    if (state.allItems.some(({ meta }) => meta.mapType === 'geological_map_sheet')) {
      state.selectedMapType = 'geological_map_sheet';
    }

    renderMapTypeChips();
    initYearSlider();
    renderScaleChips();
    renderOtherChips();
    buildSuggestionPool();
    applyFilters();
    fitAllVisibleItems({ animate: false });
  }

  /**
   * 図幅名・火山名・著者名・地域名のサジェスト候補プールを構築する
   */
  function buildSuggestionPool() {
    const dict = t();
    const pool = [];
    const seenKeys = new Set();

    state.allItems.forEach((item) => {
      const { meta } = item;
      const loc = getLocalizedMeta(meta);
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

    state.suggestionPool = pool;
  }

  /**
   * サジェストドロップダウンを閉じる
   */
  function hideSuggestions() {
    dom.searchSuggestions.classList.remove('is-open');
    dom.searchInput.setAttribute('aria-expanded', 'false');
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
  }

  /**
   * サジェスト候補を選択した際の処理
   */
  function selectSuggestion(suggestion) {
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
    } else {
      if (state.isLeftDrawerCollapsed) {
        setLeftDrawerCollapsed(false);
      }
      fitAllVisibleItems();
    }
  }

  /**
   * サジェストラベル内の一致部分を <mark> でハイライトする
   */
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
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(label)) !== null) {
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(label.slice(lastIndex, match.index)));
      }
      const mark = document.createElement('mark');
      mark.className = 'suggestion-highlight';
      mark.textContent = match[0];
      frag.appendChild(mark);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < label.length) {
      frag.appendChild(document.createTextNode(label.slice(lastIndex)));
    }
    return frag;
  }

  /**
   * サジェスト候補の関連度スコアを計算する
   */
  function scoreSuggestion(entry, tokens) {
    if (!tokens.every((tok) => entry.searchText.includes(tok))) {
      return -1;
    }
    const typeBonus = { map: 4, volcano: 3, region: 2, author: 1 }[entry.type] || 0;
    const first = tokens[0];
    let score = typeBonus;

    if (tokens.length === 1 && entry.coreNormalized === first) {
      score += 120;
    } else if (entry.coreNormalized && entry.coreNormalized.startsWith(first)) {
      score += 70;
    } else if (entry.primaryText && entry.primaryText.includes(first)) {
      score += 40;
    } else {
      score += 15;
    }
    return score;
  }

  /**
   * 現在の検索入力値に応じたサジェスト候補をカテゴリ別・関連度順に描画する
   */
  function renderSuggestions() {
    const rawQuery = dom.searchInput.value.trim();
    const rawTokens = rawQuery.split(/[\s\u3000]+/).filter(Boolean);
    const normTokens = normalizeSearchText(rawQuery).split(/\s+/).filter(Boolean);

    if (normTokens.length === 0) {
      hideSuggestions();
      return;
    }

    const dict = t();
    const mapMatches = [];
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
      } else if (entry.type === 'region') {
        regionMatches.push(scored);
      } else if (entry.type === 'author') {
        authorMatches.push(scored);
      }
    }

    const sortFn = (a, b) => b.matchScore - a.matchScore || a.label.localeCompare(b.label, state.lang);
    mapMatches.sort(sortFn);
    regionMatches.sort(sortFn);
    authorMatches.sort(sortFn);

    const groups = [
      { title: dict.suggestionGroupMaps, items: mapMatches.slice(0, 5) },
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
      region: 'is-region',
      author: 'is-author'
    };

    groups.forEach((group) => {
      const headerLi = document.createElement('li');
      headerLi.className = 'suggestion-group-header';
      headerLi.setAttribute('role', 'presentation');
      headerLi.textContent = group.title;
      fragment.appendChild(headerLi);

      group.items.forEach((entry) => {
        const itemIndex = flatItems.length;
        flatItems.push(entry);

        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', 'false');

        const textSpan = document.createElement('span');
        textSpan.className = 'suggestion-text';
        textSpan.appendChild(buildHighlightedLabel(entry.label, rawTokens));

        const badgeSpan = document.createElement('span');
        const badgeClass = badgeClassMap[entry.type] || 'is-author';
        badgeSpan.className = `suggestion-badge ${badgeClass}`;
        badgeSpan.textContent = entry.badge;

        li.append(textSpan, badgeSpan);
        li.addEventListener('mousedown', (event) => {
          event.preventDefault();
          selectSuggestion(entry);
        });
        li.addEventListener('mousemove', () => {
          state.activeSuggestionIndex = itemIndex;
          updateActiveSuggestionHighlight();
        });

        fragment.appendChild(li);
      });
    });

    state.currentSuggestions = flatItems;
    state.activeSuggestionIndex = -1;
    dom.searchSuggestions.appendChild(fragment);
    dom.searchSuggestions.classList.add('is-open');
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

  let searchDebounceTimer = null;

  /**
   * 検索欄でのキーボード操作（上下移動・Enter確定・Esc閉じ）を処理する
   */
  function handleSearchKeydown(event) {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }

    if (event.key === 'Enter' && (!dom.searchSuggestions.classList.contains('is-open') || state.currentSuggestions.length === 0)) {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = null;
      }
      applyFilters();
      if (state.isLeftDrawerCollapsed) {
        setLeftDrawerCollapsed(false);
      }
      return;
    }

    if (!dom.searchSuggestions.classList.contains('is-open') || state.currentSuggestions.length === 0) {
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
    } else if (event.key === 'Enter') {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = null;
      }
      if (state.activeSuggestionIndex >= 0) {
        event.preventDefault();
        selectSuggestion(state.currentSuggestions[state.activeSuggestionIndex]);
      } else if (state.currentSuggestions.length === 1 || (state.currentSuggestions[0] && state.currentSuggestions[0].matchScore >= 120)) {
        event.preventDefault();
        selectSuggestion(state.currentSuggestions[0]);
      } else {
        hideSuggestions();
        applyFilters();
        if (state.isLeftDrawerCollapsed) {
          setLeftDrawerCollapsed(false);
        }
        fitAllVisibleItems();
      }
    } else if (event.key === 'Escape') {
      event.stopPropagation();
      hideSuggestions();
    }
  }

  /**
   * 図郭インデックス枠の表示/非表示を切り替える
   */
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

  /**
   * 検索文字列・地図範囲・発行年・縮尺・資料有無に基づき即時フィルタリングする
   */
  function applyFilters() {
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
      const loc = getLocalizedMeta(meta);
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

  /**
   * フィルタ条件をすべてリセットして再描画する
   */
  function resetFilters() {
    dom.searchInput.value = '';
    state.selectedMapType = 'all';
    renderMapTypeChips();

    state.viewportOnly = false;
    state.settings.viewportOnly = false;
    saveSettings();
    syncSettingsUI();

    state.yearRange.currentMin = state.yearRange.minBound;
    state.yearRange.currentMax = state.yearRange.maxBound;
    dom.yearRangeMin.value = String(state.yearRange.minBound);
    dom.yearRangeMax.value = String(state.yearRange.maxBound);
    updateYearSliderUI();

    state.selectedScales.clear();
    state.selectedResourceFlags.clear();
    dom.filterPanelBody.querySelectorAll('.decade-chip.is-selected').forEach((chip) => {
      chip.classList.remove('is-selected');
      chip.setAttribute('aria-pressed', 'false');
    });
    applyFilters();
  }

  /**
   * シームレス地質図の透過度を更新する
   */
  function handleSeamlessOpacityChange() {
    const percent = Number(dom.seamlessOpacitySlider.value);
    const nextOpacity = percent / 100;
    state.seamlessOpacity = nextOpacity;
    state.settings.seamlessOpacity = nextOpacity;
    if (dom.seamlessOpacityValue) {
      dom.seamlessOpacityValue.textContent = `${percent}%`;
    }
    if (state.seamlessLayer && typeof state.seamlessLayer.setOpacity === 'function') {
      state.seamlessLayer.setOpacity(nextOpacity);
    }
    debouncedSaveSettings();
  }

  /**
   * テーマ（light / dark）を適用する
   */
  function applyTheme(theme) {
    state.theme = theme === 'dark' ? 'dark' : 'light';
    if (state.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    syncSettingsUI();
  }

  /**
   * 保存済み設定またはOS設定から初期テーマを適用する
   */
  function initTheme() {
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
   * すべての設定を初期値に戻す
   */
  function resetAllSettings() {
    state.settings = { ...CONFIG.DEFAULT_SETTINGS };
    state.showIndexFrames = state.settings.showIndexFrames;
    state.viewportOnly = state.settings.viewportOnly;
    state.overlayOpacity = state.settings.overlayOpacity;
    state.seamlessOpacity = state.settings.seamlessOpacity;
    state.seamlessQueryPriority = state.settings.seamlessQueryPriority;

    if (dom.showIndexToggle) {
      dom.showIndexToggle.checked = state.showIndexFrames;
      toggleIndexFrames();
    }
    if (dom.viewportOnlyToggle) {
      dom.viewportOnlyToggle.checked = state.viewportOnly;
      applyFilters();
    }
    if (dom.seamless200kToggle) {
      dom.seamless200kToggle.checked = state.settings.seamless200k;
      toggleSeamless200k();
    }

    switchBasemap(CONFIG.DEFAULT_SETTINGS.basemap);
    applyTheme('light');
    if (state.lang !== CONFIG.DEFAULT_SETTINGS.lang) {
      switchLanguage(CONFIG.DEFAULT_SETTINGS.lang);
    }
    saveSettings();
    syncSettingsUI();
  }

  /**
   * 最小限のグローバルキーボードショートカット（`/`・`Ctrl+K`・`Esc`）を処理する
   */
  function handleGlobalKeydown(event) {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    const activeEl = document.activeElement;
    const isInputFocused = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl?.tagName);
    const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

    if (event.key === 'Escape') {
      if (dom.layersPopover.classList.contains('is-open') || dom.prefsPopover.classList.contains('is-open')) {
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
    }
  }

  /**
   * 表示言語（日本語 / 英語）を切り替え、UI全体を再描画する
   */
  function switchLanguage(lang) {
    if (!I18N[lang] || state.lang === lang) {
      return;
    }

    state.lang = lang;
    state.settings.lang = lang;
    saveSettings();
    document.documentElement.lang = lang;
    const dict = t();

    dom.searchInput.placeholder = dict.searchPlaceholder;
    dom.searchInput.setAttribute('aria-label', dict.searchPlaceholder);
    dom.mapTypeLabel.textContent = dict.mapTypeLabel;
    dom.viewportOnlyLabel.textContent = dict.viewportOnlyLabel;
    dom.showIndexLabel.textContent = dict.showIndexLabel;
    dom.seamless200kLabel.textContent = dict.seamless200kLabel;
    dom.seamlessOpacityLabel.textContent = dict.seamlessOpacityLabel;
    if (dom.seamlessQueryLabel) {
      dom.seamlessQueryLabel.textContent = dict.seamlessQueryLabel;
    }
    dom.filterAccordionLabel.textContent = dict.filterAccordionLabel;
    dom.decadeLabel.textContent = dict.decadeLabel;
    dom.scaleFilterLabel.textContent = dict.scaleFilterLabel;
    dom.otherFilterLabel.textContent = dict.otherFilterLabel;
    dom.resetFiltersBtn.textContent = dict.reset;
    dom.basemapLabel.textContent = dict.basemapLabel;
    dom.clearWmsBtn.textContent = dict.clearAll;
    dom.resultListLabel.textContent = dict.resultListLabel;
    dom.legendOpenLink.textContent = dict.legendOpen;

    dom.fitAllBtn.title = dict.fitAllTitle;
    dom.fitAllBtn.setAttribute('aria-label', dict.fitAllTitle);
    dom.collapseRightBtn.title = dict.collapseRightTitle;
    dom.collapseRightBtn.setAttribute('aria-label', dict.collapseRightTitle);
    dom.reopenRightLabel.textContent = dict.reopenRightLabel;
    dom.reopenRightBtn.title = dict.reopenRightTitle;
    dom.reopenRightBtn.setAttribute('aria-label', dict.reopenRightTitle);
    dom.layersPopoverBtn.title = dict.layersBtnTitle;
    dom.layersPopoverBtn.setAttribute('aria-label', dict.layersBtnTitle);
    dom.prefsPopoverBtn.title = dict.prefsBtnTitle;
    dom.prefsPopoverBtn.setAttribute('aria-label', dict.prefsBtnTitle);
    dom.prefsThemeLabel.textContent = dict.prefsThemeLabel;
    dom.prefsLangLabel.textContent = dict.prefsLangLabel;
    dom.resetSettingsBtn.textContent = dict.prefsResetLabel;

    dom.themeChoiceButtons.forEach((btn) => {
      btn.textContent = btn.dataset.themeChoice === 'dark' ? dict.prefsThemeDark : dict.prefsThemeLight;
    });

    const mobileLabelMap = {
      map: dict.mobileTabMap,
      search: dict.mobileTabSearch,
      legend: dict.mobileTabLegend
    };
    dom.mobileNavButtons.forEach((btn) => {
      if (mobileLabelMap[btn.dataset.mobileView]) {
        btn.textContent = mobileLabelMap[btn.dataset.mobileView];
      }
    });

    const basemapLabelMap = {
      blank: dict.basemapBlank,
      pale: dict.basemapPale,
      std: dict.basemapStd,
      photo: dict.basemapPhoto
    };
    dom.basemapButtons.forEach((btn) => {
      if (basemapLabelMap[btn.dataset.basemap]) {
        btn.textContent = basemapLabelMap[btn.dataset.basemap];
      }
    });

    setLeftDrawerCollapsed(state.isLeftDrawerCollapsed);

    state.allItems.forEach(({ layer, meta }) => {
      if (typeof layer.setTooltipContent === 'function') {
        layer.setTooltipContent(buildTooltipText(meta));
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

  /**
   * UIおよびキーボードイベントリスナーを登録する
   */
  function initEventListeners() {
    dom.searchInput.addEventListener('input', (event) => {
      if (event.isComposing) {
        return;
      }
      renderSuggestions();
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }
      searchDebounceTimer = setTimeout(() => {
        searchDebounceTimer = null;
        applyFilters();
      }, 100);
    });
    dom.searchInput.addEventListener('compositionend', () => {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = null;
      }
      renderSuggestions();
      applyFilters();
    });
    dom.searchInput.addEventListener('focus', renderSuggestions);
    dom.searchInput.addEventListener('blur', hideSuggestions);
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);

    dom.toggleLeftDrawerBtn.addEventListener('click', () => {
      setLeftDrawerCollapsed(!state.isLeftDrawerCollapsed);
    });

    dom.viewportOnlyToggle.addEventListener('change', () => {
      state.viewportOnly = dom.viewportOnlyToggle.checked;
      state.settings.viewportOnly = state.viewportOnly;
      saveSettings();
      syncSettingsUI();
      applyFilters();
    });
    dom.showIndexToggle.addEventListener('change', toggleIndexFrames);
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

    dom.yearRangeMin.addEventListener('input', () => handleYearSliderInput('min'));
    dom.yearRangeMax.addEventListener('input', () => handleYearSliderInput('max'));

    dom.toggleFiltersBtn.addEventListener('click', toggleFiltersPanel);
    dom.resetFiltersBtn.addEventListener('click', () => {
      hideSuggestions();
      resetFilters();
    });
    dom.fitAllBtn.addEventListener('click', fitAllVisibleItems);

    dom.clearWmsBtn.addEventListener('click', clearAllOverlays);
    dom.collapseRightBtn.addEventListener('click', () => setRightInspectorCollapsed(true));
    dom.reopenRightBtn.addEventListener('click', () => setRightInspectorCollapsed(false));

    dom.legendZoomWrapper.addEventListener('mouseenter', (event) => {
      refreshLoupeRects();
      updateLegendLoupe(event);
    });
    dom.legendZoomWrapper.addEventListener('mousemove', updateLegendLoupe);
    dom.legendZoomWrapper.addEventListener('mouseleave', hideLegendLoupe);
    dom.legendImage.addEventListener('error', () => {
      hideLegendLoupe();
      dom.legendImage.hidden = true;
      dom.legendOpenLink.hidden = true;
      dom.legendMapName.textContent = t().legendNone;
    });
    dom.rightInspector.addEventListener('scroll', () => {
      hideLegendLoupe();
      refreshLoupeRects();
    }, true);
    window.addEventListener('resize', () => {
      hideLegendLoupe();
      refreshLoupeRects();
      if (state.map) {
        state.map.invalidateSize({ animate: false, pan: false });
      }
    });

    dom.tabLegendBtn.addEventListener('click', () => switchInspectorTab('legend'));
    dom.tabSectionBtn.addEventListener('click', () => switchInspectorTab('section'));
    dom.tabDetailBtn.addEventListener('click', () => switchInspectorTab('detail'));

    dom.layersPopoverBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      togglePopover(dom.layersPopover, dom.layersPopoverBtn);
    });
    dom.prefsPopoverBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      togglePopover(dom.prefsPopover, dom.prefsPopoverBtn);
    });
    dom.layersPopover.addEventListener('click', (event) => event.stopPropagation());
    dom.prefsPopover.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('click', closeAllPopovers);

    dom.basemapButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchBasemap(btn.dataset.basemap));
    });

    dom.themeChoiceButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.themeChoice === 'dark' ? 'dark' : 'light';
        applyTheme(chosen);
        state.settings.theme = chosen;
        saveSettings();
      });
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

  /**
   * 20万分の1シームレス地質図プロバイダ設定を読み込む
   */
  async function loadSeamlessProvider() {
    try {
      const response = await fetch(CONFIG.SEAMLESS_PROVIDER_URL, { cache: 'no-cache' });
      if (!response.ok) {
        return;
      }
      const records = await response.json();
      if (Array.isArray(records) && records.length > 0) {
        state.seamlessMeta = normalizeProperties(records[0]);
        state.seamlessVirtualItem = { layer: null, meta: state.seamlessMeta };
        if (state.settings.seamless200k && dom.seamless200kToggle) {
          dom.seamless200kToggle.checked = true;
          toggleSeamless200k();
        }
      }
    } catch {
      // ignore optional seamless config failure
    }
  }

  /**
   * アプリケーションのエントリポイント
   */
  async function init() {
    loadSettings();
    initTheme();
    syncSettingsUI();
    setLeftDrawerCollapsed(true);
    switchMobileView('map');
    state.map = initMap();
    initEventListeners();
    if (state.settings.lang && state.settings.lang !== state.lang) {
      switchLanguage(state.settings.lang);
    }
    loadSeamlessProvider();

    try {
      const geojsonData = await fetchMapIndex(CONFIG.GEOJSON_URL);
      renderGeoJsonFeatures(geojsonData);
    } catch {
      dom.resultCount.textContent = t().loadErrorCount;
      setStatusMessage(t().loadErrorMessage);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
