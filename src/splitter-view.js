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
            },
            popPage: () => {
                return self._popPage();
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

    _popPage() {
        return this.$navigator.popPage().then((component) => component.id);
    }
}