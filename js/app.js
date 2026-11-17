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
   * アプリケーション状態
   */
  const state = {
    map: null,
    activeBaseLayer: null,
    indexLayerGroup: null,
    allItems: [],
    filteredItems: [],
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
    floatingPanel: document.getElementById('floating-panel'),
    fitAllBtn: document.getElementById('fit-all-btn'),
    togglePanelBtn: document.getElementById('toggle-panel-btn'),
    searchInput: document.getElementById('search-input'),
    searchSuggestions: document.getElementById('search-suggestions'),
    yearMinInput: document.getElementById('year-min'),
    yearMaxInput: document.getElementById('year-max'),
    resetFiltersBtn: document.getElementById('reset-filters'),
    basemapButtons: document.querySelectorAll('.segmented-btn[data-basemap]'),
    resultCount: document.getElementById('result-count'),
    activeWmsBar: document.getElementById('active-wms-bar'),
    wmsStatusDot: document.getElementById('wms-status-dot'),
    activeWmsName: document.getElementById('active-wms-name'),
    activeOverlayList: document.getElementById('active-overlay-list'),
    clearWmsBtn: document.getElementById('clear-wms-btn'),
    wmsOpacitySlider: document.getElementById('wms-opacity'),
    wmsOpacityValue: document.getElementById('wms-opacity-value'),
    legendPanel: document.getElementById('legend-panel'),
    legendMapName: document.getElementById('legend-map-name'),
    toggleLegendBtn: document.getElementById('toggle-legend-btn'),
    legendOpenLink: document.getElementById('legend-open-link'),
    legendBody: document.getElementById('legend-body'),
    legendImage: document.getElementById('legend-image'),
    resultListSection: document.getElementById('result-list-section'),
    toggleListBtn: document.getElementById('toggle-list-btn'),
    resultList: document.getElementById('result-list'),
    statusMessage: document.getElementById('status-message')
  };

  /**
   * HTML特殊文字をエスケープする
   * @param {string|number|null|undefined} value - エスケープ対象の値
   * @returns {string} エスケープ済み文字列
   */
  function escapeHtml(value) {
    if (value === null || value === undefined) {
      return '';
    }
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

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
    const mapNameEn = props.map_name_ja || props.map_name ? (props.map_name_en || '') : '';
    const authorsJa = Array.isArray(props.authors_ja)
      ? props.authors_ja.join('・')
      : (props.authors || (Array.isArray(props.authors_en) ? props.authors_en.join(', ') : ''));
    const authorsEn = Array.isArray(props.authors_en)
      ? props.authors_en.join(', ')
      : '';

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

    const searchTokens = [
      mapNameJa,
      mapNameEn,
      authorsJa,
      authorsEn,
      mapCode,
      prefectures
    ].join(' ').toLowerCase();

    const authorList = [];
    if (Array.isArray(props.authors_ja)) {
      authorList.push(...props.authors_ja);
    } else if (typeof props.authors === 'string' && props.authors.trim()) {
      authorList.push(...props.authors.split(/[・,、]/));
    }
    if (Array.isArray(props.authors_en)) {
      authorList.push(...props.authors_en);
    }
    const cleanAuthorList = [...new Set(authorList.map((a) => String(a).trim()).filter(Boolean))];

    return {
      mapId,
      mapCode,
      mapNameJa,
      mapNameEn,
      authorsJa: authorsJa || '不明',
      authorsEn,
      authorList: cleanAuthorList,
      publishedYear: props.published_year ?? null,
      publisher: props.publisher_ja || props.publisher_en || '',
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
      searchTokens
    };
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
    dom.resultCount.textContent = `${visibleCount} / ${totalCount} 件`;
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

    // 地図移動・ズーム完了時に画面内で最も広く表示されている図幅の凡例を更新
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
   * ポップアップ用のHTMLコンテンツを生成する
   * @param {Object} meta - normalizeProperties() の返却オブジェクト
   * @returns {string} ポップアップHTML文字列
   */
  function buildPopupContent(meta) {
    const title = escapeHtml(meta.mapNameJa);
    const subtitle = meta.mapNameEn
      ? `<p class="map-popup-subtitle">${escapeHtml(meta.mapNameEn)}</p>`
      : '';
    const publishedYear = meta.publishedYear != null
      ? `${escapeHtml(meta.publishedYear)}年`
      : '不明';

    const rows = [
      `<dt>発行年</dt><dd>${publishedYear}</dd>`,
      `<dt>著者</dt><dd>${escapeHtml(meta.authorsJa)}</dd>`
    ];

    if (meta.publisher) {
      rows.push(`<dt>発行</dt><dd>${escapeHtml(meta.publisher)}</dd>`);
    }
    if (meta.prefectures) {
      rows.push(`<dt>地域</dt><dd>${escapeHtml(meta.prefectures)}</dd>`);
    }

    const links = [];
    if (meta.detailUrl) {
      links.push(`<a class="map-popup-link" href="${escapeHtml(meta.detailUrl)}" target="_blank" rel="noopener noreferrer">詳細情報</a>`);
    }
    if (meta.pdfUrl) {
      links.push(`<a class="map-popup-link" href="${escapeHtml(meta.pdfUrl)}" target="_blank" rel="noopener noreferrer">説明書PDF</a>`);
    }
    if (meta.originalImageUrl) {
      links.push(`<a class="map-popup-link" href="${escapeHtml(meta.originalImageUrl)}" target="_blank" rel="noopener noreferrer">原図JPG</a>`);
    }

    const linksHtml = links.length > 0
      ? `<div class="map-popup-links">${links.join('')}</div>`
      : '';

    return `
      <div class="map-popup">
        <h2 class="map-popup-title">${title}</h2>
        ${subtitle}
        <dl class="map-popup-meta">
          ${rows.join('')}
        </dl>
        ${linksHtml}
      </div>
    `;
  }

  /**
   * ホバーツールチップ用のテキストを生成する
   * @param {Object} meta - normalizeProperties() の返却オブジェクト
   * @returns {string} ツールチップ文字列
   */
  function buildTooltipText(meta) {
    const yearSuffix = meta.publishedYear != null ? ` (${meta.publishedYear})` : '';
    return `${meta.mapNameJa}${yearSuffix}`;
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
   * 右手フローティング凡例パネルの表示内容を更新する
   * @param {Object|null} item - 表示対象の図幅アイテム（nullで非表示）
   */
  function renderLegendPanel(item) {
    if (!item || !item.meta.legendImageUrl) {
      state.dominantLegendItem = null;
      dom.legendPanel.hidden = true;
      dom.legendMapName.textContent = '';
      dom.legendImage.removeAttribute('src');
      dom.legendOpenLink.href = '#';
      return;
    }

    if (state.dominantLegendItem === item && !dom.legendPanel.hidden) {
      return;
    }

    state.dominantLegendItem = item;
    dom.legendMapName.textContent = item.meta.mapNameJa;
    dom.legendImage.src = item.meta.legendImageUrl;
    dom.legendImage.alt = `${item.meta.mapNameJa} 凡例`;
    dom.legendOpenLink.href = item.meta.legendImageUrl;
    dom.legendPanel.hidden = false;
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
   * 現在オーバーレイ表示されている地質図の中で最も広く表示されているものを特定し、右手の凡例パネルを更新する
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
      if (!item.meta.legendImageUrl) {
        return;
      }
      const itemBounds = getItemBounds(item);
      const area = computeIntersectionArea(viewBounds, itemBounds);
      if (area > maxArea) {
        maxArea = area;
        bestItem = item;
      }
    });

    renderLegendPanel(bestItem);
  }

  /**
   * 左パネルの「表示中の地質図（最大4件）」リストを描画する
   */
  function renderActiveOverlayList() {
    dom.activeOverlayList.innerHTML = '';

    if (state.activeOverlays.length === 0) {
      dom.activeWmsBar.hidden = true;
      dom.activeWmsName.textContent = '';
      return;
    }

    dom.activeWmsBar.hidden = false;
    dom.activeWmsName.textContent = `表示中の地質図 (${state.activeOverlays.length}/${CONFIG.MAX_OVERLAYS})`;

    const fragment = document.createDocumentFragment();

    state.activeOverlays.forEach(({ item }) => {
      const li = document.createElement('li');
      li.className = 'active-overlay-item';

      const label = document.createElement('span');
      label.className = 'active-overlay-label';
      label.textContent = item.meta.mapNameJa;
      label.title = `${item.meta.mapNameJa} にズーム`;
      label.addEventListener('click', () => zoomToMapItem(item));

      const btns = document.createElement('div');
      btns.className = 'active-overlay-btns';

      const zoomBtn = document.createElement('button');
      zoomBtn.type = 'button';
      zoomBtn.className = 'icon-button';
      zoomBtn.title = 'この図幅にズーム';
      zoomBtn.setAttribute('aria-label', `${item.meta.mapNameJa} にズーム`);
      zoomBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
      zoomBtn.addEventListener('click', () => zoomToMapItem(item));

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'icon-button';
      removeBtn.title = 'この地質図を閉じる';
      removeBtn.setAttribute('aria-label', `${item.meta.mapNameJa} を閉じる`);
      removeBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      removeBtn.addEventListener('click', () => removeOverlayByItem(item));

      btns.append(zoomBtn, removeBtn);
      li.append(label, btns);
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
          minZoom: meta.zoomMin,
          maxZoom: meta.zoomMax
        })
      : L.tileLayer.wms(meta.overlayUrl, {
          ...CONFIG.WMS_OPTIONS,
          ...commonOptions
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
   * 図幅アイテムを選択し、ポップアップ表示・タイルオーバーレイ（最大4件）・強調スタイルを適用する
   * @param {Object} item - { layer, meta } オブジェクト
   * @param {L.LatLng} [latlng] - ポップアップ表示座標（省略時はポリゴン中心）
   */
  function selectMapItem(item, latlng) {
    const { layer, meta } = item;

    // A. クリック地点（または図郭中心）にポップアップを表示
    const popupLatLng = latlng || layer.getBounds().getCenter();
    L.popup({ maxWidth: 300 })
      .setLatLng(popupLatLng)
      .setContent(buildPopupContent(meta))
      .openOn(state.map);

    // B. タイル/WMSレイヤーを追加（最大4つまで同時比較可能）
    addOverlayForItem(item);
  }

  /**
   * 選択中の図幅の範囲（bounds優先）へマップをズームする
   * @param {Object} item - { layer, meta } オブジェクト
   */
  function zoomToMapItem(item) {
    if (!item) {
      return;
    }

    let bounds = null;
    if (item.meta.bounds) {
      const [west, south, east, north] = item.meta.bounds;
      bounds = L.latLngBounds([[south, west], [north, east]]);
    } else if (item.layer.getBounds) {
      bounds = item.layer.getBounds();
    }

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
   * 絞り込み結果リストを描画する（展開時のみDOM構築）
   */
  function renderResultList() {
    if (dom.resultList.hidden) {
      return;
    }

    dom.resultList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const displayItems = state.filteredItems.slice(0, CONFIG.MAX_LIST_ITEMS);

    displayItems.forEach((item) => {
      const { meta } = item;
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
      nameSpan.textContent = meta.mapNameJa;

      const authorSpan = document.createElement('span');
      authorSpan.className = 'result-item-author';
      authorSpan.textContent = meta.authorsJa;

      mainSpan.append(nameSpan, authorSpan);

      const yearSpan = document.createElement('span');
      yearSpan.className = 'result-item-year';
      yearSpan.textContent = meta.publishedYear != null ? `${meta.publishedYear}` : '';

      button.append(mainSpan, yearSpan);
      button.addEventListener('click', () => {
        zoomToMapItem(item);
        selectMapItem(item);
      });

      li.appendChild(button);
      fragment.appendChild(li);
    });

    if (state.filteredItems.length > CONFIG.MAX_LIST_ITEMS) {
      const noteLi = document.createElement('li');
      noteLi.className = 'result-list-note';
      noteLi.textContent = `ほか ${state.filteredItems.length - CONFIG.MAX_LIST_ITEMS} 件（検索で絞り込めます）`;
      fragment.appendChild(noteLi);
    } else if (state.filteredItems.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'result-list-note';
      emptyLi.textContent = '条件に一致する図幅がありません';
      fragment.appendChild(emptyLi);
    }

    dom.resultList.appendChild(fragment);
  }

  /**
   * GeoJSONデータからポリゴンレイヤー群を生成してマップに描画する
   * @param {Object} geojsonData - GeoJSON FeatureCollection
   */
  function renderGeoJsonFeatures(geojsonData) {
    const years = [];

    const geoJsonLayer = L.geoJSON(geojsonData, {
      style: () => CONFIG.POLYGON_STYLE.default,
      onEachFeature: (feature, layer) => {
        const meta = normalizeProperties(feature.properties);
        const item = { layer, meta };

        if (typeof meta.publishedYear === 'number' && !Number.isNaN(meta.publishedYear)) {
          years.push(meta.publishedYear);
        }

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

        // クリック時のイベント登録
        layer.on('click', (event) => {
          selectMapItem(item, event.latlng);
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

    // 発行年入力のプレースホルダーにデータの最小・最大年を反映
    if (years.length > 0) {
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      dom.yearMinInput.min = minYear;
      dom.yearMaxInput.max = maxYear;
      dom.yearMinInput.placeholder = `${minYear}`;
      dom.yearMaxInput.placeholder = `${maxYear}`;
    }

    dom.resultListSection.hidden = state.allItems.length === 0;
    updateResultCount(state.allItems.length, state.allItems.length);
    buildSuggestionPool();
    updateDominantLegend();
  }

  /**
   * 図幅名および著者名のサジェスト候補プールを構築する
   */
  function buildSuggestionPool() {
    const pool = [];
    const seenKeys = new Set();

    state.allItems.forEach((item) => {
      const { meta } = item;
      const mapKey = `map:${meta.mapNameJa}`;
      if (!seenKeys.has(mapKey)) {
        seenKeys.add(mapKey);
        pool.push({
          type: 'map',
          label: meta.mapNameJa,
          badge: '図幅',
          searchText: `${meta.mapNameJa} ${meta.mapNameEn} ${meta.mapCode}`.toLowerCase(),
          item
        });
      }

      meta.authorList.forEach((author) => {
        const authorKey = `author:${author}`;
        if (!seenKeys.has(authorKey)) {
          seenKeys.add(authorKey);
          pool.push({
            type: 'author',
            label: author,
            badge: '著者',
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
      selectMapItem(suggestion.item);
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
   * 検索文字列と発行年範囲に基づき、図郭ポリゴンを即時フィルタリングする
   */
  function applyFilters() {
    const query = dom.searchInput.value.trim().toLowerCase();
    const minYearRaw = dom.yearMinInput.value.trim();
    const maxYearRaw = dom.yearMaxInput.value.trim();
    const minYear = minYearRaw !== '' ? Number(minYearRaw) : null;
    const maxYear = maxYearRaw !== '' ? Number(maxYearRaw) : null;

    const nextFiltered = [];

    state.allItems.forEach((item) => {
      const { layer, meta } = item;
      const year = Number(meta.publishedYear);

      // テキスト一致判定（図幅名・著者名・図幅コード・地域）
      const matchesText = !query || meta.searchTokens.includes(query);

      // 発行年範囲判定
      const hasValidYear = meta.publishedYear !== null && !Number.isNaN(year);
      const matchesMinYear = minYear === null || (hasValidYear && year >= minYear);
      const matchesMaxYear = maxYear === null || (hasValidYear && year <= maxYear);

      const isVisible = matchesText && matchesMinYear && matchesMaxYear;

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
    updateDominantLegend();
  }

  /**
   * フィルタ条件をすべてリセットして再描画する
   */
  function resetFilters() {
    dom.searchInput.value = '';
    dom.yearMinInput.value = '';
    dom.yearMaxInput.value = '';
    applyFilters();
  }

  /**
   * パネル全体の折りたたみ状態を切り替える
   */
  function togglePanel() {
    const isCollapsed = dom.floatingPanel.classList.toggle('is-collapsed');
    dom.togglePanelBtn.setAttribute('aria-expanded', String(!isCollapsed));
    dom.togglePanelBtn.title = isCollapsed ? 'パネルを展開する' : 'パネルを折りたたむ';
  }

  /**
   * 該当図幅リストの開閉を切り替える
   */
  function toggleResultList() {
    const willExpand = dom.resultList.hidden;
    dom.resultList.hidden = !willExpand;
    dom.toggleListBtn.setAttribute('aria-expanded', String(willExpand));
    dom.toggleListBtn.querySelector('span').textContent = willExpand
      ? '該当図幅一覧を隠す'
      : '該当図幅一覧を表示';

    if (willExpand) {
      renderResultList();
    }
  }

  /**
   * 凡例パネル全体の折りたたみ状態を切り替える
   */
  function toggleLegend() {
    const isCollapsed = dom.legendPanel.classList.toggle('is-collapsed');
    dom.toggleLegendBtn.setAttribute('aria-expanded', String(!isCollapsed));
    dom.toggleLegendBtn.title = isCollapsed ? '凡例を展開する' : '凡例を折りたたむ';
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
   * キーボードショートカットを処理する（`/` または `Ctrl+K` で検索フォーカス、`Esc` でポップアップ閉じ）
   * @param {KeyboardEvent} event - キーダウンイベント
   */
  function handleGlobalKeydown(event) {
    const isInputFocused = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

    if ((event.key === '/' && !isInputFocused) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      if (dom.floatingPanel.classList.contains('is-collapsed')) {
        togglePanel();
      }
      dom.searchInput.focus();
      dom.searchInput.select();
      return;
    }

    if (event.key === 'Escape') {
      if (isInputFocused) {
        document.activeElement.blur();
      } else if (state.map) {
        state.map.closePopup();
      }
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

    dom.yearMinInput.addEventListener('input', applyFilters);
    dom.yearMaxInput.addEventListener('input', applyFilters);
    dom.resetFiltersBtn.addEventListener('click', () => {
      hideSuggestions();
      resetFilters();
    });
    dom.fitAllBtn.addEventListener('click', fitAllVisibleItems);
    dom.togglePanelBtn.addEventListener('click', togglePanel);
    dom.toggleListBtn.addEventListener('click', toggleResultList);
    dom.toggleLegendBtn.addEventListener('click', toggleLegend);
    dom.clearWmsBtn.addEventListener('click', clearAllOverlays);
    dom.wmsOpacitySlider.addEventListener('input', handleOpacityChange);

    dom.basemapButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchBasemap(btn.dataset.basemap));
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
