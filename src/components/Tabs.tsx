import {AppBar, createStyles, Fab, Tab, Tabs, Theme, withStyles} from '@material-ui/core';
import {Add as AddIcon} from '@material-ui/icons';
import React from 'react';
import {view} from 'react-easy-state';
import {Route} from 'react-router';
import SwipeableRoutes from 'react-swipeable-routes';
import {pages} from '../constants';
import model, {Model} from '../model';
import {ListTypes, TabsComponentProps} from '../typings';
import createLink from './Link';
import List from './List';

const styles = (theme: Theme) =>
    createStyles({
        tabBar: {
            'background-color': 'white',
            'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2
        }
    });

class TabsComponent extends React.Component<TabsComponentProps<typeof styles>> {
    private model: Model;

    constructor(props: TabsComponentProps<typeof styles>) {
        super(props);
        this.model = model as unknown as Model;
    }

    state: any = {
        activeTab: 0
    };

    componentDidMount() {
        this.props.setTitle(this.props.title);
    }

    handleChange = (event: React.ChangeEvent<{}>, value: number) => {
        this.handleChangeIndex(value);
    };

    handleChangeIndex = (value: number) => {
        this.setState({activeTab: value});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.activeTab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        className={classes.tabBar}
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
                <SwipeableRoutes index={this.state.activeTab} onChangeIndex={this.handleChangeIndex}>
                    <Route path={pages.todos.tabs[ListTypes.ALL].url}
                           render={(props) => <List type={ListTypes.ALL} {...props}/>}/>
                    <Route path={pages.todos.tabs[ListTypes.ACTIVE].url}
                           render={(props) => <List type={ListTypes.ACTIVE} {...props}/>}/>
                    <Route path={pages.todos.tabs[ListTypes.COMPLETED].url}
                           render={(props) => <List type={ListTypes.COMPLETED} {...props}/>}/>
                </SwipeableRoutes>
                <Fab className={classes.fab} color="secondary">
                    <AddIcon/>
                </Fab>
            </div>
        );
    }
}

export default withStyles(styles)(view(TabsComponent));