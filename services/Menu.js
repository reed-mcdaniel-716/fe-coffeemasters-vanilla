import API from "./API.js";

export async function loadData() {
  // setting menu causes the Store's proxy to dispatch the appmenuchanged event
  app.store.menu = await API.fetchMenu();
};

export async function getProductById(id) {
  if (app.store.menu == null) {
    // load data in the case where it was not already
    await loadData();
  }

  for (let category of app.store.menu) {
    for (let product of category.products) {
      if (product.id == id){
        return product;
      }
    }
  }

  return null;
};
