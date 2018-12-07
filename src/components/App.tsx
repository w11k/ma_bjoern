import {createStyles, CssBaseline, Theme, withStyles, WithStyles} from '@material-ui/core';
import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {pages} from '../constants';
import {AppComponentState} from '../typings';
import withRoot from '../withRoot';
import About from './About';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Settings from './Settings';
import Tabs from './Tabs';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1
        }
    });

class AppComponent extends React.Component<WithStyles<typeof styles>, AppComponentState> {
    state: AppComponentState = {
        mobileOpen: false,
        title: 'Todos'
    };

    handleDrawerToggle = () => {
        this.setState((state: AppComponentState) => ({mobileOpen: !state.mobileOpen}));
    };

    handleDrawerClose = () => {
        this.setState({mobileOpen: false});
    };

    setTitle = (title: string) => {
        this.setState({title: title});
    };

    render() {
        const {classes} = this.props;
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar toggleDrawer={this.handleDrawerToggle} title={this.state.title}/>
                    <Drawer mobileOpen={this.state.mobileOpen} closeDrawer={this.handleDrawerClose}/>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Switch>
                            <Route path={pages.todos.url} render={(props) => <Tabs {...props}
                                                                                   title={pages.todos.title}
                                                                                   setTitle={this.setTitle}/>}/>
                            <Route path={pages.settings.url} render={(props) => <Settings {...props}
                                                                                          title={pages.settings.title}
                                                                                          setTitle={this.setTitle}/>}/>
                            <Route path={pages.about.url} render={(props) => <About {...props}
                                                                                    title={pages.about.title}
                                                                                    setTitle={this.setTitle}/>}/>
                            <Redirect to={pages.todos.tabs.all.url}/>
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default withRoot(withStyles(styles)(AppComponent));
