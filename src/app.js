import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import './menu-element';
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

class RootElement extends HTMLElement {
    constructor() {
        super();

        this.storage = new Store('vanilla-wc');
        this.model = new Model(this.storage);
        this.template = new Template();
        this.controller = new Controller(this.model, this.template);

        $on(document, 'init', (event) => {
            this.setView(event.detail);
        });
        $on(window, 'hashchange', () => this.controller.handleManualHashChange());

        const shadowRoot = this.attachShadow({mode: 'open'});
        const styles = `
        `;
        shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="./style.css">
            <style>${styles}</style>
            <app-drawer-layout>
                <my-app-drawer slot="drawer" swipe-open="true" id="page_menu">
                    <app-toolbar>Todo-App</app-toolbar>
            
                    <div role="listbox">
                        <paper-item action="open-home" class="border_bottom">
                            Home
                            <paper-ripple></paper-ripple>
                        </paper-item>
                        <paper-item action="open-settings" class="border_bottom">
                            Settings
                            <paper-ripple></paper-ripple>
                        </paper-item>
                        <paper-item action="open-about" class="border_bottom">
                            About
                            <paper-ripple></paper-ripple>
                        </paper-item>
                    </div>
                </my-app-drawer>
                <app-header-layout>
                    <app-header slot="header" reveals effects="waterfall">
                        <app-toolbar>
                            <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
                            <div main-title>Todo-App</div>
                        </app-toolbar>
                    </app-header>
                    <iron-pages id="page_navigator"></iron-pages>
                </app-header-layout>
            </app-drawer-layout>
        `;


        // TODO: remove
        new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const node of mutation.addedNodes) {
                    this.setView(node);
                }
            }
        }).observe(shadowRoot, {childList: true, subtree: true});
        this.setView(qs('#page_navigator', shadowRoot));
    }


    setView(node) {
        if (node.id && node.id.indexOf('page_') === 0) {
            this.controller.registerElement(node);
        }
    }
}

$on(window, 'WebComponentsReady', () => {
    customElements.define('my-app-root', RootElement);
});
