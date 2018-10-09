import {$on, qs} from "./helper";

export class SettingsView {
    constructor(page) {
        this.$openMenu = qs('[action="open-menu"]', page);
    }

    bind(event, handler) {
        if (event === 'openMenu') {
            $on(this.$openMenu, 'click', handler);
        }
    };
}