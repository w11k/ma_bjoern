/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
  "/ma_bjoern/react-wc/precache-manifest.a03372efeff11fc745fb4e6c53b91f1a.js"
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "/ma_bjoern/react-wc/apple-touch-icon.png",
    "revision": "b4d0a128e681954979d6b1f7a7a713f6"
  },
  {
    "url": "/ma_bjoern/react-wc/browserconfig.xml",
    "revision": "a7efaece65b01ea08e85ea874b293c92"
  },
  {
    "url": "/ma_bjoern/react-wc/favicon.ico",
    "revision": "c674b958d2e6cee819f853a9cdcf9648"
  },
  {
    "url": "/ma_bjoern/react-wc/manifest.json",
    "revision": "1df0aaea2045440728ff1b4c4948056e"
  },
  {
    "url": "/ma_bjoern/react-wc/vendor/custom-elements-es5-adapter.js",
    "revision": "ab073ba059d1e990f93247eacbc4fba4"
  },
  {
    "url": "/ma_bjoern/react-wc/vendor/webcomponents-bundle.js",
    "revision": "ba9bab8c93719b2338f3be99d38a4857"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/ma_bjoern/react-wc/index.html", {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

workbox.routing.registerRoute("/ma_bjoern/react-wc/assets/(.*)", workbox.strategies.staleWhileRevalidate(), 'GET');
