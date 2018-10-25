import {$delegate, $on, qs} from './helper';

export class TabView {
    constructor(page) {
        this.$tabBar = qs('paper-tabs', page);
        this.$tabContent = qs('iron-pages', page);
        this.$allTab = qs('ons-tab[page="all.html"]', page);
        this.$activeTab = qs('ons-tab[page="active.html"]', page);
        this.$completedTab = qs('ons-tab[page="completed.html"]', page);
        this.$page = page;
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
            $delegate(this.$page, '[action="new-todo"]', 'click', handler);
        } else if (event === 'switchTab') {
            const tabIndices = {
                0: 'All',
                1: 'Active',
                2: 'Completed'
            };
            $on(this.$tabBar, 'iron-select', (event) => handler(tabIndices[event.detail.item.attributes.getNamedItem('mytabindex').value]));
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
        // TODO
        /*this.$allTab.setAttribute('badge', itemCounts.total);
        this.$activeTab.setAttribute('badge', itemCounts.active);
        this.$completedTab.setAttribute('badge', itemCounts.completed);*/
    }
}