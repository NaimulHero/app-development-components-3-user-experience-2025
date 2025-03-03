class NonMapCentric {
  constructor() {
    this.arcgisMap = document.querySelector("arcgis-map");
    this.sheet = document.getElementById("sheet");
    this.navigation = document.getElementById("nav");
    this.panel = document.getElementById("sheet-panel");
    this.dialog = document.getElementById("dialog");
    this.toggleDialogNode = document.getElementById("toggleDialog");
  }

  initialize() {
    this.setupMap();
    this.setupUI();
  }

  setupMap() {
    if (this.arcgisMap) {
      this.arcgisMap.addEventListener(
        "arcgisViewReadyChange",
        async (event) => {
          const view = event?.target?.view;
          if (view) {
            this.setupViewElements(view);
          }
        }
      );
    }
  }

  setupViewElements(view) {
    const bookmarks = document.getElementById("bookmarks");
    const legend = document.getElementById("legend");
    if (bookmarks) {
      bookmarks.view = view;
    }
    if (legend) {
      legend.view = view;
    }

    const layer = view.map.allLayers.find(
      (layer) => layer.id === "18066f67b9f-layer-5"
    );
    this.setupCharts(layer, view);
  }

  async setupCharts(layer, view) {
    const loadedLayer = await layer.load();
    const charts = [
      { id: "chart", index: 2 },
      { id: "chart2", index: 5 },
      { id: "chart3", index: 6 },
    ];
    charts.forEach(({ id, index }) => {
      const chartElement = document.getElementById(id);
      chartElement.view = view;
      chartElement.layer = layer;
      chartElement.model = loadedLayer.charts[index];
      loadedLayer.charts[index].title.visible = false;
    });
  }

  setupUI() {
    this.addEventListeners(
      this.navigation,
      "calciteNavigationActionSelect",
      this.toggleSheet.bind(this, true)
    );
    this.addEventListeners(
      this.panel,
      "calcitePanelClose",
      this.toggleSheet.bind(this, false)
    );
    this.addEventListeners(
      this.toggleDialogNode,
      "click",
      this.toggleDialog.bind(this)
    );
  }

  addEventListeners(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
    }
  }

  toggleSheet(open) {
    if (this.sheet) {
      this.sheet.open = open;
      if (!open) {
        this.panel.closed = false;
      }
    }
  }

  toggleDialog() {
    if (this.dialog) {
      this.dialog.open = !this.dialog.open;
    }
  }
}

const app = new NonMapCentric();
app.initialize();
