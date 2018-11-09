import 'bootstrap-material-design';
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {Controller} from './controller';
import {Model} from './model';
import {Store} from './store';
import './style.scss';
import {Template} from './template';

/*if (navigator.serviceWorker.controller) {
    console.log('[PWA] active service worker found, no need to register');
} else {
    //Register the ServiceWorker
    runtime.register().then(reg => {
        console.log('[PWA] Service worker has been registered for scope:' + reg.scope);
    });
}*/

class Todo {
    constructor(name) {
        this.storage = new Store(name);
        this.model = new Model(this.storage);
        this.template = new Template();
        this.controller = new Controller(this.model, this.template);
    }
}

$(document).ready(function () {
    $('body').bootstrapMaterialDesign();

    const todo = new Todo('vanilla-fw');

    function registerElement(event) {
        if (event.target.id) {
            todo.controller.registerElement(event.target);
        }
    }

    $(document).on('init', registerElement);
    $(window).on('hashchange', () => todo.controller.handleManualHashChange());

    todo.controller.registerElement($('#page_navigator')[0]);
    todo.controller.registerElement($('#page_menu')[0]);
});