import {qs} from './helper';

export class NavigatorView {
    constructor(navigator, pages) {
        this.$navigator = navigator;
        for (const page of pages) {
            const template = qs(`[id="${page}"]`);
            if (!template.content) {
                continue;
            }
            const node = document.importNode(template.content, true);
            this.$navigator.appendChild(node);
        }
    }

    render(viewCmd, parameter) {
        const viewCommands = {
            loadPage: () => {
                return this._loadPage(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    _loadPage(pageID) {
        return this.$navigator.selectIndex(pageID);
    }
}