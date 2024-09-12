import Store from './services/Store.js';
import API from './services/API.js';
import { loadData } from './services/Menu.js';
import Router from './services/Router.js';

window.app = {};
app.store = Store;
app.router = Router;

// want to know when the DOM is finished being constructed (ready for manipulation)
// happens after script's defer i.e. this js file is downloaded and parsed
// hapens before render
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
window.addEventListener("DOMContentLoaded", async () => {
  app.router.init();
  loadData();
});
