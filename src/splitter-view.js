import {qs} from "./helper";

export class SplitterView {
    constructor(page) {
        this.$navigator = qs('ons-navigator', page);
    }

    render(viewCmd, parameter) {
        const self = this;
        const viewCommands = {
            pushPage: () => {
                return self._pushPage(parameter);
            },
            loadPage: () => {
                return self._loadPage(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    _pushPage(pageID) {
        return this.$navigator.pushPage(pageID);
    }

    _loadPage(pageID) {
        return this.$navigator.bringPageTop(pageID, {animation: 'none'});
    }
}