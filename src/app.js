import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-badge/paper-badge';
import '@polymer/paper-fab/paper-fab';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-ripple/paper-ripple';
import '@polymer/iron-pages/iron-pages';
import 'carbon-copy/b-c-c';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
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

$on(window, 'WebComponentsReady', () => {
    setView(qs('#page_menu'));
    setView(qs('#page_navigator'));
});
$on(window, 'hashchange', () => todo.controller.handleManualHashChange());

new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        for (const node of mutation.addedNodes) {
            setView(node);
        }
    }
}).observe(document, {childList: true, subtree: true});