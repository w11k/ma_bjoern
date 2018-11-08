export class NavigatorView {
    constructor(page) {
        this.$navigator = $(page).find('#navigator-content');
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
        const template = $(`template[id="${pageID}"]`)[0];
        const clone = document.importNode(template.content, true);
        this.$navigator.html(clone);
        return Promise.resolve();
    }
}