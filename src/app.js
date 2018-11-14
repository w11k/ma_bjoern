import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {Controller} from './controller';
import {$on} from './helper';
import './menu-element';
import {Model} from './model';
import './navigator-element';
import {Store} from './store';
import './style.scss';
import {Template} from './template';

require.context('../static/', true);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        runtime.register({scope: '/ma_bjoern/vanilla-wc/'})
            .then(registration => {
                // periodically check (each hour) if there is a new version of the Service Worker
                setInterval(() => {
                    registration.update();
                }, 3600000);
            });
    });
}

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

        this.attachShadow({mode: 'open'});
        const styles = `
            :host {
                display: block;
                height: 100%;
            }
            
            app-header {
                background-color: #222195;
                color: #fff;
                box-shadow: -60px -60px 0 60px #222195;
            }

            paper-icon-button {
                --paper-icon-button-ink-color: white;
            }
            
            app-drawer-layout, app-header-layout {
                height: 100%;
            }
            
            app-drawer-layout:not([narrow]) [drawer-toggle] {
                display: none;
            }

            app-drawer {
                border-right: 1px solid #eee;
            }
        `;
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <app-drawer-layout>
                <app-drawer slot="drawer" swipe-open="true">
                    <my-menu id="page_menu"></my-menu>
                </app-drawer>
                <app-header-layout>
                    <app-header slot="header" reveals effects="waterfall">
                        <app-toolbar>
                            <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
                            <div main-title>Todo-App</div>
                        </app-toolbar>
                    </app-header>
                    <my-navigator id="page_navigator"></my-navigator>
                </app-header-layout>
            </app-drawer-layout>
        `;
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
