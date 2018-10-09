import {$on, qs} from "./helper";

export class TabView {
    constructor(page) {
        this.$tabBar = qs('ons-tabbar', page);
        this.$allTab = qs('ons-tab[page="all.html"]', page);
        this.$activeTab = qs('ons-tab[page="active.html"]', page);
        this.$completedTab = qs('ons-tab[page="completed.html"]', page);
        this.$openMenu = qs('[action="open-menu"]', page);
        this.$newTodo = qs('[action="new-todo"]', page);
    }

    render(viewCmd, parameter) {
        const self = this;
        const viewCommands = {
            updateElementCount: () => {
                self._setTabBadges(parameter);
            },
            setTab: () => {
                return self._setActiveTab(parameter);
            },
            changeTab: () => {
                return self._changeActiveTab(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    bind(event, handler) {
        const self = this;
        if (event === 'openMenu') {
            $on(self.$openMenu, 'click', handler);
        } else if (event === 'newTodo') {
            $on(self.$newTodo, 'click', handler);
        } else if (event === 'switchTab') {
            const tabIndices = {
                0: 'All',
                1: 'Active',
                2: 'Completed',
            };
            $on(this.$tabBar, 'prechange', (event) => handler(tabIndices[event.index]));
        }
    };

    _setActiveTab(currentPage) {
        const tabIndices = {
            All: 0,
            Active: 1,
            Completed: 2
        };
        return this.$tabBar.setActiveTab(tabIndices[currentPage] || 0, {animation: 'none'});
    };

    _changeActiveTab(currentPage) {
        const tabIndices = {
            All: 0,
            Active: 1,
            Completed: 2
        };
        return this.$tabBar.setActiveTab(tabIndices[currentPage] || 0);
    };

    _setTabBadges(itemCounts) {
        this.$allTab.setAttribute('badge', itemCounts.total);
        this.$activeTab.setAttribute('badge', itemCounts.active);
        this.$completedTab.setAttribute('badge', itemCounts.completed);
    }
}