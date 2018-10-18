import {$on, qs} from './helper';

export class AboutView {
    constructor(page) {
        this.$openMenu = qs('[action="open-menu"]', page);
        page.setAttribute('shown', '');
    }

    bind(event, handler) {
        if (event === 'openMenu') {
            $on(this.$openMenu, 'click', handler);
        }
    };
}