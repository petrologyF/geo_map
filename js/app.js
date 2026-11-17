(() => {
  'use strict';

  /**
   * アプリケーション設定定数
   */
  const CONFIG = {
    GEOJSON_URL: 'data/map_index.geojson',
    GSI_PALE_TILE_URL: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    GSI_ATTRIBUTION: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>',
    GSJ_ATTRIBUTION: '産業技術総合研究所 地質調査総合センター',
    INITIAL_CENTER: [36.2048, 138.2529],
    INITIAL_ZOOM: 5,
    MIN_ZOOM: 2,
    MAX_ZOOM: 18,
    MAX_LIST_ITEMS: 100,
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
    indexLayerGroup: null,
    allItems: [],
    filteredItems: [],
    activeOverlayLayer: null,
    selectedItem: null,
    overlayOpacity: CONFIG.DEFAULT_OVERLAY_OPACITY
  };

  /**
   * DOM要素のキャッシュ
   */
  const dom = {
    floatingPanel: document.getElementById('floating-panel'),
    togglePanelBtn: document.getElementById('toggle-panel-btn'),
    searchInput: document.getElementById('search-input'),
    yearMinInput: document.getElementById('year-min'),
    yearMaxInput: document.getElementById('year-max'),
    resetFiltersBtn: document.getElementById('reset-filters'),
    resultCount: document.getElementById('result-count'),
    activeWmsBar: document.getElementById('active-wms-bar'),
    wmsStatusDot: document.getElementById('wms-status-dot'),
    activeWmsName: document.getElementById('active-wms-name'),
    zoomWmsBtn: document.getElementById('zoom-wms-btn'),
    clearWmsBtn: document.getElementById('clear-wms-btn'),
    wmsOpacitySlider: document.getElementById('wms-opacity'),
    wmsOpacityValue: document.getElementById('wms-opacity-value'),
    legendSection: document.getElementById('legend-section'),
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

    const searchTokens = [
      mapNameJa,
      mapNameEn,
      authorsJa,
      authorsEn,
      mapCode,
      prefectures
    ].join(' ').toLowerCase();

    return {
      mapId: props.map_id ?? null,
      mapCode,
      mapNameJa,
      mapNameEn,
      authorsJa: authorsJa || '不明',
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
      catalogUrl: isSafeUrl(props.related_resources?.catalog_url) ? props.related_resources.catalog_url : '',
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

    // 地理院地図（淡色地図）をベースマップとして追加
    L.tileLayer(CONFIG.GSI_PALE_TILE_URL, {
      attribution: CONFIG.GSI_ATTRIBUTION,
      maxZoom: CONFIG.MAX_ZOOM
    }).addTo(map);

    // ズームコントロールを画面右下に配置
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // メートル法のスケールバーを画面左下に配置
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // 図郭ポリゴン管理用のレイヤーグループを追加
    state.indexLayerGroup = L.layerGroup().addTo(map);

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
    if (meta.catalogUrl) {
      links.push(`<a class="map-popup-link" href="${escapeHtml(meta.catalogUrl)}" target="_blank" rel="noopener noreferrer">詳細情報</a>`);
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
   * 凡例プレビューセクションを更新する
   * @param {string} legendUrl - 凡例画像のURL
   * @param {string} mapName - 代替テキスト用の図幅名
   */
  function updateLegendDisplay(legendUrl, mapName) {
    if (!legendUrl) {
      dom.legendSection.hidden = true;
      dom.legendImage.removeAttribute('src');
      dom.legendOpenLink.href = '#';
      return;
    }

    dom.legendImage.src = legendUrl;
    dom.legendImage.alt = `${mapName} 凡例`;
    dom.legendOpenLink.href = legendUrl;
    dom.legendSection.hidden = false;
  }

  /**
   * 選択中の地質図オーバーレイおよびポリゴン強調を解除する
   */
  function clearActiveOverlayLayer() {
    if (state.activeOverlayLayer && state.map) {
      state.map.removeLayer(state.activeOverlayLayer);
      state.activeOverlayLayer = null;
    }
    if (state.selectedItem) {
      state.selectedItem.layer.setStyle(CONFIG.POLYGON_STYLE.default);
      state.selectedItem = null;
    }
    dom.wmsStatusDot.classList.remove('is-loading');
    dom.activeWmsBar.hidden = true;
    dom.activeWmsName.textContent = '';
    updateLegendDisplay('', '');
    syncSelectedListItem();
  }

  /**
   * XYZタイル（優先）またはWMSで地質図オーバーレイレイヤーを追加する
   * @param {Object} meta - normalizeProperties() の返却オブジェクト
   */
  function updateOverlayLayer(meta) {
    if (state.activeOverlayLayer && state.map) {
      state.map.removeLayer(state.activeOverlayLayer);
      state.activeOverlayLayer = null;
    }

    if (!meta.overlayType || !meta.overlayUrl) {
      dom.activeWmsBar.hidden = true;
      updateLegendDisplay(meta.legendImageUrl, meta.mapNameJa);
      setStatusMessage('この図幅には利用可能なタイルURLまたはWMS URLがありません。');
      return;
    }

    setStatusMessage('');

    const layer = meta.overlayType === 'xyz'
      ? L.tileLayer(meta.overlayUrl, {
          minZoom: meta.zoomMin,
          maxZoom: meta.zoomMax,
          opacity: state.overlayOpacity,
          attribution: meta.attribution
        })
      : L.tileLayer.wms(meta.overlayUrl, {
          ...CONFIG.WMS_OPTIONS,
          opacity: state.overlayOpacity,
          attribution: meta.attribution
        });

    layer.on('loading', () => {
      dom.wmsStatusDot.classList.add('is-loading');
    });

    layer.on('load', () => {
      dom.wmsStatusDot.classList.remove('is-loading');
    });

    layer.on('tileerror', () => {
      dom.wmsStatusDot.classList.remove('is-loading');
      setStatusMessage(`「${meta.mapNameJa}」の地質図タイル取得中にエラーが発生しました。`);
    });

    state.activeOverlayLayer = layer.addTo(state.map);
    dom.activeWmsName.textContent = `表示中: ${meta.mapNameJa}`;
    dom.activeWmsBar.hidden = false;
    updateLegendDisplay(meta.legendImageUrl, meta.mapNameJa);
  }

  /**
   * 図幅アイテムを選択し、ポップアップ表示・タイルオーバーレイ・強調スタイルを適用する
   * @param {Object} item - { layer, meta } オブジェクト
   * @param {L.LatLng} [latlng] - ポップアップ表示座標（省略時はポリゴン中心）
   */
  function selectMapItem(item, latlng) {
    const { layer, meta } = item;

    if (state.selectedItem && state.selectedItem !== item) {
      state.selectedItem.layer.setStyle(CONFIG.POLYGON_STYLE.default);
    }

    // A. クリック地点（または図郭中心）にポップアップを表示
    const popupLatLng = latlng || layer.getBounds().getCenter();
    L.popup({ maxWidth: 300 })
      .setLatLng(popupLatLng)
      .setContent(buildPopupContent(meta))
      .openOn(state.map);

    // B. 既存レイヤーを削除し、新たなXYZ/WMSレイヤーを追加
    updateOverlayLayer(meta);

    // 選択中ポリゴンを強調
    state.selectedItem = item;
    layer.setStyle(CONFIG.POLYGON_STYLE.selected);
    syncSelectedListItem();
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
      btn.classList.toggle('is-selected', targetItem === state.selectedItem);
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
      if (item === state.selectedItem) {
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
          if (state.selectedItem !== item) {
            layer.setStyle(CONFIG.POLYGON_STYLE.hover);
          }
        });

        layer.on('mouseout', () => {
          if (state.selectedItem !== item) {
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
   * 凡例プレビューの開閉を切り替える
   */
  function toggleLegend() {
    const willExpand = dom.legendBody.hidden;
    dom.legendBody.hidden = !willExpand;
    dom.toggleLegendBtn.setAttribute('aria-expanded', String(willExpand));
  }

  /**
   * オーバーレイレイヤーの不透明度を更新する
   */
  function handleOpacityChange() {
    const percent = Number(dom.wmsOpacitySlider.value);
    state.overlayOpacity = percent / 100;
    dom.wmsOpacityValue.textContent = `${percent}%`;

    if (state.activeOverlayLayer) {
      state.activeOverlayLayer.setOpacity(state.overlayOpacity);
    }
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
    dom.searchInput.addEventListener('input', applyFilters);
    dom.yearMinInput.addEventListener('input', applyFilters);
    dom.yearMaxInput.addEventListener('input', applyFilters);
    dom.resetFiltersBtn.addEventListener('click', resetFilters);
    dom.togglePanelBtn.addEventListener('click', togglePanel);
    dom.toggleListBtn.addEventListener('click', toggleResultList);
    dom.toggleLegendBtn.addEventListener('click', toggleLegend);
    dom.clearWmsBtn.addEventListener('click', clearActiveOverlayLayer);
    dom.zoomWmsBtn.addEventListener('click', () => zoomToMapItem(state.selectedItem));
    dom.wmsOpacitySlider.addEventListener('input', handleOpacityChange);
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
