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

    window.addEventListener('appmenuchanged', () => {
      this.render();
    });
    this.render();
  }

  render() {
    // check if menu is defined
    if (app.store.menu){
      // clear contents
      this.root.querySelector('#menu').innerHTML = '';
      for(let category of app.store.menu){
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class='category'></ul>
        `
        this.root.querySelector('#menu').appendChild(liCategory);

        category.products.forEach(product => {
          // product-item will be a custom element we create
          const item = document.createElement('product-item');
          // must stringify as the dataset maps to HTML data attributes
          // and all HTML attributes must be strings
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector('ul').appendChild(item);
        });
      }
    } else {
      this.root.querySelector('#menu').innerHTML = 'Loading...';
    }
  }
}

customElements.define("menu-page", MenuPage);
