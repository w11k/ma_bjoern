export class TabView {
    constructor(page) {
        this.$tabs = $(page).find('#tabs');
        this.$allBadge = this.$tabs.find('a[mytabindex="0"] span.badge');
        this.$activeBadge = this.$tabs.find('a[mytabindex="1"] span.badge');
        this.$completedBadge = this.$tabs.find('a[mytabindex="2"] span.badge');
        this.$page = $(page);
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
            this.$page.delegate('[action="new-todo"]', 'click', handler);
        } else if (event === 'switchTab') {
            const tabIndices = {
                0: 'All',
                1: 'Active',
                2: 'Completed'
            };
            this.$tabs.delegate('a[data-toggle="tab"]', 'show.bs.tab', event => {
                handler(tabIndices[event.target.attributes.getNamedItem('mytabindex').value]);
            });
        }
    };

    _setActiveTab(currentPage) {
        const tabIndices = {
            All: 0,
            Active: 1,
            Completed: 2
        };
        this.$tabs.find('li').eq(tabIndices[currentPage] || 0).find('a').tab('show');
    };

    _setTabBadges(itemCounts) {
        this.$allBadge.html(itemCounts.total);
        this.$activeBadge.html(itemCounts.active);
        this.$completedBadge.html(itemCounts.completed);
    }
}