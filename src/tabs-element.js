import '@myfrom/iron-swipeable-pages/iron-swipeable-pages';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-badge/paper-badge';
import '@polymer/paper-fab/paper-fab';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import {$delegate, $on, qs} from './helper';
import './list-element';

class TabsElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const styles = `
            :host {
                display: block;
                height: 100%;
            }
        
            paper-tabs {
                --paper-tab-ink: #222195;
                --paper-tabs-selection-bar-color: #222195;
                background-color: #ffffff;
                box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .14), 0 3px 5px -2px rgba(0, 0, 0, .12), 0 5px 1px -4px rgba(0, 0, 0, .2);
                border-bottom: 1px solid #eee;
                position: relative;
                z-index: 1;
            }

            paper-tab {
                --layout-horizontal_-_flex-direction: column;
                font-size: x-small;
                --paper-badge-width: 15px;
                --paper-badge-height: 15px;
                --paper-badge-margin-bottom: -4px;
                --paper-badge-margin-left: -4px;
            }
            
            paper-tab.iron-selected {
                color: #222195;
            }
            
            iron-swipeable-pages {
                height: calc(100% - 49px);
            }
            
            paper-fab {
                --paper-fab-keyboard-focus-background: var(--accent-color);
            }
            
            paper-fab.bottom_right {
                top: auto;
                bottom: 20px;
                right: 20px;
                left: auto;
                position: absolute;
            }
        `;
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <paper-tabs selected="0">
                <paper-tab mytabindex="0">
                    <iron-icon icon="list" id="tab_all"></iron-icon>
                    <span>All</span>
                    <paper-badge label="0" for="tab_all"></paper-badge>
                </paper-tab>
                <paper-tab mytabindex="1">
                    <iron-icon icon="check-box-outline-blank" id="tab_active"></iron-icon>
                    <span>Active</span>
                    <paper-badge label="0" for="tab_active"></paper-badge>
                </paper-tab>
                <paper-tab mytabindex="2">
                    <iron-icon icon="check-box" id="tab_completed"></iron-icon>
                    <span>Completed</span>
                    <paper-badge label="0" for="tab_completed"></paper-badge>
                </paper-tab>
            </paper-tabs>
            <iron-swipeable-pages selected="0" no-cycle="true">
                <my-list id="page_all" mytabindex="0"></my-list>
                <my-list id="page_active" mytabindex="1"></my-list>
                <my-list id="page_completed" mytabindex="2"></my-list>
            </iron-swipeable-pages>
            <paper-fab icon="add" class="bottom_right" action="new-todo"></paper-fab>
        `;
        this.$tabBar = qs('paper-tabs', this.shadowRoot);
        this.$tabContent = qs('iron-swipeable-pages', this.shadowRoot);
        this.$allBadge = qs('paper-tab[mytabindex="0"] paper-badge', this.shadowRoot);
        this.$activeBadge = qs('paper-tab[mytabindex="1"] paper-badge', this.shadowRoot);
        this.$completedBadge = qs('paper-tab[mytabindex="2"] paper-badge', this.shadowRoot);
    }

    static get is() {
        return 'my-tabs';
    }

    connectedCallback() {
        this.dispatchEvent(new CustomEvent('init', {bubbles: true, composed: true, detail: this}));
    }

    render(viewCmd, parameter) {
        const viewCommands = {
            updateElementCount: () => {
                this._setTabBadges(parameter);
            },
            setTab: () => {
                this._setActiveTab(parameter);
            }
        };

        viewCommands[viewCmd]();
    };

    bind(event, handler) {
        if (event === 'newTodo') {
            $delegate(this.shadowRoot, '[action="new-todo"]', 'click', handler);
        } else if (event === 'switchTab') {
            const tabIndices = {
                0: 'All',
                1: 'Active',
                2: 'Completed'
            };
            $on(this.$tabBar, 'iron-select', (event) => handler(tabIndices[event.detail.item.attributes.getNamedItem('mytabindex').value]));
            $on(this.$tabContent, 'iron-select', (event) => handler(tabIndices[event.detail.item.attributes.getNamedItem('mytabindex').value]));
        }
    };

    _setActiveTab(currentPage) {
        const tabIndices = {
            All: 0,
            Active: 1,
            Completed: 2
        };
        this.$tabBar.selectIndex(tabIndices[currentPage] || 0);
        this.$tabContent.selectIndex(tabIndices[currentPage] || 0);
    };

    _setTabBadges(itemCounts) {
        this.$allBadge.setAttribute('label', itemCounts.total);
        this.$activeBadge.setAttribute('label', itemCounts.active);
        this.$completedBadge.setAttribute('label', itemCounts.completed);
    }
}

customElements.define(TabsElement.is, TabsElement);