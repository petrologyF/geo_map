import { CONFIG, FIELD_TRIP_CATEGORY_KEYS } from './config.js';

/**
 * アプリケーション状態
 */
export const state = {
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
  showFieldTrips: true,
  fieldTripsLayerGroup: null,
  fieldTripItems: [],
  expandedFieldTripCourses: new Set(),
  fieldTripYear: 'all',
  fieldTripCourse: 'all',
  fieldTripQuery: '',
  selectedFieldTripCategories: new Set(),
  drawerMode: 'maps',
  selectedFieldTripId: null,
  userLocationLayerGroup: null,
  scaleControl: null,
  wheelZoomSpeed: 1.0,
  showScaleBar: true,
  showFieldTripRoute: true,
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
  settings: { ...CONFIG.DEFAULT_SETTINGS },
  permalinkRestoredView: false
};

/**
 * DOM要素のキャッシュ
 */
export const dom = {
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
  seamlessGuideCard: document.getElementById('seamless-guide-card'),
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
  drawerTabMaps: document.getElementById('drawer-tab-maps'),
  drawerTabTrips: document.getElementById('drawer-tab-trips'),
  drawerMapsPane: document.getElementById('drawer-maps-pane'),
  drawerTripsPane: document.getElementById('drawer-trips-pane'),
  drawerTripFilterLabel: document.getElementById('drawer-trip-filter-label'),
  drawerTripYearFilter: document.getElementById('drawer-trip-year-filter'),
  drawerTripCourseFilter: document.getElementById('drawer-trip-course-filter'),
  drawerTripCategoryLabel: document.getElementById('drawer-trip-category-label'),
  drawerTripCategoryChips: document.getElementById('drawer-trip-category-chips'),
  drawerTripSearch: document.getElementById('drawer-trip-search'),
  fieldTripCourseCard: document.getElementById('field-trip-course-card'),
  fieldTripListLabel: document.getElementById('field-trip-list-label'),
  fieldTripCount: document.getElementById('field-trip-count'),
  toggleExpandTripsBtn: document.getElementById('toggle-expand-trips-btn'),
  fitFieldTripsBtn: document.getElementById('fit-field-trips-btn'),
  fieldTripList: document.getElementById('field-trip-list'),
  fieldTripActiveBar: document.getElementById('field-trip-active-bar'),
  fieldTripActiveBadge: document.getElementById('field-trip-active-badge'),
  fieldTripActiveCount: document.getElementById('field-trip-active-count'),
  fieldTripActiveLabel: document.getElementById('field-trip-active-label'),
  fieldTripActiveAuthors: document.getElementById('field-trip-active-authors'),
  fieldTripStopNav: document.getElementById('field-trip-stop-nav'),
  fieldTripPrevStopBtn: document.getElementById('field-trip-prev-stop-btn'),
  fieldTripNextStopBtn: document.getElementById('field-trip-next-stop-btn'),
  fieldTripCurrentStopLabel: document.getElementById('field-trip-current-stop-label'),
  fieldTripCurrentStopDesc: document.getElementById('field-trip-current-stop-desc'),
  fieldTripBarOverlayBtn: document.getElementById('field-trip-bar-overlay-btn'),
  fieldTripBarGuidebookBtn: document.getElementById('field-trip-bar-guidebook-btn'),
  fieldTripBarFitBtn: document.getElementById('field-trip-bar-fit-btn'),
  fieldTripBarCollapseBtn: document.getElementById('field-trip-bar-collapse-btn'),
  fieldTripsFabBtn: document.getElementById('field-trips-fab-btn'),
  locateMeBtn: document.getElementById('locate-me-btn'),
  prefsPopoverBtn: document.getElementById('prefs-popover-btn'),
  prefsPopover: document.getElementById('prefs-popover'),
  prefsThemeLabel: document.getElementById('prefs-theme-label'),
  themeChoiceButtons: document.querySelectorAll('.segmented-btn[data-theme-choice]'),
  prefsLangLabel: document.getElementById('prefs-lang-label'),
  langButtons: document.querySelectorAll('.segmented-btn[data-lang]'),
  prefsMapBehaviorLabel: document.getElementById('prefs-map-behavior-label'),
  wheelZoomSpeedLabel: document.getElementById('wheel-zoom-speed-label'),
  wheelZoomSpeedSlider: document.getElementById('wheel-zoom-speed'),
  wheelZoomSpeedValue: document.getElementById('wheel-zoom-speed-value'),
  defaultOverlayOpacityLabel: document.getElementById('default-overlay-opacity-label'),
  defaultOverlayOpacitySlider: document.getElementById('default-overlay-opacity'),
  defaultOverlayOpacityValue: document.getElementById('default-overlay-opacity-value'),
  showScaleLabel: document.getElementById('show-scale-label'),
  showScaleToggle: document.getElementById('show-scale-toggle'),
  showTripRouteLabel: document.getElementById('show-trip-route-label'),
  showTripRouteToggle: document.getElementById('show-trip-route-toggle'),
  resetSettingsBtn: document.getElementById('reset-settings-btn')
};

let settingsSaveTimer = null;

/**
 * 設定を localStorage へ保存する
 */
export function saveSettings() {
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
 * 設定を localStorage へ遅延保存する
 */
export function debouncedSaveSettings() {
  if (settingsSaveTimer) {
    clearTimeout(settingsSaveTimer);
  }
  settingsSaveTimer = setTimeout(() => {
    settingsSaveTimer = null;
    saveSettings();
  }, 150);
}

/**
 * localStorage から設定を読み込む
 */
export function loadSettings() {
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
  const wheelSpeed = Number(merged.wheelZoomSpeed);
  merged.wheelZoomSpeed = Number.isFinite(wheelSpeed)
    ? Math.min(2.5, Math.max(0.4, Math.round(wheelSpeed * 10) / 10))
    : CONFIG.DEFAULT_SETTINGS.wheelZoomSpeed;

  // 年・コースの絞り込みは一時的な検索状態とし、再読み込み時に1コースのみへ固定されないよう復元しない
  merged.fieldTripYear = 'all';
  merged.fieldTripCourse = 'all';

  state.settings = merged;
  state.showIndexFrames = Boolean(merged.showIndexFrames);
  state.showFieldTrips = Boolean(merged.showFieldTrips);
  state.showScaleBar = merged.showScaleBar !== false;
  state.showFieldTripRoute = merged.showFieldTripRoute !== false;
  state.wheelZoomSpeed = merged.wheelZoomSpeed;
  state.fieldTripYear = 'all';
  state.fieldTripCourse = 'all';
  const validCategories = Array.isArray(merged.fieldTripCategories)
    ? merged.fieldTripCategories.filter((cat) => FIELD_TRIP_CATEGORY_KEYS.includes(cat))
    : [];
  state.selectedFieldTripCategories = new Set(validCategories);
  merged.fieldTripCategories = Array.from(state.selectedFieldTripCategories);
  state.viewportOnly = Boolean(merged.viewportOnly);
  state.overlayOpacity = merged.overlayOpacity;
  state.seamlessOpacity = merged.seamlessOpacity;
  state.seamlessQueryPriority = Boolean(merged.seamlessQueryPriority);
}
