import Framework7 from 'framework7';
import {Badge, Fab, Icon, Link, Navbar, NavLeft, NavRight, NavTitle, Page, Tab, Tabs, Toolbar} from 'framework7-react';
import React from 'react';
import {view} from 'react-easy-state';
import model from '../../model';
import {ListTypes} from '../../routes';

class TabsPage extends React.Component {
    isIos = Framework7.prototype.device.ios === true;

    constructor(props) {
        super(props);
        this.model = model;
    }

    render() {
        return <Page pageContent={false} tabs={true}>
            <Navbar bgColor="primary">
                <NavLeft>
                    <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"/>
                </NavLeft>
                <NavTitle>Todos</NavTitle>
                {this.isIos && <NavRight onClick={() => this.openDialog()}>
                    <Link iconF7="add"/>
                </NavRight>}
            </Navbar>
            <Toolbar tabbar labels bgColor="primary">
                <Link tabLink routeTabId={ListTypes.ALL} href="/todos/all" tabLinkActive>
                    <Icon ios="f7:list" md="material:list">
                        <Badge color="red">{this.model.getCount().total.toString()}</Badge>
                    </Icon>
                    <span className="tabbar-label">All</span>
                </Link>
                <Link tabLink routeTabId={ListTypes.ACTIVE} href="/todos/active">
                    <Icon ios="f7:circle" md="material:check_box_outline_blank">
                        <Badge color="red">{this.model.getCount().active.toString()}</Badge>
                    </Icon>
                    <span className="tabbar-label">Active</span>
                </Link>
                <Link tabLink routeTabId={ListTypes.COMPLETED} href="/todos/completed">
                    <Icon className="icon-fill" ios="f7:check_round_fill" md="material:check_box">
                        <Badge color="red">{this.model.getCount().completed.toString()}</Badge>
                    </Icon>
                    <span className="tabbar-label">Completed</span>
                </Link>
            </Toolbar>

            <Tabs routable>
                <Tab id={ListTypes.ALL} tabActive/>
                <Tab id={ListTypes.ACTIVE}/>
                <Tab id={ListTypes.COMPLETED}/>
            </Tabs>
            {!this.isIos && <Fab position="right-bottom" slot="fixed" color="pink" onClick={() => this.openDialog()}>
                <Icon material="add"/>
            </Fab>}
        </Page>;
    }

    openDialog() {
        const dialog = this.$f7.dialog.prompt(null, 'Create Item', (result) => {
            if (result.trim() === '') {
                return;
            }
            this.model.createItem(result);
        });
        const input = dialog.$el.find('input');
        input.focus();
    }
}

export default view(TabsPage);
