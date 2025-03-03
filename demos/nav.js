class Nav {
  constructor() {
    this.createNav();

    this.sheet = document.getElementById("sheet");
    this.navigation = document.getElementById("nav");
    this.panel = document.getElementById("sheet-panel");
    this.dialog = document.getElementById("dialog");
    this.toggleDialogNode = document.getElementById("toggleDialog");
    this.toggleLayoutNode = document.getElementById("toggleLayoutNode");
    this.isMapCentric = window.location.href.includes("/map-centric");
  }

  initialize() {
    this.setupUI();
  }

  createNav() {
    const shell = document.querySelector("calcite-shell");
    const dummyContainer = document.createElement("div");
    dummyContainer.innerHTML = `<calcite-navigation id="nav" navigation-action slot="header">
        <calcite-navigation-logo
          href="#"
          icon="globe"
          alt="Application logo"
          slot="logo"
          heading="Museums in the United States"
          description="Non Map Centric"
        ></calcite-navigation-logo>
        <calcite-action-pad
          layout="horizontal"
          expand-disabled
          slot="content-end"
        >
          <calcite-action
            id="toggleLayoutNode"
            text="Toggle layout"
            icon="map"
          ></calcite-action>
          <calcite-action
            id="toggleDialog"
            text="About this application"
            icon="information"
          ></calcite-action>
        </calcite-action-pad>
        <calcite-tooltip
          placement="bottom"
          reference-element="toggleLayoutNode"
          close-on-click
          slot="content-end"
          >Toggle layout</calcite-tooltip
        >
        <calcite-tooltip
          placement="bottom"
          reference-element="toggleDialog"
          close-on-click
          slot="content-end"
          >About this application</calcite-tooltip
        >
      </calcite-navigation>`;
    const navNode = dummyContainer.firstChild;
    shell?.prepend(navNode);
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
    this.addEventListeners(
      this.toggleLayoutNode,
      "click",
      this.toggleLayout.bind(this)
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

  toggleLayout(e) {
    const urlObj = new URL(window.location.href);
    const demosPath = "/demos/";
    urlObj.pathname = this.isMapCentric
      ? `${demosPath}non-map-centric`
      : `${demosPath}map-centric`;
    window.location.href = urlObj.href;
  }
}

const nav = new Nav();
nav.initialize();
