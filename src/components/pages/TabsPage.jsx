import {Fab, Icon, Link, Navbar, NavLeft, NavTitle, Page, Tab, Tabs, Toolbar} from 'framework7-react';
import React from 'react';
import {ListTypes} from '../../routes';

export default class TabsPage extends React.Component {
    render() {
        return <Page pageContent={false} tabs={true}>
            <Navbar bgColor="primary">
                <NavLeft>
                    <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"/>
                </NavLeft>
                <NavTitle>Todos</NavTitle>
            </Navbar>
            <Toolbar tabbar bgColor="primary">
                <Link tabLink routeTabId={ListTypes.ALL} href="/todos/all" tabLinkActive>All</Link>
                <Link tabLink routeTabId={ListTypes.ACTIVE} href="/todos/active">Active</Link>
                <Link tabLink routeTabId={ListTypes.COMPLETED} href="/todos/completed">Completed</Link>
            </Toolbar>
            <Tabs routable>
                <Tab id={ListTypes.ALL} tabActive/>
                <Tab id={ListTypes.ACTIVE}/>
                <Tab id={ListTypes.COMPLETED}/>
            </Tabs>
            <Fab position="right-bottom" slot="fixed" color="pink">
                <Icon ios="f7:add" md="material:add"/>
            </Fab>
        </Page>;
    }
}
