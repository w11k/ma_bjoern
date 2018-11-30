import {Page} from 'framework7-react';
import React from 'react';
import {view} from 'react-easy-state';
import model from '../../model';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.model = model;
    }

    render() {
        const list = this.model.getAllItems().map(item => <li key={item.id}>{item.title}</li>);
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