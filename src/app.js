// noinspection ES6UnusedImports
import ons from 'onsenui/esm';

if (!ons.platform.isIOS()) {
    ons.platform.select('android');
}
window.ons = ons;

import 'onsenui/esm/elements/ons-action-sheet';
import 'onsenui/esm/elements/ons-action-sheet-button';
import 'onsenui/esm/elements/ons-alert-dialog';
import 'onsenui/esm/elements/ons-alert-dialog-button';
import 'onsenui/esm/elements/ons-checkbox';
import 'onsenui/esm/elements/ons-fab';
import 'onsenui/esm/elements/ons-icon';
import 'onsenui/esm/elements/ons-if';
import 'onsenui/esm/elements/ons-list';
import 'onsenui/esm/elements/ons-list-item';
import 'onsenui/esm/elements/ons-navigator';
import 'onsenui/esm/elements/ons-page';
import 'onsenui/esm/elements/ons-splitter';
import 'onsenui/esm/elements/ons-splitter-content';
import 'onsenui/esm/elements/ons-splitter-side';
import 'onsenui/esm/elements/ons-tab';
import 'onsenui/esm/elements/ons-tabbar';
import 'onsenui/esm/elements/ons-toolbar';
import 'onsenui/esm/elements/ons-toolbar-button';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {Controller} from './controller';
import {$on} from './helper';
import {Model} from './model';
import {Store} from './store';
import './style.scss';
import {Template} from './template';

require.context('../static/', true);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        runtime.register({scope: '/ma_bjoern/vanilla-nui/'})
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

const todo = new Todo('vanilla-nui');

function setView(event) {
    if (event.target.id) {
        todo.controller.setView(event.target);
    }
}

$on(document, 'init', setView);
$on(window, 'hashchange', () => todo.controller.handleManualHashChange());