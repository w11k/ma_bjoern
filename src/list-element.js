import {$delegate, $parent, getItemId, qs} from './helper';

class ListElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const hideRowsClass = this.id === 'page_active' ? 'completed' : this.id === 'page_completed' ? 'active' : 'dont-hide';
        const styles = `
            :host {
                display: block;
            }
            
            paper-item:before {
                display: none !important;
            }
            
            .list-container {
                background-color: #ffffff;
            }
            
            paper-item.border_bottom {
                border-bottom: 1px solid #eee;
            }

            .list-container .${hideRowsClass} {
                display: none;
            }
            
            
            




.animation-square {
    width: 20px;
    height: 20px;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
    background-color: red;
}

.test-row {
    display: table;
    width: 100%;
}

.test-column {
    display: table-cell;
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

        `;
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="list-container with-separator"></div>
        `;
        this.$todoList = qs('.list-container', this.shadowRoot);
    }

    static get is() {
        return 'my-list';
    }

    connectedCallback() {
        this.dispatchEvent(new CustomEvent('init', {bubbles: true, composed: true, detail: this}));
    }

    _removeItem(id) {
        const item = qs('[data-id="' + id + '"]', this.$todoList);
        if (!item) {
            return;
        }
        const elem = $parent(item, 'vaadin-context-menu');
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
                    id: getItemId(this),
                    completed: this.checked
                });
            });
        }
    };
}

customElements.define(ListElement.is, ListElement);