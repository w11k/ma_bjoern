import CssBaseline from '@material-ui/core/CssBaseline';
import {Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
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

    setTitle = (title: string) => {
        this.setState({title: title});
    };

    render() {
        const {classes} = this.props;
        return (
            <HashRouter>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar handleDrawerToggle={this.handleDrawerToggle} title={this.state.title}/>
                    <Drawer mobileOpen={this.state.mobileOpen} handleDrawerToggle={this.handleDrawerToggle}/>
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
            </HashRouter>
        );
    }
}

export default withRoot(withStyles(styles)(AppComponent));
