import {AppBar, Badge, createStyles, Fab, Tab, Tabs, Theme, withStyles} from '@material-ui/core';
import {Add as AddIcon} from '@material-ui/icons';
import React from 'react';
import {view} from 'react-easy-state';
import {Route} from 'react-router';
import SwipeableRoutes from 'react-swipeable-routes';
import {pages} from '../constants';
import model, {Model} from '../model';
import {ListTypes, TabsComponentProps, TabsComponentState} from '../typings';
import Dialog from './Dialog';
import createLink from './Link';
import List from './List';

const styles = (theme: Theme) =>
    createStyles({
        tabBar: {
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2
        }
    });

class TabsComponent extends React.Component<TabsComponentProps<typeof styles>, TabsComponentState> {
    state: TabsComponentState = {
        activeTab: 0,
        dialogOpened: false
    };
    private model: Model;

    constructor(props: TabsComponentProps<typeof styles>) {
        super(props);
        this.model = model as unknown as Model;
    }

    componentDidMount() {
        this.props.setTitle(this.props.title);
    }

    handleDialogOpen = () => {
        this.setState({dialogOpened: true});
    };

    handleDialogClose = (value: string = '') => {
        this.setState({dialogOpened: false});
        if (value.trim().length > 0) {
            this.model.createItem(value);
        }
    };

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
                        {Object.entries(pages.todos.tabs).map(([key, tab]) => {
                            return <Tab
                                label={tab.title}
                                icon={
                                    <Badge color="secondary" badgeContent={this.model.getCount()[key]}>
                                        {tab.icon}
                                    </Badge>}
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
                <Fab className={classes.fab} color="secondary" onClick={this.handleDialogOpen}>
                    <AddIcon/>
                </Fab>
                <Dialog handleClose={this.handleDialogClose} opened={this.state.dialogOpened} title="Create Item"/>
            </div>
        );
    }
}

export default withStyles(styles)(view(TabsComponent));