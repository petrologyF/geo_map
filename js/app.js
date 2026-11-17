(() => {
  'use strict';

  /**
   * アプリケーション設定定数
   */
  const CONFIG = {
    GEOJSON_URL: 'data/map_index.geojson',
    SEAMLESS_PROVIDER_URL: 'data/providers/gsj_seamless_200k.json',
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
    LOUPE_ZOOM: 2.5,
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
      appTitle: '地質図検索',
      searchPlaceholder: '図幅名・火山名・著者で検索',
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
      seamless200kLabel: '20万分の1 シームレス (全国WMS)',
      filterAccordionLabel: '詳細フィルター',
      decadeLabel: '発行年',
      scaleFilterLabel: '縮尺・シリーズ',
      regionFilterLabel: '地域（複数選択可）',
      authorFilterLabel: '著者（複数選択可）',
      otherFilterLabel: 'その他（発行機関・資料）',
      flagPdf: '説明書PDFあり',
      flagLegend: '凡例あり',
      flagOriginal: '原図JPGあり',
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
      badgeVolcano: '火山',
      badgeAuthor: '著者',
      eyebrow: '表示中の図幅詳細',
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
      legendTitle: '地質凡例',
      sectionTitle: '地質断面図',
      tabLegend: '凡例',
      tabSections: '断面図',
      legendOpen: '拡大',
      legendNone: '凡例画像なし',
      unknownAuthor: '不明',
      shortcutModalTitle: 'キーボードショートカット',
      shortcuts: [
        [['/', 'Ctrl+K'], '検索欄にフォーカス'],
        [['m'], '地図にフォーカスを移動'],
        [['l'], '該当図幅一覧にフォーカスを移動'],
        [['↑', '↓'], '一覧内の図幅を上下移動'],
        [['f'], '表示中の全図幅にズーム'],
        [['i'], '図郭枠の表示/非表示を切り替え'],
        [['s'], '20万分の1シームレスを切り替え'],
        [['b'], '背景地図（淡色/標準/写真）を切り替え'],
        [['[', ']'], '透過度を 10% 減少 / 増加'],
        [['x'], '表示中の地質図をすべて閉じる'],
        [['d'], 'ダークモード / ライトモード切替'],
        [['?'], 'ショートカット一覧を表示/閉じる'],
        [['Esc'], 'ヘルプ・検索・フォーカスを解除']
      ]
    },
    en: {
      appTitle: 'GeoMap Search',
      searchPlaceholder: 'Search map, volcano, or author',
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
      seamless200kLabel: '1:200K Seamless (WMS)',
      filterAccordionLabel: 'Filters',
      decadeLabel: 'Published Year',
      scaleFilterLabel: 'Scale / Series',
      regionFilterLabel: 'Region (Multi-select)',
      authorFilterLabel: 'Authors (Multi-select)',
      otherFilterLabel: 'Other (Publisher / Resources)',
      flagPdf: 'Has PDF',
      flagLegend: 'Has Legend',
      flagOriginal: 'Has Original JPG',
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
      badgeVolcano: 'Volcano',
      badgeAuthor: 'Author',
      eyebrow: 'Active Map Details',
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
      legendTitle: 'Legend',
      sectionTitle: 'Sections',
      tabLegend: 'Legend',
      tabSections: 'Sections',
      legendOpen: 'Open',
      legendNone: 'No legend image',
      unknownAuthor: 'Unknown',
      shortcutModalTitle: 'Keyboard Shortcuts',
      shortcuts: [
        [['/', 'Ctrl+K'], 'Focus search box'],
        [['m'], 'Focus map container'],
        [['l'], 'Focus matching maps list'],
        [['↑', '↓'], 'Navigate items in list'],
        [['f'], 'Fit all visible maps'],
        [['i'], 'Toggle map frames'],
        [['s'], 'Toggle 1:200K Seamless WMS'],
        [['b'], 'Cycle basemap (Pale/Std/Photo)'],
        [['[', ']'], 'Decrease / increase opacity by 10%'],
        [['x'], 'Clear all active overlays'],
        [['d'], 'Toggle dark / light mode'],
        [['?'], 'Toggle shortcut help'],
        [['Esc'], 'Close help / blur focus']
      ]
    }
  };

  /**
   * アプリケーション状態
   */
  const state = {
    lang: 'ja',
    theme: 'light',
    map: null,
    activeBaseLayer: null,
    activeBasemapKey: 'pale',
    lastFocusedBeforeModal: null,
    indexLayerGroup: null,
    allItems: [],
    filteredItems: [],
    yearRange: {
      minBound: 1950,
      maxBound: new Date().getFullYear(),
      currentMin: 1950,
      currentMax: new Date().getFullYear()
    },
    viewportOnly: false,
    showIndexFrames: true,
    selectedMapType: 'all',
    selectedScales: new Set(),
    selectedRegions: new Set(),
    selectedAuthors: new Set(),
    selectedPublishers: new Set(),
    selectedResourceFlags: new Set(),
    suggestionPool: [],
    currentSuggestions: [],
    activeSuggestionIndex: -1,
    activeOverlays: [],
    selectedItem: null,
    loadingLayerCount: 0,
    seamlessLayer: null,
    seamlessMeta: null,
    dominantLegendItem: null,
    visualMode: 'legend',
    activeSectionIndex: 0,
    overlayOpacity: CONFIG.DEFAULT_OVERLAY_OPACITY
  };

  /**
   * DOM要素のキャッシュ
   */
  const dom = {
    appLayout: document.querySelector('.app-layout'),
    mapEl: document.getElementById('map'),
    mobileNavButtons: document.querySelectorAll('.mobile-nav-btn[data-mobile-view]'),
    mobileLegendTab: document.getElementById('mobile-legend-tab'),
    appTitle: document.getElementById('app-title'),
    langButtons: document.querySelectorAll('.segmented-btn[data-lang]'),
    fitAllBtn: document.getElementById('fit-all-btn'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    shortcutHelpBtn: document.getElementById('shortcut-help-btn'),
    shortcutModal: document.getElementById('shortcut-modal'),
    shortcutModalTitle: document.getElementById('shortcut-modal-title'),
    closeShortcutModal: document.getElementById('close-shortcut-modal'),
    shortcutList: document.getElementById('shortcut-list'),
    searchInput: document.getElementById('search-input'),
    searchSuggestions: document.getElementById('search-suggestions'),
    mapTypeLabel: document.getElementById('map-type-label'),
    mapTypeChips: document.getElementById('map-type-chips'),
    viewportOnlyToggle: document.getElementById('viewport-only-toggle'),
    viewportOnlyLabel: document.getElementById('viewport-only-label'),
    showIndexToggle: document.getElementById('show-index-toggle'),
    showIndexLabel: document.getElementById('show-index-label'),
    seamless200kToggle: document.getElementById('seamless-200k-toggle'),
    seamless200kLabel: document.getElementById('seamless-200k-label'),
    toggleFiltersBtn: document.getElementById('toggle-filters-btn'),
    filterAccordionLabel: document.getElementById('filter-accordion-label'),
    activeFilterBadge: document.getElementById('active-filter-badge'),
    filterPanelBody: document.getElementById('filter-panel-body'),
    decadeLabel: document.getElementById('decade-label'),
    yearRangeDisplay: document.getElementById('year-range-display'),
    yearRangeTrack: document.getElementById('year-range-track'),
    yearRangeMin: document.getElementById('year-range-min'),
    yearRangeMax: document.getElementById('year-range-max'),
    scaleFilterLabel: document.getElementById('scale-filter-label'),
    scaleChips: document.getElementById('scale-chips'),
    regionFilterLabel: document.getElementById('region-filter-label'),
    regionChips: document.getElementById('region-chips'),
    authorFilterLabel: document.getElementById('author-filter-label'),
    authorChips: document.getElementById('author-chips'),
    otherFilterLabel: document.getElementById('other-filter-label'),
    otherChips: document.getElementById('other-chips'),
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
    visualModeTabs: document.getElementById('visual-mode-tabs'),
    tabLegendBtn: document.getElementById('tab-legend-btn'),
    tabSectionBtn: document.getElementById('tab-section-btn'),
    sectionChips: document.getElementById('section-chips'),
    legendOpenLink: document.getElementById('legend-open-link'),
    legendZoomWrapper: document.getElementById('legend-zoom-wrapper'),
    legendImage: document.getElementById('legend-image'),
    legendLoupe: document.getElementById('legend-loupe'),
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
   * @param {number|null} scaleDenominator - 縮尺分母
   * @param {string} [mapType='geological_map_sheet'] - 地図種別
   * @returns {Object} Leaflet Path オプション
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

    state.activeBasemapKey = key;
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

    // 地図移動・ズーム完了時に表示範囲フィルタと凡例を更新
    map.on('moveend', () => {
      if (state.viewportOnly) {
        applyFilters();
      }
      updateDominantLegend();
    });

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
   * モバイル表示時のアクティブパネル（地図 / 検索・一覧 / 詳細・凡例）を切り替える
   * @param {'map'|'search'|'legend'} view
   */
  function switchMobileView(view) {
    dom.appLayout.dataset.mobileView = view;
    dom.mobileNavButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.mobileView === view);
    });
    if (view === 'map' && state.map) {
      setTimeout(() => state.map.invalidateSize(), 50);
    }
  }

  /**
   * 凡例画像の拡大鏡（ルーペ）を非表示にする
   */
  function hideLegendLoupe() {
    dom.legendLoupe.hidden = true;
  }

  /**
   * 凡例画像のホバー位置に合わせて拡大鏡（ルーペ）を更新する
   * @param {MouseEvent} event - マウス移動イベント
   */
  function updateLegendLoupe(event) {
    if (dom.legendImage.hidden || !dom.legendImage.src || !dom.legendImage.complete || dom.legendImage.naturalWidth === 0) {
      hideLegendLoupe();
      return;
    }

    const rect = dom.legendImage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      hideLegendLoupe();
      return;
    }

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      hideLegendLoupe();
      return;
    }

    const zoom = CONFIG.LOUPE_ZOOM;
    dom.legendLoupe.hidden = false;
    const loupeW = dom.legendLoupe.offsetWidth || 180;
    const loupeH = dom.legendLoupe.offsetHeight || 180;
    const halfW = loupeW / 2;
    const halfH = loupeH / 2;

    const loupeX = rect.width > loupeW
      ? Math.max(halfW, Math.min(rect.width - halfW, x))
      : rect.width / 2;
    const loupeY = rect.height > loupeH
      ? Math.max(halfH, Math.min(rect.height - halfH, y))
      : rect.height / 2;

    dom.legendLoupe.style.left = `${loupeX}px`;
    dom.legendLoupe.style.top = `${loupeY}px`;
    dom.legendLoupe.style.backgroundImage = `url("${dom.legendImage.src}")`;
    dom.legendLoupe.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
    dom.legendLoupe.style.backgroundPosition = `${-(x * zoom - halfW)}px ${-(y * zoom - halfH)}px`;
  }

  /**
   * 右サイドバー（最広表示図幅の詳細情報 & 地質凡例）の表示内容を更新する
   * @param {Object|null} item - 表示対象の図幅アイテム（nullで非表示）
   * @param {boolean} [forceUpdate=false] - 同一アイテムでも強制再描画するか
   */
  function renderLegendPanel(item, forceUpdate = false) {
    const wasHidden = dom.legendSidebar.hidden;
    const dict = t();

    if (!item) {
      state.dominantLegendItem = null;
      hideLegendLoupe();
      dom.legendSidebar.hidden = true;
      dom.mobileLegendTab.hidden = true;
      if (dom.appLayout.dataset.mobileView === 'legend') {
        switchMobileView('map');
      }
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
    const mapTypeLabel = dict.mapTypes?.[meta.mapType] || meta.mapType;
    const volcanoName = state.lang === 'en'
      ? (meta.volcanoNameEn || meta.volcanoNameJa)
      : (meta.volcanoNameJa || meta.volcanoNameEn);

    const metaEntries = [
      [dict.mapTypeFieldLabel, mapTypeLabel],
      [dict.yearLabel, yearValue],
      [dict.authorsLabel, loc.authors]
    ];
    if (volcanoName) {
      metaEntries.splice(1, 0, [dict.volcanoLabel, volcanoName]);
    }
    if (meta.scale) {
      metaEntries.push([dict.scaleLabel, meta.scale]);
    }
    if (meta.providerNameJa) {
      metaEntries.push([dict.providerLabel, meta.providerNameJa]);
    }
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

    // 下段：凡例 / 断面図切り替え表示
    if (!forceUpdate) {
      state.activeSectionIndex = 0;
      if (meta.sectionImages.length === 0) {
        state.visualMode = 'legend';
      } else if (!meta.legendImageUrl) {
        state.visualMode = 'section';
      }
    }
    renderVisualArea(meta);

    dom.legendSidebar.hidden = false;
    dom.mobileLegendTab.hidden = false;

    if (wasHidden && state.map) {
      state.map.invalidateSize();
    }
  }

  /**
   * 右サイドバー下段（凡例 / 断面図のタブ・チップ・画像・ルーペ）を描画する
   * @param {Object} meta - normalizeProperties() の返却オブジェクト
   */
  function renderVisualArea(meta) {
    const dict = t();
    const loc = getLocalizedMeta(meta);
    const hasSections = meta.sectionImages.length > 0;

    hideLegendLoupe();

    dom.tabLegendBtn.textContent = dict.tabLegend;
    dom.tabSectionBtn.textContent = hasSections
      ? `${dict.tabSections} (${meta.sectionImages.length})`
      : dict.tabSections;

    dom.visualModeTabs.hidden = !hasSections;

    const isSectionMode = state.visualMode === 'section' && hasSections;
    dom.tabLegendBtn.classList.toggle('is-active', !isSectionMode);
    dom.tabLegendBtn.setAttribute('aria-selected', String(!isSectionMode));
    dom.tabSectionBtn.classList.toggle('is-active', isSectionMode);
    dom.tabSectionBtn.setAttribute('aria-selected', String(isSectionMode));

    if (isSectionMode) {
      dom.legendPanelTitle.textContent = dict.sectionTitle;
      dom.sectionChips.innerHTML = '';
      const fragment = document.createDocumentFragment();
      meta.sectionImages.forEach((sec, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = idx === state.activeSectionIndex ? 'decade-chip is-selected' : 'decade-chip';
        btn.textContent = sec.label;
        btn.addEventListener('click', () => {
          state.activeSectionIndex = idx;
          renderVisualArea(meta);
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
      dom.legendPanelTitle.textContent = dict.legendTitle;
      dom.sectionChips.hidden = true;
      dom.sectionChips.innerHTML = '';

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
    }
  }

  /**
   * 右サイドバーの「凡例 / 断面図」表示モードを切り替える
   * @param {'legend'|'section'} mode
   */
  function switchVisualMode(mode) {
    if (state.visualMode === mode) {
      return;
    }
    state.visualMode = mode;
    if (state.dominantLegendItem) {
      renderVisualArea(state.dominantLegendItem.meta);
    }
  }

  /**
   * 現在オーバーレイ表示されている地質図の中で最も広く表示されているものを特定し、右サイドバーを更新する
   */
  function updateDominantLegend() {
    if (!state.map) {
      renderLegendPanel(null);
      return;
    }

    if (state.activeOverlays.length === 0) {
      renderLegendPanel(state.selectedItem);
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
   * 指定した図幅アイテムが現在オーバーレイ表示中または選択中か判定する
   * @param {Object} item - 図幅アイテム
   * @returns {boolean} 表示中・選択中ならtrue
   */
  function isItemOverlayed(item) {
    return item === state.selectedItem || state.activeOverlays.some((entry) => entry.item === item);
  }

  /**
   * activeOverlays の配列順に応じて全レイヤーの zIndex を同期する（末尾が最前面）
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
   * @param {number} index - state.activeOverlays 内の現在インデックス
   * @param {number} delta - +1 で前面へ、-1 で背面へ
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
   * 左サイドバーの「表示中の地質図（最大4件）」リストを描画する（上が最前面）
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

    // 最前面（配列末尾）をリストの一番上に表示
    for (let i = state.activeOverlays.length - 1; i >= 0; i -= 1) {
      const entry = state.activeOverlays[i];
      const { item, layer } = entry;
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

      const upBtn = document.createElement('button');
      upBtn.type = 'button';
      upBtn.className = 'icon-button';
      upBtn.title = '前面へ';
      upBtn.disabled = i === state.activeOverlays.length - 1;
      upBtn.setAttribute('aria-label', `${loc.title} move up`);
      upBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      upBtn.addEventListener('click', () => moveOverlayOrder(i, 1));

      const downBtn = document.createElement('button');
      downBtn.type = 'button';
      downBtn.className = 'icon-button';
      downBtn.title = '背面へ';
      downBtn.disabled = i === 0;
      downBtn.setAttribute('aria-label', `${loc.title} move down`);
      downBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      downBtn.addEventListener('click', () => moveOverlayOrder(i, -1));

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

      btns.append(upBtn, downBtn, zoomBtn, removeBtn);
      topRow.append(label, btns);

      // 個別透過度スライダー行
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
        entry.opacity = pct / 100;
        itemVal.textContent = `${pct}%`;
        if (layer && typeof layer.setOpacity === 'function') {
          layer.setOpacity(entry.opacity);
        }
      });

      opacityRow.append(itemSlider, itemVal);

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

      if (meta.preferredPdf) {
        const pdfLink = document.createElement('a');
        pdfLink.className = 'active-overlay-link';
        pdfLink.href = meta.preferredPdf;
        pdfLink.target = '_blank';
        pdfLink.rel = 'noopener noreferrer';
        pdfLink.textContent = dict.linkPdf;
        metaRow.appendChild(pdfLink);
      }

      li.append(topRow, opacityRow, metaRow);
      fragment.appendChild(li);
    }

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
    if (removed.isLoading) {
      state.loadingLayerCount = Math.max(0, state.loadingLayerCount - 1);
      if (state.loadingLayerCount === 0) {
        dom.wmsStatusDot.classList.remove('is-loading');
      }
    }
    if (state.map && removed.layer) {
      state.map.removeLayer(removed.layer);
    }
    if (state.selectedItem === item) {
      state.selectedItem = null;
    }
    if (removed.item.layer && !isItemOverlayed(removed.item)) {
      removed.item.layer.setStyle(styleByScale(removed.item.meta.scaleDenominator, removed.item.meta.mapType));
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
        item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
      }
    });
    state.activeOverlays = [];
    if (state.selectedItem && state.selectedItem.layer) {
      state.selectedItem.layer.setStyle(styleByScale(state.selectedItem.meta.scaleDenominator, state.selectedItem.meta.mapType));
    }
    state.selectedItem = null;
    state.loadingLayerCount = 0;
    dom.wmsStatusDot.classList.remove('is-loading');
    renderActiveOverlayList();
    syncSelectedListItem();
    updateDominantLegend();
  }

  /**
   * display.tile_type（xyz / wms）に応じて Leaflet レイヤーを生成する
   * @param {Object} meta - normalizeProperties() の返却オブジェクト
   * @param {L.LatLngBounds|null} [layerBounds] - 表示範囲制限
   * @param {number} [zIndex] - レイヤー重ね順
   * @returns {L.Layer|null}
   */
  function createGeologicalLayer(meta, layerBounds = null, zIndex = 300) {
    if (!meta.overlayType || !meta.overlayUrl) {
      return null;
    }

    const commonOptions = {
      opacity: state.overlayOpacity,
      attribution: meta.attribution,
      zIndex,
      ...(layerBounds && layerBounds.isValid() ? { bounds: layerBounds } : {})
    };

    if (meta.overlayType === 'xyz') {
      return L.tileLayer(meta.overlayUrl, {
        ...commonOptions,
        minZoom: CONFIG.MIN_ZOOM,
        maxNativeZoom: meta.zoomMax,
        maxZoom: CONFIG.MAX_ZOOM
      });
    }

    if (meta.overlayType === 'wms') {
      return L.tileLayer.wms(meta.overlayUrl, {
        ...CONFIG.WMS_OPTIONS,
        layers: meta.wmsLayers || CONFIG.WMS_OPTIONS.layers,
        ...commonOptions,
        maxZoom: CONFIG.MAX_ZOOM
      });
    }

    if (meta.overlayType === 'raster' && meta.rasterImageUrl && layerBounds && layerBounds.isValid()) {
      return L.imageOverlay(meta.rasterImageUrl, layerBounds, {
        opacity: state.overlayOpacity,
        attribution: meta.attribution
      });
    }

    return null;
  }

  /**
   * 20万分の1日本シームレス地質図（全国WMS）の表示/非表示を切り替える
   */
  function toggleSeamless200k() {
    const enabled = dom.seamless200kToggle.checked;
    if (!state.map) {
      return;
    }

    if (!enabled) {
      if (state.seamlessLayer) {
        state.map.removeLayer(state.seamlessLayer);
        state.seamlessLayer = null;
      }
      return;
    }

    if (!state.seamlessMeta) {
      dom.seamless200kToggle.checked = false;
      setStatusMessage('20万分の1シームレス地質図の設定が読み込まれていません。');
      return;
    }

    if (!state.seamlessLayer) {
      state.seamlessLayer = createGeologicalLayer(state.seamlessMeta, null, 200);
      if (state.seamlessLayer) {
        state.seamlessLayer.addTo(state.map);
      }
    }
  }

  /**
   * 図幅を選択し、タイル/WMSがある場合はオーバーレイ追加（最大4図幅）、
   * タイル未配信の場合は詳細・凡例パネル表示のみを行う
   * @param {Object} item - { layer, meta } オブジェクト
   */
  function addOverlayForItem(item) {
    const { meta } = item;

    // 以前の選択図幅がオーバーレイ中でなければスタイルをデフォルトに戻す
    const prevSelected = state.selectedItem;
    state.selectedItem = item;
    if (prevSelected && prevSelected !== item && !state.activeOverlays.some((e) => e.item === prevSelected)) {
      if (prevSelected.layer) {
        prevSelected.layer.setStyle(styleByScale(prevSelected.meta.scaleDenominator, prevSelected.meta.mapType));
      }
    }

    // すでにオーバーレイ表示中の場合は最前面へ移動し、配列順も最新へ揃えて終了
    const existing = state.activeOverlays.find((entry) => entry.item === item);
    if (existing) {
      if (existing.layer && typeof existing.layer.bringToFront === 'function') {
        existing.layer.bringToFront();
      }
      state.activeOverlays.push(...state.activeOverlays.splice(state.activeOverlays.indexOf(existing), 1));
      syncOverlayZIndices();
      renderActiveOverlayList();
      syncSelectedListItem();
      updateDominantLegend();
      return;
    }

    const layerBounds = getItemBounds(item);
    const overlayLayer = createGeologicalLayer(meta, layerBounds, 300);

    setStatusMessage('');

    // タイル未配信（tile_type: "none" 等）の場合はオーバーレイ配列には入れず、選択状態＋右サイドバー表示のみ行う
    if (!overlayLayer) {
      if (item.layer) {
        item.layer.setStyle(CONFIG.POLYGON_STYLE.selected);
      }
      syncSelectedListItem();
      renderLegendPanel(item, true);
      return;
    }

    // 最大4図幅に達している場合、最も古いオーバーレイを1つ外す
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
        setStatusMessage(`「${meta.mapNameJa}」の地質図タイル取得中にエラーが発生しました。`);
      }
    });

    overlayLayer.addTo(state.map);
    state.activeOverlays.push(overlayEntry);
    syncOverlayZIndices();
    if (item.layer) {
      item.layer.setStyle(CONFIG.POLYGON_STYLE.selected);
    }

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
      const highlightItem = () => {
        if (!isItemOverlayed(item) && state.showIndexFrames) {
          item.layer.setStyle(CONFIG.POLYGON_STYLE.hover);
        }
      };
      const unhighlightItem = () => {
        if (!isItemOverlayed(item) && state.showIndexFrames) {
          item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
        }
      };

      button.addEventListener('mouseenter', highlightItem);
      button.addEventListener('mouseleave', unhighlightItem);
      button.addEventListener('focus', highlightItem);
      button.addEventListener('blur', unhighlightItem);
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
   * 発行年デュアルレンジスライダーの見た目（選択範囲バー・年表示）を更新する
   */
  function updateYearSliderUI() {
    const dict = t();
    const { minBound, maxBound, currentMin, currentMax } = state.yearRange;
    const span = Math.max(1, maxBound - minBound);
    const leftPct = ((currentMin - minBound) / span) * 100;
    const rightPct = ((currentMax - minBound) / span) * 100;

    dom.yearRangeTrack.style.left = `${leftPct}%`;
    dom.yearRangeTrack.style.width = `${Math.max(0, rightPct - leftPct)}%`;
    dom.yearRangeDisplay.textContent = `${currentMin}${dict.yearSuffix} 〜 ${currentMax}${dict.yearSuffix}`;
  }

  /**
   * データ内の最小発行年から現在年（例: 2026年、2030年なら2030年）まで
   * 発行年デュアルレンジスライダーを初期化する
   */
  function initYearSlider() {
    const years = state.allItems
      .map(({ meta }) => Number(meta.publishedYear))
      .filter((year) => !Number.isNaN(year) && year > 0);

    const currentYear = new Date().getFullYear();
    const minBound = years.length > 0 ? Math.min(...years) : currentYear;
    const maxBound = Math.max(years.length > 0 ? Math.max(...years) : currentYear, currentYear);

    state.yearRange = {
      minBound,
      maxBound,
      currentMin: minBound,
      currentMax: maxBound
    };

    dom.yearRangeMin.min = String(minBound);
    dom.yearRangeMin.max = String(maxBound);
    dom.yearRangeMin.value = String(minBound);

    dom.yearRangeMax.min = String(minBound);
    dom.yearRangeMax.max = String(maxBound);
    dom.yearRangeMax.value = String(maxBound);

    updateYearSliderUI();
  }

  /**
   * 発行年デュアルレンジスライダー操作時のクランプおよび即時フィルタリング
   * @param {'min'|'max'} changedSide - 動かした側のつまみ
   */
  function handleYearSliderInput(changedSide) {
    let minVal = Number(dom.yearRangeMin.value);
    let maxVal = Number(dom.yearRangeMax.value);

    if (changedSide === 'min' && minVal > maxVal) {
      minVal = maxVal;
      dom.yearRangeMin.value = String(minVal);
    } else if (changedSide === 'max' && maxVal < minVal) {
      maxVal = minVal;
      dom.yearRangeMax.value = String(maxVal);
    }

    state.yearRange.currentMin = minVal;
    state.yearRange.currentMax = maxVal;
    updateYearSliderUI();
    applyFilters();
  }

  /**
   * 縮尺・シリーズのマルチセレクトチップを生成する
   */
  function renderScaleChips() {
    const scalesSet = new Set();
    state.allItems.forEach(({ meta }) => {
      if (meta.scale) {
        scalesSet.add(meta.scale);
      }
    });

    dom.scaleChips.innerHTML = '';
    const fragment = document.createDocumentFragment();
    [...scalesSet].sort().forEach((scale) => {
      const isSelected = state.selectedScales.has(scale);
      const btn = document.createElement('button');
      btn.type = 'button';
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
   * 第一階層フィルター：地図種別 (map_type) チップを生成する
   */
  function renderMapTypeChips() {
    const dict = t();
    const presentTypes = new Set();
    state.allItems.forEach(({ meta }) => {
      if (meta.mapType) {
        presentTypes.add(meta.mapType);
      }
    });
    if (state.seamlessMeta?.mapType) {
      presentTypes.add(state.seamlessMeta.mapType);
    }

    const orderedKeys = [
      'geological_map_sheet',
      'seamless_geological_map',
      'volcanic_geological_map',
      ...[...presentTypes].filter(
        (k) => !['geological_map_sheet', 'seamless_geological_map', 'volcanic_geological_map'].includes(k)
      )
    ].filter((k) => presentTypes.has(k));

    dom.mapTypeChips.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const options = [['all', dict.mapTypeAll], ...orderedKeys.map((k) => [k, dict.mapTypes[k] || k])];
    options.forEach(([typeKey, label]) => {
      const isSelected = state.selectedMapType === typeKey;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
      btn.textContent = label;
      btn.setAttribute('aria-pressed', String(isSelected));

      btn.addEventListener('click', () => {
        if (state.selectedMapType !== typeKey) {
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
   * 第二階層フィルター：地域・都道府県マルチセレクトチップを生成する
   */
  function renderRegionChips() {
    const regionsSet = new Set();
    state.allItems.forEach(({ meta }) => {
      meta.regionList.forEach((r) => regionsSet.add(r));
    });

    dom.regionChips.innerHTML = '';
    const fragment = document.createDocumentFragment();

    [...regionsSet].sort((a, b) => a.localeCompare(b, state.lang)).forEach((region) => {
      const isSelected = state.selectedRegions.has(region);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
      btn.textContent = region;
      btn.setAttribute('aria-pressed', String(isSelected));

      btn.addEventListener('click', () => {
        if (state.selectedRegions.has(region)) {
          state.selectedRegions.delete(region);
          btn.classList.remove('is-selected');
          btn.setAttribute('aria-pressed', 'false');
        } else {
          state.selectedRegions.add(region);
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
        }
        applyFilters();
      });

      fragment.appendChild(btn);
    });

    dom.regionChips.appendChild(fragment);
  }

  /**
   * 現在の言語の著者一覧からマルチセレクトチップを生成する
   */
  function renderAuthorChips() {
    const authorsSet = new Set();
    state.allItems.forEach(({ meta }) => {
      getLocalizedMeta(meta).authorList.forEach((author) => authorsSet.add(author));
    });

    const sortedAuthors = [...authorsSet].sort((a, b) => a.localeCompare(b, state.lang));
    dom.authorChips.innerHTML = '';

    const fragment = document.createDocumentFragment();
    sortedAuthors.forEach((author) => {
      const isSelected = state.selectedAuthors.has(author);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
      btn.textContent = author;
      btn.setAttribute('aria-pressed', String(isSelected));

      btn.addEventListener('click', () => {
        if (state.selectedAuthors.has(author)) {
          state.selectedAuthors.delete(author);
          btn.classList.remove('is-selected');
          btn.setAttribute('aria-pressed', 'false');
        } else {
          state.selectedAuthors.add(author);
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
        }
        applyFilters();
      });

      fragment.appendChild(btn);
    });

    dom.authorChips.appendChild(fragment);
  }

  /**
   * 発行機関および資料有無（PDF・凡例・原図）のマルチセレクトチップを生成する
   */
  function renderOtherChips() {
    const dict = t();
    const publishers = new Set();
    state.allItems.forEach(({ meta }) => {
      const pub = getLocalizedMeta(meta).publisher;
      if (pub) {
        publishers.add(pub);
      }
    });

    dom.otherChips.innerHTML = '';
    const fragment = document.createDocumentFragment();

    [...publishers].sort((a, b) => a.localeCompare(b, state.lang)).forEach((pub) => {
      const isSelected = state.selectedPublishers.has(pub);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
      btn.textContent = pub;
      btn.setAttribute('aria-pressed', String(isSelected));

      btn.addEventListener('click', () => {
        if (state.selectedPublishers.has(pub)) {
          state.selectedPublishers.delete(pub);
          btn.classList.remove('is-selected');
          btn.setAttribute('aria-pressed', 'false');
        } else {
          state.selectedPublishers.add(pub);
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
        }
        applyFilters();
      });

      fragment.appendChild(btn);
    });

    const resourceFlags = [
      ['pdf', dict.flagPdf],
      ['legend', dict.flagLegend],
      ['original', dict.flagOriginal]
    ];

    resourceFlags.forEach(([flagKey, label]) => {
      const isSelected = state.selectedResourceFlags.has(flagKey);
      const btn = document.createElement('button');
      btn.type = 'button';
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
   * 適用中の詳細フィルター数バッジを更新する
   */
  function updateActiveFilterBadge() {
    const hasYearFilter =
      state.yearRange.currentMin > state.yearRange.minBound ||
      state.yearRange.currentMax < state.yearRange.maxBound;

    const count =
      (hasYearFilter ? 1 : 0) +
      state.selectedScales.size +
      state.selectedRegions.size +
      state.selectedAuthors.size +
      state.selectedPublishers.size +
      state.selectedResourceFlags.size;

    if (count > 0) {
      dom.activeFilterBadge.textContent = String(count);
      dom.activeFilterBadge.hidden = false;
    } else {
      dom.activeFilterBadge.textContent = '0';
      dom.activeFilterBadge.hidden = true;
    }
  }

  /**
   * 詳細フィルターの折りたたみ状態を切り替える
   */
  function toggleFiltersPanel() {
    const willExpand = dom.filterPanelBody.hidden;
    dom.filterPanelBody.hidden = !willExpand;
    dom.toggleFiltersBtn.setAttribute('aria-expanded', String(willExpand));
  }

  /**
   * GeoJSONデータからポリゴンレイヤー群を生成してマップに描画する
   * @param {Object} geojsonData - GeoJSON FeatureCollection
   */
  function renderGeoJsonFeatures(geojsonData) {
    L.geoJSON(geojsonData, {
      style: (feature) => styleByScale(
        feature?.properties?.map?.scale_denominator ?? null,
        feature?.properties?.map?.map_type ?? 'geological_map_sheet'
      ),
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
            layer.setStyle(styleByScale(meta.scaleDenominator, meta.mapType));
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

    // 標準では5万分の1地質図幅(geological_map_sheet + 1:50,000)のみ表示する
    if (state.allItems.some(({ meta }) => meta.mapType === 'geological_map_sheet')) {
      state.selectedMapType = 'geological_map_sheet';
    }
    if (state.allItems.some(({ meta }) => meta.scale === '1:50,000')) {
      state.selectedScales.add('1:50,000');
    }

    renderMapTypeChips();
    initYearSlider();
    renderScaleChips();
    renderRegionChips();
    renderAuthorChips();
    renderOtherChips();
    buildSuggestionPool();
    applyFilters();
    fitAllVisibleItems();
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
      const mapKey = `map:${meta.mapId || `${loc.title}_${meta.scale}_${meta.publishedYear}`}`;
      const metaTags = [meta.scale, meta.publishedYear].filter(Boolean).join(' / ');
      const suffix = metaTags ? ` (${metaTags})` : '';

      if (!seenKeys.has(mapKey)) {
        seenKeys.add(mapKey);
        pool.push({
          type: 'map',
          label: `${loc.title}${suffix}`,
          filterValue: loc.title,
          badge: dict.badgeMap,
          searchText: `${loc.title} ${meta.mapCode} ${meta.scale}`.toLowerCase(),
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
            searchText: `${meta.volcanoNameJa} ${meta.volcanoNameEn}`.toLowerCase(),
            item
          });
        }
      }

      loc.authorList.forEach((author) => {
        const authorKey = `author:${author}`;
        if (!seenKeys.has(authorKey)) {
          seenKeys.add(authorKey);
          pool.push({
            type: 'author',
            label: author,
            filterValue: author,
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

    dom.searchInput.value = suggestion.filterValue || suggestion.label;
    hideSuggestions();
    applyFilters();

    if ((suggestion.type === 'map' || suggestion.type === 'volcano') && suggestion.item) {
      // 現在の詳細フィルタ・種別フィルタで非表示になっていれば自動調整して確実に表示する
      if (!state.filteredItems.includes(suggestion.item)) {
        state.selectedMapType = suggestion.item.meta.mapType || 'all';
        renderMapTypeChips();
        state.selectedScales.clear();
        state.selectedRegions.clear();
        state.selectedAuthors.clear();
        state.selectedPublishers.clear();
        state.selectedResourceFlags.clear();
        state.yearRange.currentMin = state.yearRange.minBound;
        state.yearRange.currentMax = state.yearRange.maxBound;
        dom.yearRangeMin.value = String(state.yearRange.minBound);
        dom.yearRangeMax.value = String(state.yearRange.maxBound);
        updateYearSliderUI();
        renderScaleChips();
        renderRegionChips();
        renderAuthorChips();
        renderOtherChips();
        applyFilters();
      }
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
      const badgeClass = entry.type === 'map'
        ? 'is-map'
        : (entry.type === 'volcano' ? 'is-volcano' : 'is-author');
      badgeSpan.className = `suggestion-badge ${badgeClass}`;
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
  /**
   * 図郭インデックス枠の表示/非表示を切り替える
   */
  function toggleIndexFrames() {
    state.showIndexFrames = dom.showIndexToggle.checked;
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
   * 検索文字列・地図範囲・発行年レンジ・縮尺・著者・その他に基づき即時フィルタリングする
   */
  function applyFilters() {
    const query = dom.searchInput.value.trim().toLowerCase();
    const { minBound, maxBound, currentMin, currentMax } = state.yearRange;
    const hasMapTypeFilter = state.selectedMapType !== 'all';
    const hasYearFilter = currentMin > minBound || currentMax < maxBound;
    const hasScaleFilter = state.selectedScales.size > 0;
    const hasRegionFilter = state.selectedRegions.size > 0;
    const hasAuthorFilter = state.selectedAuthors.size > 0;
    const hasPublisherFilter = state.selectedPublishers.size > 0;
    const hasFlagFilter = state.selectedResourceFlags.size > 0;
    const viewBounds = state.viewportOnly && state.map ? state.map.getBounds() : null;
    const nextFiltered = [];

    state.allItems.forEach((item) => {
      const { layer, meta } = item;
      const loc = getLocalizedMeta(meta);
      const year = Number(meta.publishedYear);
      const hasValidYear = meta.publishedYear !== null && !Number.isNaN(year);

      const matchesMapType = !hasMapTypeFilter || meta.mapType === state.selectedMapType;
      const matchesText = !query || loc.searchTokens.includes(query);
      const matchesYear = !hasYearFilter || (hasValidYear && year >= currentMin && year <= currentMax);
      const matchesScale = !hasScaleFilter || state.selectedScales.has(meta.scale);
      const matchesRegion = !hasRegionFilter || meta.regionList.some((r) => state.selectedRegions.has(r));
      const matchesAuthor = !hasAuthorFilter || loc.authorList.some((a) => state.selectedAuthors.has(a));
      const matchesPublisher = !hasPublisherFilter || state.selectedPublishers.has(loc.publisher);
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
        matchesRegion &&
        matchesAuthor &&
        matchesPublisher &&
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
    dom.viewportOnlyToggle.checked = false;

    state.yearRange.currentMin = state.yearRange.minBound;
    state.yearRange.currentMax = state.yearRange.maxBound;
    dom.yearRangeMin.value = String(state.yearRange.minBound);
    dom.yearRangeMax.value = String(state.yearRange.maxBound);
    updateYearSliderUI();

    state.selectedScales.clear();
    state.selectedRegions.clear();
    state.selectedAuthors.clear();
    state.selectedPublishers.clear();
    state.selectedResourceFlags.clear();
    dom.filterPanelBody.querySelectorAll('.decade-chip.is-selected').forEach((chip) => {
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

    if (state.seamlessLayer && typeof state.seamlessLayer.setOpacity === 'function') {
      state.seamlessLayer.setOpacity(state.overlayOpacity);
    }

    state.activeOverlays.forEach((entry) => {
      entry.opacity = state.overlayOpacity;
      if (entry.layer && typeof entry.layer.setOpacity === 'function') {
        entry.layer.setOpacity(state.overlayOpacity);
      }
    });

    renderActiveOverlayList();
  }

  /**
   * ヘルプモーダル内のショートカット一覧を描画する
   */
  function renderShortcutModal() {
    const dict = t();
    dom.shortcutModalTitle.textContent = dict.shortcutModalTitle;
    dom.shortcutList.innerHTML = '';

    const fragment = document.createDocumentFragment();
    dict.shortcuts.forEach(([keys, desc]) => {
      const row = document.createElement('div');
      row.className = 'shortcut-row';

      const dt = document.createElement('dt');
      dt.className = 'shortcut-desc';
      dt.textContent = desc;

      const dd = document.createElement('dd');
      dd.className = 'shortcut-keys';
      keys.forEach((k) => {
        const kbd = document.createElement('kbd');
        kbd.className = 'shortcut-kbd';
        kbd.textContent = k;
        dd.appendChild(kbd);
      });

      row.append(dt, dd);
      fragment.appendChild(row);
    });

    dom.shortcutList.appendChild(fragment);
  }

  /**
   * ショートカットヘルプモーダルを開く
   */
  function openShortcutModal() {
    state.lastFocusedBeforeModal = document.activeElement;
    renderShortcutModal();
    dom.shortcutModal.hidden = false;
    dom.closeShortcutModal.focus();
  }

  /**
   * ショートカットヘルプモーダルを閉じる
   */
  function closeShortcutModal() {
    if (dom.shortcutModal.hidden) {
      return;
    }
    dom.shortcutModal.hidden = true;
    if (state.lastFocusedBeforeModal && typeof state.lastFocusedBeforeModal.focus === 'function') {
      state.lastFocusedBeforeModal.focus();
    }
    state.lastFocusedBeforeModal = null;
  }

  /**
   * ショートカットヘルプモーダルを開閉する
   */
  function toggleShortcutModal() {
    if (dom.shortcutModal.hidden) {
      openShortcutModal();
    } else {
      closeShortcutModal();
    }
  }

  /**
   * 該当図幅一覧（#result-list）内の矢印キー上下移動を処理する
   * @param {KeyboardEvent} event - キーダウンイベント
   */
  function handleResultListKeydown(event) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }
    const items = [...dom.resultList.querySelectorAll('.result-list-item')];
    if (items.length === 0) {
      return;
    }
    const currentIndex = items.indexOf(document.activeElement);
    if (currentIndex === -1) {
      return;
    }

    event.preventDefault();
    const nextIndex = event.key === 'ArrowDown'
      ? Math.min(items.length - 1, currentIndex + 1)
      : Math.max(0, currentIndex - 1);

    const target = items[nextIndex];
    target.focus();
    target.scrollIntoView({ block: 'nearest' });
  }

  /**
   * テーマ（light / dark）を適用し、アイコンと localStorage を更新する
   * @param {'light'|'dark'} theme
   */
  function applyTheme(theme) {
    state.theme = theme === 'dark' ? 'dark' : 'light';
    if (state.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    const isDark = state.theme === 'dark';
    dom.themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    dom.themeToggleBtn.innerHTML = isDark
      ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }

  /**
   * ダークモード / ライトモードを切り替えて保存する
   */
  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      localStorage.setItem('geomap_theme', nextTheme);
    } catch {
      // ignore storage errors
    }
  }

  /**
   * 保存済み設定またはOS設定から初期テーマを適用する
   */
  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem('geomap_theme');
    } catch {
      saved = null;
    }
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  /**
   * グローバルキーボードショートカットを処理する
   * @param {KeyboardEvent} event - キーダウンイベント
   */
  function handleGlobalKeydown(event) {
    const activeEl = document.activeElement;
    const isInputFocused = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl?.tagName);
    const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

    if (event.key === 'Escape') {
      if (!dom.shortcutModal.hidden) {
        event.preventDefault();
        closeShortcutModal();
        return;
      }
      if (isInputFocused) {
        activeEl.blur();
        hideSuggestions();
        return;
      }
      if (activeEl?.classList?.contains('result-list-item') || activeEl === dom.mapEl) {
        activeEl.blur();
      }
      return;
    }

    if ((event.key === '/' && !isInputFocused && !hasModifier) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      if (!dom.shortcutModal.hidden) {
        closeShortcutModal();
      }
      dom.searchInput.focus();
      dom.searchInput.select();
      return;
    }

    if (isInputFocused || hasModifier) {
      return;
    }

    if (event.key === '?') {
      event.preventDefault();
      toggleShortcutModal();
      return;
    }

    if (!dom.shortcutModal.hidden) {
      return;
    }

    const lowerKey = event.key.toLowerCase();

    if (lowerKey === 'm') {
      event.preventDefault();
      dom.mapEl?.focus();
    } else if (lowerKey === 'l') {
      event.preventDefault();
      const targetItem = dom.resultList.querySelector('.result-list-item.is-selected')
        || dom.resultList.querySelector('.result-list-item');
      if (targetItem) {
        targetItem.focus();
        targetItem.scrollIntoView({ block: 'nearest' });
      }
    } else if (lowerKey === 'f') {
      event.preventDefault();
      fitAllVisibleItems();
    } else if (lowerKey === 'i') {
      event.preventDefault();
      dom.showIndexToggle.checked = !dom.showIndexToggle.checked;
      toggleIndexFrames();
    } else if (lowerKey === 's') {
      event.preventDefault();
      dom.seamless200kToggle.checked = !dom.seamless200kToggle.checked;
      toggleSeamless200k();
    } else if (lowerKey === 'b') {
      event.preventDefault();
      const order = ['pale', 'std', 'photo'];
      const nextKey = order[(order.indexOf(state.activeBasemapKey) + 1) % order.length];
      switchBasemap(nextKey);
    } else if (event.key === '[' || event.key === ']') {
      event.preventDefault();
      const current = Number(dom.wmsOpacitySlider.value);
      const next = Math.max(0, Math.min(100, current + (event.key === ']' ? 10 : -10)));
      dom.wmsOpacitySlider.value = String(next);
      handleOpacityChange();
    } else if (lowerKey === 'x') {
      event.preventDefault();
      clearAllOverlays();
    } else if (lowerKey === 'd') {
      event.preventDefault();
      toggleTheme();
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
    dom.mapTypeLabel.textContent = dict.mapTypeLabel;
    dom.viewportOnlyLabel.textContent = dict.viewportOnlyLabel;
    dom.showIndexLabel.textContent = dict.showIndexLabel;
    dom.seamless200kLabel.textContent = dict.seamless200kLabel;
    dom.filterAccordionLabel.textContent = dict.filterAccordionLabel;
    dom.decadeLabel.textContent = dict.decadeLabel;
    dom.scaleFilterLabel.textContent = dict.scaleFilterLabel;
    dom.regionFilterLabel.textContent = dict.regionFilterLabel;
    dom.authorFilterLabel.textContent = dict.authorFilterLabel;
    dom.otherFilterLabel.textContent = dict.otherFilterLabel;
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
    state.selectedAuthors.clear();
    state.selectedPublishers.clear();
    renderMapTypeChips();
    updateYearSliderUI();
    renderScaleChips();
    renderRegionChips();
    renderAuthorChips();
    renderOtherChips();
    buildSuggestionPool();
    applyFilters();
    renderActiveOverlayList();
    if (state.dominantLegendItem) {
      renderLegendPanel(state.dominantLegendItem, true);
    }
    if (!dom.shortcutModal.hidden) {
      renderShortcutModal();
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

    dom.resultList.addEventListener('keydown', handleResultListKeydown);

    dom.themeToggleBtn.addEventListener('click', toggleTheme);
    dom.shortcutHelpBtn.addEventListener('click', openShortcutModal);
    dom.closeShortcutModal.addEventListener('click', closeShortcutModal);
    dom.shortcutModal.addEventListener('click', (event) => {
      if (event.target === dom.shortcutModal) {
        closeShortcutModal();
      }
    });

    dom.viewportOnlyToggle.addEventListener('change', () => {
      state.viewportOnly = dom.viewportOnlyToggle.checked;
      applyFilters();
    });
    dom.showIndexToggle.addEventListener('change', toggleIndexFrames);
    dom.seamless200kToggle.addEventListener('change', toggleSeamless200k);

    dom.yearRangeMin.addEventListener('input', () => handleYearSliderInput('min'));
    dom.yearRangeMax.addEventListener('input', () => handleYearSliderInput('max'));

    dom.toggleFiltersBtn.addEventListener('click', toggleFiltersPanel);
    dom.resetFiltersBtn.addEventListener('click', () => {
      hideSuggestions();
      resetFilters();
    });
    dom.fitAllBtn.addEventListener('click', fitAllVisibleItems);
    dom.clearWmsBtn.addEventListener('click', clearAllOverlays);
    dom.wmsOpacitySlider.addEventListener('input', handleOpacityChange);

    dom.legendZoomWrapper.addEventListener('mouseenter', updateLegendLoupe);
    dom.legendZoomWrapper.addEventListener('mousemove', updateLegendLoupe);
    dom.legendZoomWrapper.addEventListener('mouseleave', hideLegendLoupe);

    dom.tabLegendBtn.addEventListener('click', () => switchVisualMode('legend'));
    dom.tabSectionBtn.addEventListener('click', () => switchVisualMode('section'));

    dom.basemapButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchBasemap(btn.dataset.basemap));
    });

    dom.langButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

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
      const response = await fetch(CONFIG.SEAMLESS_PROVIDER_URL);
      if (!response.ok) {
        return;
      }
      const records = await response.json();
      if (Array.isArray(records) && records.length > 0) {
        state.seamlessMeta = normalizeProperties(records[0]);
      }
    } catch (error) {
      console.warn('Seamless 200k provider config load skipped:', error);
    }
  }

  /**
   * アプリケーションのエントリポイント
   */
  async function init() {
    initTheme();
    switchMobileView('map');
    state.map = initMap();
    initEventListeners();
    loadSeamlessProvider();

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
