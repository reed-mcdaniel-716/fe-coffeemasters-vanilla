export class MenuPage extends HTMLElement {
  constructor() {
    super();

    // shadow DOM
    this.root = this.attachShadow({ mode: 'open'});

    // initializing styles for shadow DOM
    const styles = document.createElement("style");
    this.root.appendChild(styles);

    // funstion to load css from external file and apply it
    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }

    loadCSS();

  }

  // when the component is attached to the DOM
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }
}

customElements.define("menu-page", MenuPage);
