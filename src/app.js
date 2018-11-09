import 'bootstrap-material-design';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {Controller} from './controller';
import {Model} from './model';
import {Store} from './store';
import './style.scss';
import {Template} from './template';

require.context('../static/', true);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        runtime.register()
            .then(registration => {
                // periodically check (each hour) if there is a new version of the Service Worker
                setInterval(() => {
                    registration.update();
                }, 3600000);
            });
    });
}

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