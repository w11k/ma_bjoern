import {qs} from './helper';

export class SplitterView {
    constructor(page) {
        this.$navigator = qs('ons-navigator', page);
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
        return this.$navigator.bringPageTop(pageID, {animation: 'none'});
    }
}