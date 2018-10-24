import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';
import {Store} from "./store";
import {Model} from "./model";
import {Template} from "./template";
import {Controller} from "./controller";
import {$on, qs} from "./helper";


class Todo {
    constructor(name) {
        this.storage = new Store(name);
        this.model = new Model(this.storage);
        this.template = new Template();
        this.controller = new Controller(this.model, this.template);
    }
}

const todo = new Todo('vanilla-wc');

function setView(node) {
    if (node.id && node.id.indexOf('page_') === 0) {
        todo.controller.setView(node);
    }
}

const navigator = qs('#page_navigator');
$on(window, 'load', () => setView(navigator));
$on(window, 'hashchange', () => todo.controller.handleManualHashChange());

new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        for (const node of mutation.addedNodes) {
            setView(node);
        }
    }
}).observe(navigator, {childList: true, subtree: true});