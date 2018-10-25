import {$delegate, $on, $parent, qs} from './helper';

export class ListView {
    constructor(page, template) {
        this.template = template;
        this.$todoList = qs('.todo-list', page);
    }

    static _itemId(element) {
        const li = $parent(element, 'paper-item');
        return parseInt(li.dataset.id, 10);
    };

    _removeItem(id) {
        const item = qs('[data-id="' + id + '"]', this.$todoList);
        if (!item) {
            return;
        }
        const elem = $parent(item, 'vaadin-context-menu')
        if (!elem) {
            return;
        }
        this.$todoList.removeChild(elem);
    };

    _updateItem(item) {
        const listItem = qs('[data-id="' + item.id + '"]', this.$todoList);
        if (!listItem) {
            return;
        }

        const check = qs('paper-checkbox', listItem);
        const title = qs('.label', listItem);

        if (item.completed) {
            listItem.classList.add('completed');
            listItem.classList.remove('active');
        } else {
            listItem.classList.add('active');
            listItem.classList.remove('completed');
        }

        check.checked = item.completed;
        title.innerHTML = item.title;
    };

    render(viewCmd, parameter) {
        const viewCommands = {
            showItems: () => {
                this.$todoList.innerHTML = this.template.show(parameter);
            },
            removeItem: () => {
                this._removeItem(parameter);
            },
            addItem: () => {
                this.$todoList.insertAdjacentHTML('beforeend', this.template.show([parameter]));
            },
            updateItem: () => {
                this._updateItem(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    bind(event, handler) {
        if (event === 'itemToggle') {
            $delegate(this.$todoList, 'paper-item paper-checkbox', 'change', function () {
                handler({
                    id: ListView._itemId(this),
                    completed: this.checked
                });
            });
        }
    };
}
