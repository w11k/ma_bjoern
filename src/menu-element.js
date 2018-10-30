import '@polymer/app-layout/app-drawer/app-drawer';
import {$on, qs} from "./helper";

const AppDrawerElement = customElements.get('app-drawer');

class MenuElement extends AppDrawerElement {
    constructor() {
        super();

        this.$openHome = qs('[action="open-home"]', this);
        this.$openSettings = qs('[action="open-settings"]', this);
        this.$openAbout = qs('[action="open-about"]', this);
    }

    static get is() {
        return 'my-app-drawer';
    }

    ready() {
        super.ready();

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
        this.open();
    }

    _closeMenu() {
        if (this.opened && !this.persistent) {
            this.close();
        }
    }
}

customElements.define(MenuElement.is, MenuElement);