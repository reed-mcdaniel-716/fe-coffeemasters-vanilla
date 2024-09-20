const Router = {
  init: () => {
    // for each nav link, change default click behavior
    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        // handle routing by going to the href of the clicked link
        const url = event.target.getAttribute('href');
        Router.go(url);
      })
    })

    // event handler for URL changes
    window.addEventListener("popstate", (event) => {
      console.log("State received: ", event.state);
      // accessible from the the data arg passed to history.pushState
      // addToHistory = false becasue we are navigating the existing histor with <- and ->
      Router.go(event.state.route, false)
    })

    // Check the initial URL and start there
    // you may have copy and pasted the link from elsewhere and it need not be the homepage
    Router.go(location.pathname);

    // to handle a refresh, must configure server to respond appropriately (out of scope)

  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);

    if(addToHistory){
      history.pushState({ route }, null, route);
    }

    // choosing the option of injecting and removing DOM elements
    // rather than hiding elements
    let pageElement = null;
    switch(route) {
      case '/':
        pageElement = document.createElement('menu-page');
        break;
      case '/order':
        pageElement = document.createElement('order-page');
        break;
      default:
        if (route.startsWith('/product-')) {
          pageElement = document.createElement('details-page');
          const paramId = route.substring(route.lastIndexOf('-') + 1);
          pageElement.dataset.id = paramId;
        }
    }

    if (pageElement){
      const cache = document.querySelector('main');
      // clear everything in the main element
      // alternative: document.querySelector('main').children[0].remove();
      cache.innerHTML = '';
    
      cache.appendChild(pageElement);

      // scroll back to top
      window.scroll(0,0)
    }
  }
}

export default Router;
