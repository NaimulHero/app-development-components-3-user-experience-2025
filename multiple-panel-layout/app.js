/** Calcite demo application boilerplate functionality - not related to demo content */

const toggleModeEl = document.getElementById("toggle-mode");
const toggleModalEl = document.getElementById("toggle-modal");

const navigationEl = document.getElementById("nav");
const panelEl = document.getElementById("sheet-panel");
const modalEl = document.getElementById("modal");
const sheetEl = document.getElementById("sheet");
const darkModeCss = document.getElementById("jsapi-mode-dark");
const lightModeCss = document.getElementById("jsapi-mode-light");
const arcgisMap = document.querySelector("arcgis-map");
const panelStart = document.getElementById("panel-start");
const featuresPanel = document.getElementById("features-panel");
const featuresComponent = document.querySelector("arcgis-features");

panelStart.addEventListener(
  "calcitePanelClose",
  () => (panelStart.collapsed = true)
);

featuresPanel.addEventListener(
  "calciteFlowItemClose",
  () => (featuresPanel.collapsed = true)
);

let mode = "light";
let map;

arcgisMap.addEventListener("arcgisViewReadyChange", () => {
  map = arcgisMap.map;
});

// Add an event listener to the map to open the Features component when the user clicks on the map.
arcgisMap.addEventListener("arcgisViewClick", (event) => {
  const { mapPoint } = event.detail;
  featuresPanel.collapsed = false;
  featuresComponent.open({
    location: mapPoint,
    fetchFeatures: true,
  });
});

const legendPanel = document.getElementById("legend");
const layersPanel = document.getElementById("layers");
const bookmarksPanel = document.getElementById("bookmarks");

const panels = [legendPanel, layersPanel, bookmarksPanel];

const panelActions = document.querySelectorAll("[data-toggle-panel]");

panelActions.forEach((action) => {
  action.addEventListener("click", () => {
    const id = action.getAttribute("data-toggle-panel");
    panelStart.collapsed = false;
    panelActions.forEach((el) => {
      el.active = el === action;
    });
    togglePanel(id);
  });
});

function togglePanel(id) {
  panels.forEach((panel) => {
    const open = panel.id === id;
    panel.closed = !open;
    panel.hidden = !open;
  });
}

toggleModeEl.addEventListener("click", () => handleModeChange());
toggleModalEl.addEventListener("click", () => handleModalChange());
navigationEl.addEventListener("calciteNavigationActionSelect", () =>
  handleSheetOpen()
);

panelEl.addEventListener("calcitePanelClose", () => handlePanelClose());

function handleModeChange() {
  mode = mode === "dark" ? "light" : "dark";
  const isDarkMode = mode === "dark";
  darkModeCss.disabled = !darkModeCss.disabled;
  lightModeCss.disabled = !lightModeCss.disabled;
  map.basemap = isDarkMode
    ? { portalItem: { id: "082831bea053406792d29b2aedcf4a81" } }
    : { portalItem: { id: "01126f0ff00143f5bcd451221ccf459a" } };
  toggleModeEl.icon = isDarkMode ? "moon" : "brightness";
  document.body.classList.toggle("calcite-mode-dark", isDarkMode);

  // maps sdk workaround
  const inverseMode = mode === "light" ? "dark" : "light";
  const elements = document.getElementsByClassName(
    `calcite-mode-${inverseMode}`
  );
  for (let i = 0; i < elements.length; i++) {
    const node = elements[i];
    node.classList.remove(`calcite-mode-${inverseMode}`);
    node.classList.add(`calcite-mode-${mode}`);
  }
}

function handleModalChange() {
  modalEl.open = !modalEl.open;
}

function handleSheetOpen() {
  sheetEl.open = true;
  panelEl.closed = false;
}

function handlePanelClose() {
  sheetEl.open = false;
}
