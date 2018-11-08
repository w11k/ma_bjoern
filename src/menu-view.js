export class MenuView {
    constructor(page) {
        this.$slidingMenu = $(page).data('bmd.drawer');
        this.$openHome = $(page).find('[action="open-home"]');
        this.$openSettings = $(page).find('[action="open-settings"]');
        this.$openAbout = $(page).find('[action="open-about"]');
    }

    render(viewCmd, parameter) {
        const viewCommands = {
            closeMenu: () => {
                this._closeMenu();
            }
        };

        return viewCommands[viewCmd]();
    };

    bind(event, handler) {
        if (event === 'openHome') {
            this.$openHome.on('click', handler);
        } else if (event === 'openSettings') {
            this.$openSettings.on('click', handler);
        } else if (event === 'openAbout') {
            this.$openAbout.on('click', handler);
        }
    };

    _closeMenu() {
        this.$slidingMenu.hide();
    }
}