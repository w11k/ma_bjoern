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
  "/ma_bjoern/react-nui/precache-manifest.68861bf1c57c60e29d9c15f66122f4ba.js"
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "/ma_bjoern/react-nui/apple-touch-icon.png",
    "revision": "b4d0a128e681954979d6b1f7a7a713f6"
  },
  {
    "url": "/ma_bjoern/react-nui/browserconfig.xml",
    "revision": "eb4d3a2a8d87095d0dbf1d5d4efa6673"
  },
  {
    "url": "/ma_bjoern/react-nui/favicon.ico",
    "revision": "c674b958d2e6cee819f853a9cdcf9648"
  },
  {
    "url": "/ma_bjoern/react-nui/manifest.json",
    "revision": "be9f3283756ab7e410a8e7e9180dd3c6"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/ma_bjoern/react-nui/index.html", {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

workbox.routing.registerRoute("/ma_bjoern/react-nui/assets/(.*)", workbox.strategies.staleWhileRevalidate(), 'GET');
