// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let counter = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
       
        //Set id for each entry
        let id = counter;
        counter++;

        //add click functionality to each entry
        newPost.addEventListener("click", () => {
          //passes in entry and entry number to router
          router.setState("/#entry" + id.toString(), entry);
          history.pushState(entry, null, "/#entry" + id);
        })

        document.querySelector('main').appendChild(newPost);
      });
    });
});

//pop the address of the previous location
window.addEventListener("popstate", (e) => {
  router.setState("/" + e.currentTarget.location.hash, null);
});

//adds click functionality to settings (triggers router)
let body = document.querySelector("body");
let settingsBtn = body.querySelector("body header img[alt='settings']");
settingsBtn.addEventListener("click", () => {
  //sends the page address to the router
  router.setState("/#settings", null);
  history.pushState(-1, null, "/#settings");
})

let header = document.querySelector("header");
let clickableHeader = document.querySelector("header h1");
clickableHeader.addEventListener("click", () => {
  //sends the page address to the router
  router.setState("/", null);
  history.pushState(0, null, "/");
})


