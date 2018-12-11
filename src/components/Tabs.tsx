import React from 'react';
import {view} from 'react-easy-state';
import {Route, withRouter} from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import {pages} from '../constants';
import model, {Model} from '../model';
import {ListTypes, TabsComponentProps, TabsComponentState} from '../typings';
import Dialog from './Dialog';
import List from './List';

class TabsComponent extends React.Component<TabsComponentProps, TabsComponentState> {
    state: TabsComponentState = {
        activeTab: 0,
        dialogOpened: false
    };
    private model: Model;

    constructor(props: TabsComponentProps) {
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
        const {history} = this.props;
        const tabs = Object.entries(pages.todos.tabs).map(([key, tab]) => (
            <paper-tab key={tab.title} onClick={() => history.push(tab.url)}>
                <iron-icon icon={tab.icon} id={'tab' + [key]}/>
                <span>{tab.title}</span>
                <paper-badge label={this.model.getCount()[key]}
                             for={'tab' + [key]}/>
            </paper-tab>
        ));
        return (
            <div className="tab-container">
                <paper-tabs selected="0">
                    {tabs}
                </paper-tabs>
                <SwipeableRoutes index={this.state.activeTab} onChangeIndex={this.handleChangeIndex}>
                    <Route path={pages.todos.tabs[ListTypes.ALL].url}
                           render={(props) => <List type={ListTypes.ALL} {...props}/>}/>
                    <Route path={pages.todos.tabs[ListTypes.ACTIVE].url}
                           render={(props) => <List type={ListTypes.ACTIVE} {...props}/>}/>
                    <Route path={pages.todos.tabs[ListTypes.COMPLETED].url}
                           render={(props) => <List type={ListTypes.COMPLETED} {...props}/>}/>
                </SwipeableRoutes>
                <paper-fab icon="add" onClick={this.handleDialogOpen}/>
                <Dialog handleClose={this.handleDialogClose} opened={this.state.dialogOpened} title="Create Item"/>
            </div>
        );
    }
}

export default view(withRouter(TabsComponent));