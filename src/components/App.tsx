import {AppDrawerLayoutElement} from '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer';
import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {pages} from '../constants';
import {AppComponentState} from '../typings';
import About from './About';
import Menu from './Menu';
import Settings from './Settings';
import Tabs from './Tabs';

class AppComponent extends React.Component<{}, AppComponentState> {
    state: AppComponentState = {
        title: 'Todos',
        drawerPersistent: true
    };

    private drawer: React.RefObject<AppDrawerElement> = React.createRef<AppDrawerElement>();
    private layout: React.RefObject<AppDrawerLayoutElement> = React.createRef<AppDrawerLayoutElement>();

    componentDidMount(): void {
        if (this.layout.current) {
            this.state.drawerPersistent = !this.layout.current.narrow;
            this.layout.current.addEventListener('narrow-changed', this.handleLayoutChange as EventListener);
        }
    }

    handleLayoutChange = (event: CustomEvent) => {
        this.setState({drawerPersistent: !event.detail.value});
    };

    handleDrawerClose = () => {
        if (this.drawer.current && !this.state.drawerPersistent) {
            this.drawer.current.close();
        }
    };

    setTitle = (title: string) => {
        this.setState({title: title});
    };

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div>
                    <app-drawer-layout forceNarrow={true} ref={this.layout}>
                        <app-drawer slot="drawer" swipe-open="true" ref={this.drawer}>
                            <Menu closeDrawer={() => this.handleDrawerClose()}/>
                        </app-drawer>
                        <app-header-layout>
                            <app-header effects="waterfall" reveals slot="header">
                                <app-toolbar>
                                    {!this.state.drawerPersistent && <paper-icon-button drawer-toggle icon="menu"/>}
                                    <div main-title="true">{this.state.title}</div>
                                </app-toolbar>
                            </app-header>
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
                        </app-header-layout>
                    </app-drawer-layout>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppComponent;
