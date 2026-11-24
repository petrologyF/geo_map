import { CONFIG, PROVIDER_EN_MAP, REGION_EN_MAP } from './config.js';
import { t } from './i18n.js';
import { state } from './state.js';

/**
 * URLが安全なスキーム（http/https）であるか検証する
 */
export function isSafeUrl(url) {
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
 */
export function normalizeProperties(props = {}) {
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
    viewerUrl: isSafeUrl(props.related_resources?.viewer_url) ? props.related_resources.viewer_url : '',
    catalogUrl: isSafeUrl(props.related_resources?.catalog_url) ? props.related_resources.catalog_url : '',
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
export function styleByScale(scaleDenominator, mapType = 'geological_map_sheet') {
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
 * 検索用の文字列正規化（NFKC正規化・小文字化・カタカナ→ひらがな統一）
 */
export function normalizeSearchText(text) {
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
export function formatScaleAbbrev(scaleDenominator, scale, isEn = false) {
  let denom = Number(scaleDenominator);
  if (!(denom > 0) && scale && /^1:\d/.test(scale)) {
    denom = Number(scale.replace(/^1:/, '').replace(/,/g, ''));
  }
  if (!(denom > 0)) {
    return '';
  }
  if (isEn) {
    if (denom >= 1000000) {
      const m = denom / 1000000;
      return `1:${Number.isInteger(m) ? m : m.toFixed(1)}M`;
    }
    if (denom >= 1000) {
      const k = denom / 1000;
      return `1:${Number.isInteger(k) ? k : k.toFixed(1)}k`;
    }
    return `1:${denom}`;
  }
  if (denom >= 10000) {
    const man = denom / 10000;
    return `1/${Number.isInteger(man) ? man : man.toFixed(1)}万`;
  }
  return `1/${denom.toLocaleString('en-US')}`;
}

/**
 * シリーズ接頭辞や「図幅」「地域の地質」を除いた中核地名を抽出する
 */
export function extractCoreMapName(rawTitle) {
  if (!rawTitle) {
    return '';
  }
  const bracketMatch = rawTitle.match(/「([^」]+)」/);
  if (bracketMatch) {
    return bracketMatch[1].trim();
  }
  return rawTitle
    .replace(/^(?:[\d.]+万分の1地質図幅|地域地質研究報告|火山地質図)\s*/, '')
    .replace(/(?:地域の地質|図幅).*$/, '')
    .trim() || rawTitle;
}

/**
 * サジェスト等で使うコンパクトな図幅名（例: 槍ヶ岳 (1/5万)）を生成する
 */
export function formatShortMapTitle(rawTitle, scaleDenominator, scale, mapType, isEn = false) {
  const core = extractCoreMapName(rawTitle);
  const scaleTag = formatScaleAbbrev(scaleDenominator, scale, isEn);
  if (mapType === 'volcanic_geological_map') {
    const cleanVolcano = core.replace(/火山地質図.*$/, '').trim() || core;
    return scaleTag ? `${cleanVolcano} (${scaleTag})` : cleanVolcano;
  }
  return scaleTag ? `${core} (${scaleTag})` : core;
}

/**
 * 現在の表示言語に応じたメタデータ表示用フィールドを返す
 */
export function getLocalizedMeta(meta) {
  const isEn = state.lang === 'en';
  const rawTitle = isEn ? meta.mapNameEn : meta.mapNameJa;
  const title = rawTitle;
  const subtitle = isEn
    ? (meta.mapNameJa !== meta.mapNameEn ? meta.mapNameJa : '')
    : (meta.mapNameEn && meta.mapNameEn !== meta.mapNameJa ? meta.mapNameEn : '');
  const coreTitle = extractCoreMapName(rawTitle);
  const shortTitle = formatShortMapTitle(rawTitle, meta.scaleDenominator, meta.scale, meta.mapType, isEn);
  const authors = isEn
    ? (meta.authorsEn || meta.authorsJa || t().unknownAuthor)
    : (meta.authorsJa || meta.authorsEn || t().unknownAuthor);
  const authorList = isEn
    ? (meta.authorsEnList.length > 0 ? meta.authorsEnList : meta.authorsJaList)
    : (meta.authorsJaList.length > 0 ? meta.authorsJaList : meta.authorsEnList);
  const publisher = isEn
    ? (meta.publisherEn || meta.publisherJa || '')
    : (meta.publisherJa || meta.publisherEn || '');
  const regionList = isEn
    ? meta.regionList.map((r) => REGION_EN_MAP[r] || r)
    : meta.regionList;
  const region = isEn
    ? regionList.join(', ')
    : (meta.prefectures || meta.regionList.join('・'));
  const providerName = isEn
    ? (PROVIDER_EN_MAP[meta.providerNameJa] || meta.providerNameJa)
    : meta.providerNameJa;
  const searchTokens = normalizeSearchText(
    `${meta.searchTokensJa} ${meta.searchTokensEn} ${regionList.join(' ')} ${providerName} ${coreTitle}`
  );

  return {
    title,
    subtitle,
    coreTitle,
    shortTitle,
    authors,
    authorList,
    publisher,
    region,
    regionList,
    providerName,
    searchTokens
  };
}

/**
 * ホバーツールチップ文字列を構築する
 */
export function buildTooltipText(meta) {
  const loc = getLocalizedMeta(meta);
  const year = meta.publishedYear != null ? ` (${meta.publishedYear}${t().yearSuffix})` : '';
  return `${loc.title}${year}`;
}

/**
 * アイテムの Leaflet LatLngBounds を取得する
 */
export function getItemBounds(item) {
  if (!item) {
    return null;
  }
  if (item.layer && typeof item.layer.getBounds === 'function') {
    return item.layer.getBounds();
  }
  if (Array.isArray(item.meta?.bounds) && item.meta.bounds.length === 4) {
    const [w, s, e, n] = item.meta.bounds;
    return L.latLngBounds([s, w], [n, e]);
  }
  return null;
}

/**
 * 2つの LatLngBounds の交差面積（度^2）を計算する
 */
export function computeIntersectionArea(boundsA, boundsB) {
  if (!boundsA || !boundsB || !boundsA.intersects(boundsB)) {
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
