import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-ripple/paper-ripple';
import {$on, qs} from "./helper";

class MenuElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const styles = `
            :host {
                display: block;
            }
            
            paper-item:before {
                display: none !important;
            }
            
            paper-item.border_bottom {
                border-bottom: 1px solid #eee;
            }
            
            paper-item {
                cursor: pointer;
            }
        `;
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
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
        `;

        this.$openHome = qs('[action="open-home"]', this.shadowRoot);
        this.$openSettings = qs('[action="open-settings"]', this.shadowRoot);
        this.$openAbout = qs('[action="open-about"]', this.shadowRoot);
    }

    static get is() {
        return 'my-menu';
    }

    connectedCallback() {
        this.dispatchEvent(new CustomEvent('init', {bubbles: true, composed: true, detail: this}));
    }

    render(viewCmd, parameter) {
        const viewCommands = {
            openMenu: () => {
                this._openMenu();
            },
            closeMenu: () => {
                this._closeMenu();
            }
        };

        return viewCommands[viewCmd]();
    };

    bind(event, handler) {
        if (event === 'openHome') {
            $on(this.$openHome, 'click', handler);
        } else if (event === 'openSettings') {
            $on(this.$openSettings, 'click', handler);
        } else if (event === 'openAbout') {
            $on(this.$openAbout, 'click', handler);
        }
    };

    _openMenu() {
        this.parentNode.open();
    }

    _closeMenu() {
        if (this.parentNode.opened && !this.parentNode.persistent) {
            this.parentNode.close();
        }
    }
}

customElements.define(MenuElement.is, MenuElement);