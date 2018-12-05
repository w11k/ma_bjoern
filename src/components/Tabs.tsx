import AppBar from '@material-ui/core/AppBar/AppBar';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import React from 'react';
import {Redirect, Route} from 'react-router';
import {pages} from '../constants';
import {TitleProps} from '../typings';
import createLink from './Link';
import List from './List';
import SwipeableRoutes from "react-swipeable-routes";

class TabsComponent extends React.Component<TitleProps> {
    state: any = {
        activeTab: 0
    };

    componentDidMount() {
        this.props.setTitle(this.props.title);
    }

    handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        this.setState({activeTab: value});
    };

    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.activeTab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        {Object.values(pages.todos.tabs).map((tab) => {
                            return <Tab
                                label={tab.title}
                                key={tab.title}
                                {...{to: tab.url}}
                                component={createLink}
                            />;
                        })}
                    </Tabs>
                </AppBar>
                <SwipeableRoutes>
                    <Route path={pages.todos.tabs.all.url}
                           render={(props) => <List type="all" {...props}/>}/>
                    <Route path={pages.todos.tabs.active.url}
                           render={(props) => <List type="active" {...props}/>}/>
                    <Route path={pages.todos.tabs.completed.url}
                           render={(props) => <List type="completed" {...props}/>}/>
                </SwipeableRoutes>
            </div>
        );
    }
}

export default TabsComponent;