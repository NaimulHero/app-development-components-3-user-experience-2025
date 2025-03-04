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
  }
}

new NonMapCentric();
