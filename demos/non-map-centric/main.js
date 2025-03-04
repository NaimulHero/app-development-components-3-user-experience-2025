class NonMapCentric {
  constructor() {
    this.arcgisMap = document.querySelector("arcgis-map");
    this.legend = document.getElementById("legend");
    this.bookmarks = document.getElementById("bookmarks");
    this.initMapComponents();
  }

  initMapComponents() {
    if (!this.arcgisMap) return;
    this.arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {
      const view = event?.target?.view;
      if (!view) return;
      this.setupViewElements(view);
    });
  }

  setupViewElements(view) {
    if (this.bookmarks) {
      this.bookmarks.view = view;
    }
    if (this.legend) {
      this.legend.view = view;
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
}

new NonMapCentric();
