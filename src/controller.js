import {ListView} from "./list-view";
import {TabView} from "./tab-view";
import {MenuView} from "./menu-view";
import {SplitterView} from "./splitter-view";
import {AboutView} from "./about-view";
import {SettingsView} from "./settings-view";

export class Controller {
    /**
     * Takes a model and view and acts as the controller between them
     *
     * @constructor
     * @param {object} model The model instance
     * @param {object} template The template instance
     * @param {object} ons onsen ui object
     */
    constructor(model, template, ons) {
        this.model = model;
        this.template = template;
        this.ons = ons;
        this._setActiveRoute(this._extractActiveRoute(document.location.hash));
    }

    /**
     * Loads and initialises the view
     *
     * @param {Object} component
     */
    setView(component) {
        const pageName = component.id.split('/')[1];
        switch (pageName) {
            case 'all':
            case 'active':
            case 'completed':
                this._createListView(pageName, component);
                this._fillListView(pageName);
                this._setTabByRoute(this._activeRoute);
                break;
            case 'tabbar':
                this._createTabView(component);
                this._updateCount();
                break;
            case 'menu':
                this._createMenuView(component);
                break;
            case 'splitter':
                this._createSplitterView(component);
                this._setContentByRoute(this._activeRoute);
                break;
            case 'settings':
                this._createSettingsView(component);
                break;
            case 'about':
                this._createAboutView(component);
                break;
            default:
                break;
        }
    };

    _extractActiveRoute(locationHash) {
        const route = locationHash.split('/')[1] || '';
        if (['all', 'active', 'completed', 'settings', 'about'].indexOf(route) < 0) {
            return 'All';
        }
        return route.charAt(0).toUpperCase() + route.substr(1);
    }

    _createListView(pageName, component) {
        const self = this;
        self[pageName + 'View'] = new ListView(component, self.template);

        self[pageName + 'View'].bind('itemEdit', (item) => {
            self.editItem(item.id);
        });

        self[pageName + 'View'].bind('itemSelect', (item) => {
            self.selectItem(item.id);
        });

        self[pageName + 'View'].bind('itemRemove', (item) => {
            self.removeItem(item.id);
        });

        self[pageName + 'View'].bind('itemToggle', (item) => {
            self.toggleComplete(item.id, item.completed);
        });
    }

    _createTabView(component) {
        const self = this;
        self.tabView = new TabView(component);

        self.tabView.bind('openMenu', () => {
            self._openMenu();
        });

        self.tabView.bind('newTodo', () => {
            self.addItem();
        });

        self.tabView.bind('switchTab', (route) => {
            self._setActiveRoute(route);
        });
    }

    _createMenuView(component) {
        const self = this;
        self.menuView = new MenuView(component);

        self.menuView.bind('openHome', () => {
            this._setActiveRoute('All');
            this._setContentByRoute(this._activeRoute);
        });

        self.menuView.bind('openSettings', () => {
            this._setActiveRoute('Settings');
            this._setContentByRoute(this._activeRoute);
        });

        self.menuView.bind('openAbout', () => {
            this._setActiveRoute('About');
            this._setContentByRoute(this._activeRoute);
        });
    }

    _createSplitterView(component) {
        this.splitterView = new SplitterView(component);
    }

    _createSettingsView(component) {
        this.settingsView = new SettingsView(component);

        this.settingsView.bind('openMenu', () => {
            this._openMenu();
        });
    }

    _createAboutView(component) {
        this.aboutView = new AboutView(component);

        this.aboutView.bind('openMenu', () => {
            this._openMenu();
        });
    }

    /**
     * An event to fire on load. Will get all items and display them in the
     * todo-list
     */
    _fillListView(page) {
        const self = this;
        const query = {};
        switch (page) {
            case 'active':
                query.completed = false;
                break;
            case 'completed':
                query.completed = true;
                break;
        }
        self.model.read(query, (data) => {
            self[page + 'View'].render('showEntries', data);
        });
    };

    selectItem(id) {
            this.ons.openActionSheet({
                cancelable: true,
                buttons: [
                    'Edit',
                    {
                        label: 'Delete',
                        modifier: 'destructive'
                    },
                    {
                        label: 'Cancel',
                        icon: 'md-close'
                    }
                ]
            }).then((index) => {
                switch (index) {
                    case 0:
                        this.editItem(id);
                        break;
                    case 1:
                        this.removeItem(id);
                        break;
                    default:
                        break;
                }
            });
    }

    /**
     * An event to fire whenever you want to add an item. Simply pass in the event
     * object and it'll handle the DOM insertion and saving of the new item.
     */
    addItem(title) {
        return console.log('event');
        const self = this;

        if (title.trim() === '') {
            return;
        }

        self.model.create(title, () => {
            self.view.render('clearNewTodo');
            self._filter(true);
        });
    };

    /*
     * Triggers the item editing mode.
     */
    editItem(id) {
        const self = this;
        self.model.read(id, (data) => {
            self.view.render('editItem', {id: id, title: data[0].title});
        });
    };

    /*
     * Finishes the item editing mode successfully.
     */
    editItemSave(id, title) {
        const self = this;
        title = title.trim();

        if (title.length !== 0) {
            self.model.update(id, {title: title}, () => {
                self.view.render('editItemDone', {id: id, title: title});
            });
        } else {
            self.removeItem(id);
        }
    };

    /*
     * Cancels the item editing mode.
     */
    editItemCancel(id) {
        const self = this;
        self.model.read(id, (data) => {
            self.view.render('editItemDone', {id: id, title: data[0].title});
        });
    };

    /**
     * By giving it an ID it'll find the DOM element matching that ID,
     * remove it from the DOM and also remove it from storage.
     *
     * @param {number} id The ID of the item to remove from the DOM and
     * storage
     */
    removeItem(id) {
        const self = this;
        self.model.remove(id, () => {
            self.allView.render('removeItem', id);
            self.activeView.render('removeItem', id);
            self.completedView.render('removeItem', id);
            this._updateCount();
        });
    };

    /**
     * Give it an ID of a model and a checkbox and it will update the item
     * in storage based on the checkbox's state.
     *
     * @param {number} id The ID of the element to complete or uncomplete
     * @param {object} completed The checkbox to check the state of complete
     *                          or not
     * @param {boolean|undefined} silent Prevent re-filtering the todo items
     */
    toggleComplete(id, completed, silent = false) {
        const self = this;
        self.model.update(id, {completed: completed}, () => {
            self.view.render('elementComplete', {
                id: id,
                completed: completed
            });
        });

        if (!silent) {
            self._filter();
        }
    };

    /**
     * Updates the pieces of the page which change depending on the remaining
     * number of todos.
     */
    _updateCount() {
        const self = this;
        self.model.getCount((todos) => {
            self.tabView.render('updateElementCount', todos);
        });
    };

    _setTabByRoute(pageName) {
        let command = 'changeTab';
        if (!this.allView || !this.activeView || !this.completedView) {
            command = 'setTab';
        }
        this.tabView.render(command, pageName);
    }

    _setActiveRoute(newRoute, addHistoryState = true) {
        this._activeRoute = newRoute;
        this._setPageTitle(newRoute);
        if (addHistoryState) {
            window.history.pushState(this._getStateToSave(), newRoute, `#/${newRoute.toLowerCase()}`);
        }
    }

    _getStateToSave() {
        return undefined;
    }

    _setPageTitle(title) {
        document.title = `Todo-App – ${title} Todos`;
    }

    _openMenu() {
        this.menuView.render('openMenu');
    }

    _setContentByRoute(route, animate = false) {
        const command = animate ? 'pushPage' : 'loadPage';
        switch (route) {
            case 'All':
            case 'Active':
            case 'Completed':
                this.splitterView.render(command, 'tabbar.html')
                    .then(() => this._closeMenu());
                break;
            case 'Settings':
                this.splitterView.render(command, 'settings.html')
                    .then(() => this._closeMenu());
                break;
            case 'About':
                this.splitterView.render(command, 'about.html')
                    .then(() => this._closeMenu());
                break;
        }
    }

    _closeMenu() {
        if (this.menuView) {
            this.menuView.render('closeMenu');
        }
    }

    handleManualHashChange() {
        const oldRoute = this._activeRoute;
        this._setActiveRoute(this._extractActiveRoute(document.location.hash), false);
        if (this._activeRoute === oldRoute) {
            return;
        }
        return this._setContentByRoute(this._activeRoute);
    }
}
