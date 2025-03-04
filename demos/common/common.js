import dialogHtml from "./dialog.js";
import sheetHtml from "./sheet.js";
import navHtml from "./nav.js";

class Common {
  constructor() {
    this.initialize();
    this.sheet = document.getElementById("sheet");
    this.navigation = document.getElementById("nav");
    this.panel = document.getElementById("sheet-panel");
    this.dialog = document.getElementById("dialog");
    this.toggleDialogNode = document.getElementById("toggleDialog");
    this.toggleLayoutNode = document.getElementById("toggleLayoutNode");
    this.isMapCentric = window.location.href.includes("/map-centric");
    this.setupUI();
  }

  createAndInsertElement(htmlString, isNav = false) {
    const dummyContainer = document.createElement("div");
    dummyContainer.innerHTML = htmlString;
    const element = dummyContainer.firstChild;
    const shell = document.querySelector("calcite-shell");
    if (isNav) {
      shell?.prepend(element);
    } else {
      document.body.insertBefore(element, shell?.nextSibling);
    }
  }

  initialize() {
    this.createAndInsertElement(dialogHtml);
    this.createAndInsertElement(sheetHtml);
    this.createAndInsertElement(navHtml, true);
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

  toggleLayout() {
    const urlObj = new URL(window.location.href);
    const demosPath = "/demos/";
    urlObj.pathname = this.isMapCentric
      ? `${demosPath}non-map-centric`
      : `${demosPath}map-centric`;
    window.location.href = urlObj.href;
  }
}

new Common();
