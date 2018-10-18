import {$on, qs} from './helper';

export class MenuView {
    constructor(page) {
        this.$slidingMenu = page.parentNode;
        this.$openHome = qs('[action="open-home"]', page);
        this.$openSettings = qs('[action="open-settings"]', page);
        this.$openAbout = qs('[action="open-about"]', page);

        $on(this.$slidingMenu.nextElementSibling.nextElementSibling, 'click', () => {
            this._closeMenu();
        });
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
        if (this.$slidingMenu._state === 'open') {
            this.$slidingMenu.close();
        }
    }
}