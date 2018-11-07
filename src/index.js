import 'bootstrap-material-design';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import './style.scss';

if (navigator.serviceWorker.controller) {
    console.log('[PWA] active service worker found, no need to register')
} else {
    //Register the ServiceWorker
    runtime.register().then(reg => {
        console.log('[PWA] Service worker has been registered for scope:'+ reg.scope);
    });
}

$(document).ready(function () {
    $('body').bootstrapMaterialDesign();
});