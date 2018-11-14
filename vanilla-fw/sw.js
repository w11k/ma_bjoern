var serviceWorkerOption = {
  "assets": [
    "./apple-touch-icon.png?b4d0a128e681954979d6b1f7a7a713f6",
    "./assets/images/android-chrome-192x192.png?aa99ec603501cde76bd6a93f254ccaa3",
    "./assets/images/favicon-16x16.png?f7c448a0e5874e5780566e38fa5a8e72",
    "./assets/images/favicon-32x32.png?d328705e051075cb83bcfece71167841",
    "./assets/images/mstile-144x144.png?d60ac68285e12c421345220e5993a209",
    "./assets/images/mstile-150x150.png?286de8123db73f0210f82baa80d3ecee",
    "./assets/images/mstile-310x150.png?f95b514c4086117b25d86332d76957ed",
    "./assets/images/mstile-310x310.png?55580fa1afb182326dd56a626253e6a8",
    "./assets/images/mstile-70x70.png?ca2592ec6246bddc42e4aa98f61147f0",
    "./assets/images/safari-pinned-tab.svg?ec5301be624ff7b9e87297fea15a208b",
    "./assets/images/splash-512x512.png?9e38b25e0a53416b7b986a4e8c7843df",
    "./browserconfig.xml?3c890a46f84b2272f8e9e83e75acc8c6",
    "./favicon.ico?c674b958d2e6cee819f853a9cdcf9648",
    "./site.webmanifest?13d048262cef59040f6ab5ffafb1228f",
    "./style.a18f7564bd20181b781c.css",
    "./main.ccf9b36fa1c5b4be0ca6.js",
    "./index.html"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)n.d(r,u,function(t){return e[t]}.bind(null,u));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){self.addEventListener("install",function(e){var t=new Request("index.html");e.waitUntil(fetch(t).then(function(e){return caches.open("vanilla-fw").then(function(n){return n.put(t,e)})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(){return caches.keys().then(function(e){return e.forEach(function(e){"vanilla-fw"!==e&&caches.delete(e)}),self.clients.claim()})}),self.addEventListener("fetch",function(e){var t=e.request;if(t.url.indexOf("/#/")>-1){var n=t.url.split("#/")[0];t=new Request(n)}0===t.url.indexOf("http")&&e.waitUntil(function(e){return caches.open("vanilla-fw").then(function(t){return fetch(e).then(function(n){return t.put(e,n)})})}(t).catch(function(e){})),e.respondWith(fetch(t).catch(function(){return caches.open("vanilla-fw").then(function(e){return e.match(t).then(function(e){return e&&404!==e.status?e:Promise.reject("no-match")})})}))})}]);