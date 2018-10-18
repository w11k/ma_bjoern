// noinspection ES6UnusedImports
import ons from 'onsenui/esm';
if (!ons.platform.isIOS()) {
    ons.platform.select('android');
}
window.ons = ons;
import 'onsenui/esm/elements/ons-navigator';
import 'onsenui/esm/elements/ons-splitter';
import 'onsenui/esm/elements/ons-splitter-side';
import 'onsenui/esm/elements/ons-splitter-content';
import 'onsenui/esm/elements/ons-page';
import 'onsenui/esm/elements/ons-toolbar';
import 'onsenui/esm/elements/ons-toolbar-button';
import 'onsenui/esm/elements/ons-if';
import 'onsenui/esm/elements/ons-fab';
import 'onsenui/esm/elements/ons-icon';
import 'onsenui/esm/elements/ons-list';
import 'onsenui/esm/elements/ons-list-item';
import 'onsenui/esm/elements/ons-list-header';
import 'onsenui/esm/elements/ons-checkbox';
import 'onsenui/esm/elements/ons-tabbar';
import 'onsenui/esm/elements/ons-tab';
import 'onsenui/esm/elements/ons-action-sheet';
import 'onsenui/esm/elements/ons-action-sheet-button';
import 'onsenui/esm/elements/ons-alert-dialog';
import 'onsenui/esm/elements/ons-alert-dialog-button';
import {Store} from "./store";
import {Model} from "./model";
import {Template} from "./template";
import {$on} from "./helper";
import {Controller} from "./controller";

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
    console.log('init');
    if (event.target.id) {
        console.log(event.target.id);
        todo.controller.setView(event.target);
    }
}

$on(document, 'init', setView);
$on(window, 'hashchange', () => todo.controller.handleManualHashChange());