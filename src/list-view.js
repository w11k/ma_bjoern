import {$delegate, $parent, qs} from "./helper";

export class ListView {
    /**
     * ListView that abstracts away the browser's DOM completely.
     * It has two simple entry points:
     *
     *   - bind(eventName, handler)
     *     Takes a todo application event and registers the handler
     *   - render(command, parameterObject)
     *     Renders the given command with the options
     */
    constructor(page, template) {
        this.template = template;
        this.$todoList = qs('.todo-list', page);
    }

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
        const self = this;
        const viewCommands = {
            showItems: () => {
                self.$todoList.innerHTML = self.template.show(parameter);
            },
            removeItem: () => {
                self._removeItem(parameter);
            },
            addItem: () => {
                self.$todoList.appendChild(window.ons._util.createElement(self.template.show([parameter])));
            },
            updateItem: () => {
                self._updateItem(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    _itemId(element) {
        const li = $parent(element, 'ons-list-item');
        return parseInt(li.dataset.id, 10);
    };

    bind(event, handler) {
        const self = this;
        if (event === 'itemSelect') {
            $delegate(self.$todoList, 'ons-list-item label', 'click', function () {
                handler({id: self._itemId(this)});
            });
        } else if (event === 'itemToggle') {
            $delegate(self.$todoList, 'ons-list-item ons-checkbox input', 'click', function () {
                handler({
                    id: self._itemId(this),
                    completed: this.checked
                });
            });
        }
    };
}
