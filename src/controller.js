import {$delegate, $parent, getItemId} from "./helper";

export class Controller {
    constructor(model, template) {
        this.model = model;
        this.template = template;
        this._setActiveRoute(this._extractActiveRoute(document.location.hash));

        $delegate(document, 'vaadin-context-menu-overlay', 'click', (event) => {
            const menu = $parent(event.target, 'vaadin-context-menu-overlay');
            if (!menu.content.activeElement || menu.content.activeElement.tagName.toLowerCase() !== 'paper-item') {
                return;
            }
            const button = getItemId(menu.content.activeElement);
            const id = getItemId(menu.model.target);
            switch (button) {
                case 0:
                    this._editItem(id);
                    break;
                case 1:
                    this._removeItem(id);
                    break;
                case 2:
                default:
                    return;
            }
        });
    }

    registerElement(component) {
        const pageName = component.id.split('_')[1];
        switch (pageName) {
            case 'all':
            case 'active':
            case 'completed':
                this._createListView(pageName, component);
                this._fillListView(pageName);
                this._setTabByRoute(this._activeRoute);
                break;
            case 'tabs':
                this._createTabView(component);
                this._updateCount();
                break;
            case 'menu':
                this._createMenuView(component);
                break;
            case 'navigator':
                this._createNavigatorView(component);
                this._setContentByRoute(this._activeRoute);
                break;
            /*case 'settings':
                this._createSettingsView(component);
                break;
            case 'about':
                this._createAboutView(component);
                break;*/
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
        component.template = this.template;
        this[pageName + 'View'] = component;

        this[pageName + 'View'].bind('itemToggle', (item) => {
            this._updateItem(item);
        });
    }

    _createTabView(component) {
        this.tabView = component;

        this.tabView.bind('newTodo', () => {
            this._addItem();
        });

        this.tabView.bind('switchTab', (route) => {
            this._setActiveRoute(route);
            this.tabView.render('setTab', route);
        });
    }

    _createMenuView(component) {
        this.menuView = component;

        this.menuView.bind('openHome', () => {
            this._setActiveRoute('All');
            this._setContentByRoute(this._activeRoute);
        });

        this.menuView.bind('openSettings', () => {
            this._setActiveRoute('Settings');
            this._setContentByRoute(this._activeRoute);
        });

        this.menuView.bind('openAbout', () => {
            this._setActiveRoute('About');
            this._setContentByRoute(this._activeRoute);
        });
    }

    _createNavigatorView(component) {
        this.navigatorView = component;
    }

    _fillListView(page) {
        this.model.read((data) => {
            this[page + 'View'].render('showItems', data);
        });
    };

    _createEditDialog(callback, oldTitle = '') {
        setTimeout(() => {
            const newTitle = window.prompt(oldTitle !== '' ? 'Edit Item' : 'Create Item', oldTitle);
            if (typeof newTitle !== 'string') {
                return;
            } else if (newTitle.trim() === '') {
                return window.alert('No input!');
            }
            callback(newTitle);
        }, 300);
    };

    _addItem() {
        this._createEditDialog((newTitle) => {
            this.model.create(newTitle, (item) => {
                this.allView.render('addItem', item);
                this.activeView.render('addItem', item);
                this.completedView.render('addItem', item);
                this._updateCount();
            });
        });
    };

    _editItem(id) {
        this.model.read(id, ([oldItem]) => {
            this._createEditDialog((newTitle) => {
                oldItem.title = newTitle;
                this._updateItem(oldItem);
            }, oldItem.title);
        });
    };

    _updateItem(item) {
        this.model.update(item.id, item, (updatedItem) => {
            this.allView.render('updateItem', updatedItem);
            this.activeView.render('updateItem', updatedItem);
            this.completedView.render('updateItem', updatedItem);
            this._updateCount();
        });
    };

    _removeItem(id) {
        this.model.remove(id, () => {
            this.allView.render('removeItem', id);
            this.activeView.render('removeItem', id);
            this.completedView.render('removeItem', id);
            this._updateCount();
        });
    };

    _updateCount() {
        this.model.getCount((todos) => {
            this.tabView.render('updateElementCount', todos);
        });
    };

    _setTabByRoute(pageName) {
        if (this.tabView) {
            this.tabView.render('setTab', pageName);
        }
    }

    _setActiveRoute(newRoute, addHistoryState = true) {
        if (newRoute === this._activeRoute) {
            return;
        }
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
        document.title = `Todo-App – ${title}`;
    }

    _openMenu() {
        this.menuView.render('openMenu');
    }

    _setContentByRoute(route) {
        switch (route) {
            case 'All':
            case 'Active':
            case 'Completed':
                this.navigatorView.render('loadPage', 0);
                this._setTabByRoute(this._activeRoute);
                this._closeMenu();
                break;
            case 'Settings':
                this.navigatorView.render('loadPage', 1);
                this._closeMenu();
                break;
            case 'About':
                this.navigatorView.render('loadPage', 2);
                this._closeMenu();
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
