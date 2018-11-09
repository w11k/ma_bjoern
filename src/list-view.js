export class ListView {
    constructor(page, template) {
        this.template = template;
        this.$todoList = $(page).find('.todo-list');
    }

    static _itemId(element) {
        const li = $(element).closest('.todo-list-item')[0];
        return parseInt(li.dataset.id, 10);
    };

    _removeItem(id) {
        const elem = this.$todoList.find('[data-id="' + id + '"]')[0];

        if (elem) {
            this.$todoList[0].removeChild(elem);
        }
    };

    _updateItem(item) {
        const listItem = this.$todoList.find('[data-id="' + item.id + '"]');
        if (listItem.length !== 1) {
            return;
        }

        const check = listItem.find('input');
        const title = listItem.find('span.title');

        if (item.completed) {
            listItem.addClass('my-completed');
            listItem.removeClass('my-active');
            check.prop('checked', true);
        } else {
            listItem.addClass('my-active');
            listItem.removeClass('my-completed');
            check.prop('checked', false);
        }

        title.html(item.title);
    };

    render(viewCmd, parameter) {
        const viewCommands = {
            showItems: () => {
                this.$todoList.html(this.template.show(parameter));
            },
            removeItem: () => {
                this._removeItem(parameter);
            },
            addItem: () => {
                this.$todoList.append(this.template.show([parameter]));
            },
            updateItem: () => {
                this._updateItem(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    bind(event, handler) {
        if (event === 'itemSelect') {
            this.$todoList.delegate('.todo-list-item', 'dbclick', event => {
                handler({id: ListView._itemId(event.target)});
            });
        } else if (event === 'itemToggle') {
            this.$todoList.delegate('.todo-list-item input', 'click', event => {
                handler({
                    id: ListView._itemId(event.target),
                    completed: event.target.checked
                });
            });
        }
    };
}
