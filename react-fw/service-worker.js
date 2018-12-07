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
  "/ma_bjoern/react-fw/precache-manifest.3b2929ae2600e411696093137ac31c06.js"
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "build/apple-touch-icon.png",
    "revision": "b4d0a128e681954979d6b1f7a7a713f6"
  },
  {
    "url": "build/browserconfig.xml",
    "revision": "00ea8cc2445cf6bceb8c5e6b6020a303"
  },
  {
    "url": "build/favicon.ico",
    "revision": "c674b958d2e6cee819f853a9cdcf9648"
  },
  {
    "url": "build/manifest.json",
    "revision": "45bfba5a2b82496bf1637f4942ffda8a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/ma_bjoern/react-fw/index.html", {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

workbox.routing.registerRoute("/ma_bjoern/react-fw/assets/", workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute("https://fonts.googleapis.com/", workbox.strategies.staleWhileRevalidate(), 'GET');
