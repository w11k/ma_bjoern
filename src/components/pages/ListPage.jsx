import {Page} from 'framework7-react';
import React from 'react';
import {view} from 'react-easy-state';
import model from '../../model';
import {ListTypes} from '../../routes';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.model = model;
        this.listType = this.props.f7route.route.tab.id;
    }

    render() {
        const list = this.model.getAllItems()
            .filter(item => {
                switch (this.listType) {
                    case ListTypes.ALL:
                        return true;
                    case ListTypes.ACTIVE:
                        return !item.completed;
                    case ListTypes.COMPLETED:
                        return item.completed;
                    case ListTypes.NONE:
                    default:
                        return false;
                }
            })
            .map(item => <li key={item.id}>{item.title}</li>);
        return (
            <Page>
                <ul>
                    {list}
                </ul>
            </Page>
        );
    }
}

export default view(ListPage);