const Store = {
    menu: null,
    cart: []
}

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    // apply change
    target[property] = value;
    
    // respond to menu changes by broadcasting changes
    if (property == 'menu'){
      // use window as there is one for whole app
      // but we have many documents because of the shadow DOMs
      // dispatching custom events
      window.dispatchEvent(new Event("appmenuchanged"));
    }

    if (property == 'cart') {
      window.dispatchEvent(new Event("appcartchanged"));
    }

    return true;
  }


})

// elsewhere we refer to this as Store, but it is really the proxied Store
export default proxiedStore;
