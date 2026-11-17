(() => {
  'use strict';

  /**
   * アプリケーション設定定数
   */
  const CONFIG = {
    GEOJSON_URL: 'data/map_index.geojson',
    GSI_PALE_TILE_URL: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    GSI_ATTRIBUTION: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>',
    INITIAL_CENTER: [36.2048, 138.2529],
    INITIAL_ZOOM: 5,
    MIN_ZOOM: 4,
    MAX_ZOOM: 18,
    MAX_LIST_ITEMS: 100,
    DEFAULT_WMS_OPACITY: 0.85,
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
    activeWmsLayer: null,
    selectedItem: null,
    wmsOpacity: CONFIG.DEFAULT_WMS_OPACITY
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
   * WMS URLが安全なスキーム（http/https/相対パス）であるか検証する
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
   * @param {Object} properties - GeoJSON Featureのproperties
   * @returns {string} ポップアップHTML文字列
   */
  function buildPopupContent(properties) {
    const mapName = escapeHtml(properties.map_name || '名称不明');
    const publishedYear = properties.published_year != null
      ? `${escapeHtml(properties.published_year)}年`
      : '不明';
    const authors = escapeHtml(properties.authors || '不明');

    return `
      <div class="map-popup">
        <h2 class="map-popup-title">${mapName}</h2>
        <dl class="map-popup-meta">
          <dt>発行年</dt>
          <dd>${publishedYear}</dd>
          <dt>著者</dt>
          <dd>${authors}</dd>
        </dl>
      </div>
    `;
  }

  /**
   * ホバーツールチップ用のテキストを生成する
   * @param {Object} properties - GeoJSON Featureのproperties
   * @returns {string} ツールチップ文字列
   */
  function buildTooltipText(properties) {
    const mapName = escapeHtml(properties.map_name || '名称不明');
    const yearSuffix = properties.published_year != null
      ? ` (${escapeHtml(properties.published_year)})`
      : '';
    return `${mapName}${yearSuffix}`;
  }

  /**
   * 選択中のWMSレイヤーおよびポリゴン強調を解除する
   */
  function clearActiveWmsLayer() {
    if (state.activeWmsLayer && state.map) {
      state.map.removeLayer(state.activeWmsLayer);
      state.activeWmsLayer = null;
    }
    if (state.selectedItem) {
      state.selectedItem.layer.setStyle(CONFIG.POLYGON_STYLE.default);
      state.selectedItem = null;
    }
    dom.wmsStatusDot.classList.remove('is-loading');
    dom.activeWmsBar.hidden = true;
    dom.activeWmsName.textContent = '';
    syncSelectedListItem();
  }

  /**
   * 指定されたWMSエンドポイントURLで新たなWMSレイヤーを追加する
   * @param {string} wmsUrl - WMSエンドポイントURL
   * @param {string} mapName - 表示用の図幅名
   */
  function updateWmsLayer(wmsUrl, mapName) {
    if (state.activeWmsLayer && state.map) {
      state.map.removeLayer(state.activeWmsLayer);
      state.activeWmsLayer = null;
    }

    if (!isSafeUrl(wmsUrl)) {
      dom.activeWmsBar.hidden = true;
      setStatusMessage('この図幅には有効なWMS URLが設定されていません。');
      return;
    }

    setStatusMessage('');

    const wmsLayer = L.tileLayer.wms(wmsUrl, {
      ...CONFIG.WMS_OPTIONS,
      opacity: state.wmsOpacity,
      attribution: '産総研 地質図幅WMS'
    });

    wmsLayer.on('loading', () => {
      dom.wmsStatusDot.classList.add('is-loading');
    });

    wmsLayer.on('load', () => {
      dom.wmsStatusDot.classList.remove('is-loading');
    });

    wmsLayer.on('tileerror', () => {
      dom.wmsStatusDot.classList.remove('is-loading');
      setStatusMessage(`「${mapName || '選択図幅'}」のWMSタイル取得中にエラーが発生しました。`);
    });

    state.activeWmsLayer = wmsLayer.addTo(state.map);
    dom.activeWmsName.textContent = `表示中: ${mapName || '地質図'}`;
    dom.activeWmsBar.hidden = false;
  }

  /**
   * 図幅アイテムを選択し、ポップアップ表示・WMSオーバーレイ・強調スタイルを適用する
   * @param {Object} item - { layer, properties } オブジェクト
   * @param {L.LatLng} [latlng] - ポップアップ表示座標（省略時はポリゴン中心）
   */
  function selectMapItem(item, latlng) {
    const { layer, properties } = item;

    // 以前選択していたポリゴンのスタイルをリセット
    if (state.selectedItem && state.selectedItem !== item) {
      state.selectedItem.layer.setStyle(CONFIG.POLYGON_STYLE.default);
    }

    // A. クリック地点（または図郭中心）にポップアップを表示
    const popupLatLng = latlng || layer.getBounds().getCenter();
    L.popup({ maxWidth: 280 })
      .setLatLng(popupLatLng)
      .setContent(buildPopupContent(properties))
      .openOn(state.map);

    // B. 既存WMSを削除し、新たなWMSレイヤーを追加
    updateWmsLayer(properties.wms_url, properties.map_name);

    // 選択中ポリゴンを強調
    state.selectedItem = item;
    layer.setStyle(CONFIG.POLYGON_STYLE.selected);
    syncSelectedListItem();
  }

  /**
   * 選択中の図幅の範囲へマップをズームする
   * @param {Object} item - { layer, properties } オブジェクト
   */
  function zoomToMapItem(item) {
    if (!item || !item.layer.getBounds) {
      return;
    }
    const bounds = item.layer.getBounds();
    if (bounds.isValid()) {
      state.map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
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
      const { properties } = item;
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
      nameSpan.textContent = properties.map_name || '名称不明';

      const authorSpan = document.createElement('span');
      authorSpan.className = 'result-item-author';
      authorSpan.textContent = properties.authors || '著者不明';

      mainSpan.append(nameSpan, authorSpan);

      const yearSpan = document.createElement('span');
      yearSpan.className = 'result-item-year';
      yearSpan.textContent = properties.published_year != null ? `${properties.published_year}` : '';

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
        const props = feature.properties || {};
        const item = { layer, properties: props };

        if (typeof props.published_year === 'number' && !Number.isNaN(props.published_year)) {
          years.push(props.published_year);
        }

        // ホバー時の図幅名ツールチップ
        layer.bindTooltip(buildTooltipText(props), {
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
      state.map.fitBounds(bounds, { padding: [24, 24] });
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
      const { layer, properties } = item;
      const mapName = String(properties.map_name || '').toLowerCase();
      const authors = String(properties.authors || '').toLowerCase();
      const year = Number(properties.published_year);

      // テキスト一致判定（図幅名または著者）
      const matchesText = !query || mapName.includes(query) || authors.includes(query);

      // 発行年範囲判定
      const hasValidYear = !Number.isNaN(year);
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
   * WMSレイヤーの不透明度を更新する
   */
  function handleOpacityChange() {
    const percent = Number(dom.wmsOpacitySlider.value);
    state.wmsOpacity = percent / 100;
    dom.wmsOpacityValue.textContent = `${percent}%`;

    if (state.activeWmsLayer) {
      state.activeWmsLayer.setOpacity(state.wmsOpacity);
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
    dom.clearWmsBtn.addEventListener('click', clearActiveWmsLayer);
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
