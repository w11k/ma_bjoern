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
        const elem = qs('[data-id="' + id + '"]');

        if (elem) {
            this.$todoList.removeChild(elem);
        }
    };

    _elementComplete(id, completed) {
        let listItem = qs('[data-id="' + id + '"]', this.$todoList);

        if (!listItem) {
            return;
        }

        listItem.className = completed ? 'completed' : '';

        // In case it was toggled from an event and not by clicking the checkbox
        qs('input', listItem).checked = completed;
    };

    _editItem(id, title) {
        let listItem = qs('[data-id="' + id + '"]');

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
            showEntries: () => {
                self.$todoList.innerHTML = self.template.show(parameter);
            },
            removeItem: () => {
                self._removeItem(parameter);
            },
            setFilter: () => {
                return self._setFilter(parameter);
            },
            clearNewTodo: () => {
                self.$newTodo.value = '';
            },
            elementComplete: () => {
                self._elementComplete(parameter.id, parameter.completed);
            },
            editItem: () => {
                self._editItem(parameter.id, parameter.title);
            }
        };

        return viewCommands[viewCmd]();
    };

    _itemId(element) {
        const li = $parent(element, 'li');
        return parseInt(li.dataset.id, 10);
    };

    bind(event, handler) {
        const self = this;
        if (event === 'itemEdit') {
            $delegate(self.$todoList, 'li label', 'dblclick', () => {
                handler({id: self._itemId(this)});
            });

        } else if (event === 'itemRemove') {
            $delegate(self.$todoList, '.destroy', 'click', () => {
                handler({id: self._itemId(this)});
            });

        } else if (event === 'itemToggle') {
            $delegate(self.$todoList, '.toggle', 'click', () => {
                handler({
                    id: self._itemId(this),
                    completed: this.checked
                });
            });
        }
    };
}
