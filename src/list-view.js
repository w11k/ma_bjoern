import {$delegate, $parent, qs} from './helper';

export class ListView {
    constructor(page, template) {
        this.template = template;
        this.$todoList = qs('.todo-list', page);
    }

    static _itemId(element) {
        const li = $parent(element, 'ons-list-item');
        return parseInt(li.dataset.id, 10);
    };

    _removeItem(id) {
        const elem = qs('[data-id="' + id + '"]', this.$todoList);

        if (elem) {
            this.$todoList.removeChild(elem);
        }
    };

    _updateItem(item) {
        const listItem = qs('[data-id="' + item.id + '"]', this.$todoList);
        if (!listItem) {
            return;
        }

        const check = qs('ons-checkbox', listItem);
        const title = qs('label.center', listItem);

        if (item.completed) {
            listItem.classList.add('completed');
            listItem.classList.remove('active');
            check.setAttribute('checked', '');
        } else {
            listItem.classList.add('active');
            listItem.classList.remove('completed');
            check.removeAttribute('checked');
        }

        title.innerHTML = item.title;
    };

    _toggleItem(id, completed) {
        let listItem = qs('[data-id="' + id + '"]', this.$todoList);

        if (!listItem) {
            return;
        }

        // In case it was toggled from an event and not by clicking the checkbox
        listItem.checked = completed;
    };

    _editItem(id, title) {
        let listItem = qs('[data-id="' + id + '"]', this.$todoList);

        if (!listItem) {
            return;
        }

        listItem.className = listItem.className + ' editing';

        const input = document.createElement('input');
        input.className = 'edit';

        listItem.appendChild(input);
        input.focus();
        input.value = title;
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
                this.$todoList.appendChild(window.ons._util.createElement(this.template.show([parameter])));
            },
            updateItem: () => {
                this._updateItem(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    bind(event, handler) {
        if (event === 'itemSelect') {
            $delegate(this.$todoList, 'ons-list-item label', 'click', function () {
                handler({id: ListView._itemId(this)});
            });
        } else if (event === 'itemToggle') {
            $delegate(this.$todoList, 'ons-list-item ons-checkbox input', 'click', function () {
                handler({
                    id: ListView._itemId(this),
                    completed: this.checked
                });
            });
        }
    };
}
