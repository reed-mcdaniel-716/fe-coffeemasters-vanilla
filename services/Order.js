import { getProductById } from "./Menu.js";

export async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.store.cart.filter( productInCart => {
    return productInCart.product.id == id;
  });

  if (results.length == 1){
    // must return new array rather than modify the existing
    // so that the Store proxy's set method is triggered
    // similarity to React's setState
    app.store.cart = app.store.cart.map(productInCart => {
      return productInCart.product.id == id ? { product, quantity: productInCart.quantity + 1 } : { ...productInCart };
    })
  } else {
    app.store.cart = [...app.store.cart, {product, quantity: 1}];
  }
};

export function removeFromCart(id) {
  console.log('#### id:', id);
  app.store.cart = app.store.cart.filter(productInCart => productInCart.product.id != id);
};
