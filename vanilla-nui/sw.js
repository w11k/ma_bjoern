var serviceWorkerOption = {
  "assets": [
    "./assets/fonts/Material-Design-Iconic-Font.woff2",
    "./assets/fonts/Material-Design-Iconic-Font.woff",
    "./assets/fonts/Material-Design-Iconic-Font.ttf",
    "./assets/fonts/ionicons.eot",
    "./assets/fonts/ionicons.woff",
    "./assets/fonts/ionicons.ttf",
    "./assets/fonts/ionicons.woff2",
    "./assets/fonts/ionicons.svg",
    "./assets/fonts/fontawesome-webfont.eot",
    "./assets/fonts/fontawesome-webfont.woff2",
    "./assets/fonts/fontawesome-webfont.ttf",
    "./assets/fonts/fontawesome-webfont.svg",
    "./assets/fonts/fontawesome-webfont.woff",
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
    "./assets/fonts/safari-pinned-tab.svg",
    "./assets/images/splash-512x512.png?9e38b25e0a53416b7b986a4e8c7843df",
    "./browserconfig.xml?4f4c65063b4938f4f53d1452e324fee7",
    "./favicon.ico?c674b958d2e6cee819f853a9cdcf9648",
    "./site.webmanifest?afeac57aeca0f774641b4edd7c5485d6",
    "./style.7923f6b836aaa0c2f287.css",
    "./main.8582ffc599e160d3adcb.js",
    "./index.html"
  ]
};
        
        !function(e){var n={};function t(r){if(n[r])return n[r].exports;var u=n[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,t),u.l=!0,u.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var u in e)t.d(r,u,function(n){return e[n]}.bind(null,u));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";self.addEventListener("install",function(e){var n=new Request("index.html");e.waitUntil(fetch(n).then(function(e){return caches.open("vanilla-nui").then(function(t){return t.put(n,e)})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(){return caches.keys().then(function(e){return e.forEach(function(e){"vanilla-nui"!==e&&caches.delete(e)}),self.clients.claim()})}),self.addEventListener("fetch",function(e){var n=e.request;if(n.url.indexOf("/#/")>-1){var t=n.url.split("#/")[0];n=new Request(t)}0===n.url.indexOf("http")&&e.waitUntil(function(e){return caches.open("vanilla-nui").then(function(n){return fetch(e).then(function(t){return n.put(e,t)})})}(n).catch(function(e){})),e.respondWith(fetch(n).catch(function(){return caches.open("vanilla-nui").then(function(e){return e.match(n).then(function(e){return e&&404!==e.status?e:Promise.reject("no-match")})})}))})}]);