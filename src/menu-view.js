import {$on, qs} from './helper';

export class MenuView {
    constructor(page) {
        this.$slidingMenu = page.parentNode;
        this.$openHome = qs('[action="open-home"]', page);
        this.$openSettings = qs('[action="open-settings"]', page);
        this.$openAbout = qs('[action="open-about"]', page);
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
        this.$slidingMenu.open();
    }

    _closeMenu() {
        if (this.$slidingMenu.opened && !this.$slidingMenu.persistent) {
            this.$slidingMenu.close();
        }
    }
}