import BootstrapMenu from 'bootstrap-menu';
import {ListView} from './list-view';
import {MenuView} from './menu-view';
import {NavigatorView} from './navigator-view';
import {TabView} from './tab-view';

function noop() {

}

export class Controller {
    constructor(model, template) {
        this.model = model;
        this.template = template;
        this._setActiveRoute(this._extractActiveRoute(document.location.hash));

        new BootstrapMenu('.todo-list-item', {
            fetchElementData: $rowElem => ListView._itemId($rowElem),
            actionsGroups: [
                ['editItem', 'deleteItem' ],
                ['cancel']
            ],
            actions: {
                editItem: {
                    name: 'Edit',
                    classNames: 'dropdown-item',
                    onClick: id => this._editItem(id)
                },
                deleteItem: {
                    name: 'Delete',
                    classNames: 'dropdown-item',
                    onClick: id => this._removeItem(id)
                },
                cancel: {
                    name: 'Cancel',
                    classNames: 'dropdown-item',
                    onClick: noop
                }
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
            case 'tabbar':
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
        this[pageName + 'View'] = new ListView(component, this.template);

        this[pageName + 'View'].bind('itemSelect', (item) => {
            this._selectItem(item.id);
        });

        this[pageName + 'View'].bind('itemToggle', (item) => {
            this._updateItem(item);
        });
    }

    _createTabView(component) {
        this.tabView = new TabView(component);

        this.tabView.bind('newTodo', () => {
            this._addItem();
        });

        this.tabView.bind('switchTab', (route) => {
            this._setActiveRoute(route);
        });
    }

    _createMenuView(component) {
        this.menuView = new MenuView(component);

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
        this.navigatorView = new NavigatorView(component);
    }

    _fillListView(page) {
        this.model.read((data) => {
            this[page + 'View'].render('showItems', data);
        });
    };

    _selectItem(id) {
        window.ons.openActionSheet({
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
                    this._editItem(id);
                    break;
                case 1:
                    this._removeItem(id);
                    break;
                default:
                    break;
            }
        });
    }

    _createEditDialog(callback, oldTitle = '') {
        const dialog = $('#modalPrompt');
        const title = dialog.find('#modalTitle');
        const input = dialog.find('#modalTitleInput');
        const button = dialog.find('#modalSaveButton');

        title.html(oldTitle !== '' ? 'Edit Item' : 'Create Item');
        input.val(oldTitle);
        const submit = () => {
            const newTitle = input.val().trim();
            if (newTitle === '') {
                return;
            }
            dialog.modal('hide');
            callback(newTitle);
        };
        button.on('click', submit);
        input.keypress(e => e.which === 13 ? submit() : noop);
        dialog.on('shown.bs.modal', () => {
            input.focus();
        });
        dialog.on('hidden.bs.modal', () => {
            input.off();
            button.off();
            dialog.off();
        });
        dialog.modal('show');
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

    _setContentByRoute(route) {
        switch (route) {
            case 'All':
            case 'Active':
            case 'Completed':
                this.navigatorView.render('loadPage', 'tabbar.html')
                    .then(() => {
                        this._setTabByRoute(this._activeRoute);
                        this._closeMenu();
                    });
                break;
            case 'Settings':
                this.navigatorView.render('loadPage', 'settings.html')
                    .then(() => this._closeMenu());
                break;
            case 'About':
                this.navigatorView.render('loadPage', 'about.html')
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
