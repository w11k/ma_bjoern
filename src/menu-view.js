import {$on, qs} from "./helper";

export class MenuView {
    constructor(page) {
        const self = this;
        self.$slidingMenu = page.parentNode;
        self.$openHome = qs('[action="open-home"]', page);
        self.$openSettings = qs('[action="open-settings"]', page);
        self.$openAbout = qs('[action="open-about"]', page);

        $on(self.$slidingMenu.nextElementSibling.nextElementSibling, 'click', () => {
            this._closeMenu();
        });
    }

    render(viewCmd, parameter) {
        const self = this;
        const viewCommands = {
            openMenu: () => {
                self._openMenu();
            },
            closeMenu: () => {
                self._closeMenu();
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