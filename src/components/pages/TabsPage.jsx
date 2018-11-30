import {Fab, Icon, Link, Navbar, NavLeft, NavTitle, Page, Tab, Tabs, Toolbar} from 'framework7-react';
import React from 'react';

export default class TabsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Page pageContent={false} tabs={true}>
            <Navbar bgColor="primary">
                <NavLeft>
                    <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"/>
                </NavLeft>
                <NavTitle>Todos</NavTitle>
            </Navbar>
            <Toolbar tabbar bgColor="primary">
                <Link tabLink routeTabId="all" href="/todos/all" tabLinkActive>All</Link>
                <Link tabLink routeTabId="active" href="/todos/active">Active</Link>
                <Link tabLink routeTabId="completed" href="/todos/completed">Completed</Link>
            </Toolbar>
            <Tabs routable>
                <Tab id="all" tabActive/>
                <Tab id="active"/>
                <Tab id="completed"/>
            </Tabs>
            <Fab position="right-bottom" slot="fixed" color="pink">
                <Icon ios="f7:add" md="material:add"/>
            </Fab>
        </Page>;
    }
}
