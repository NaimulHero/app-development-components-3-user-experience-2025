/** Calcite demo application boilerplate functionality - not related to demo content */

const toggleModeEl = document.getElementById("toggle-mode");

const navigationEl = document.getElementById("nav");
const panelEl = document.getElementById("sheet-panel");
const sheetEl = document.getElementById("sheet");
const darkModeCss = document.getElementById("jsapi-mode-dark");
const lightModeCss = document.getElementById("jsapi-mode-light");
const arcgisMap = document.querySelector("arcgis-map");
const panelStart = document.getElementById("panel-start");

navigationEl.addEventListener("calciteNavigationActionSelect", () =>
  handleSheetOpen()
);

panelEl.addEventListener("calcitePanelClose", () => handlePanelClose());

panelStart.addEventListener(
  "calcitePanelClose",
  () => (panelStart.collapsed = true)
);


let mode = "light";
let map;

arcgisMap.addEventListener("arcgisViewReadyChange", () => {
  map = arcgisMap.map;
});

const legendPanel = document.getElementById("legend");
const layersPanel = document.getElementById("layers");
const bookmarksPanel = document.getElementById("bookmarks");

const panels = [legendPanel, layersPanel, bookmarksPanel];

const flowActions = document.querySelectorAll("[data-toggle-flow]");
const flow = document.getElementById("flow");
const rootFlowItem = document.getElementById("root-flow-item");

const drillInClassName = "drill-in";

function createFlowItem(heading, componentName) {
  const flowItem = document.createElement("calcite-flow-item");
  flowItem.heading = heading;
  flowItem.className = drillInClassName;
  flowItem.selected = true;
  const component = document.createElement(componentName);
  component.referenceElement = "my-map";
  flowItem.appendChild(component);
  return flowItem;
}

flowActions.forEach((action) => {
  action.addEventListener("click", () => {
    rootFlowItem.selected = false;
    document.querySelector(`.${drillInClassName}`)?.remove();

    let newFlowItem;
    switch (action.getAttribute("data-toggle-flow")) {
      case "legend":
        newFlowItem = createFlowItem("Legend", "arcgis-legend");
        break;
      case "layers":
        newFlowItem = createFlowItem("Layers", "arcgis-layer-list");
        break;
      case "bookmarks":
        newFlowItem = createFlowItem("Bookmarks", "arcgis-bookmarks");
        break;
    }

    flow.appendChild(newFlowItem);
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

function handleSheetOpen() {
  sheetEl.open = true;
  panelEl.closed = false;
}

function handlePanelClose() {
  sheetEl.open = false;
}
