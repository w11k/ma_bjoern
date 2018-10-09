import {qs} from "./helper";

export class SplitterView {
    constructor(page) {
        this.$content = qs('ons-splitter-content', page);
    }

    render(viewCmd, parameter) {
        const self = this;
        const viewCommands = {
            setPage: () => {
                return self._setPage(parameter);
            },
            loadPage: () => {
                return self._loadPage(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    _setPage(pageID) {
        this.$content.page = pageID;
        return Promise.resolve();
    }

    _loadPage(pageID) {
        return this.$content.load(pageID);
    }
}