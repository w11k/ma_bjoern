import React from 'react';
import {pages} from '../constants';

type ListComponentProps = {
    type: string;
}

class ListComponent extends React.Component<ListComponentProps> {
    render() {
        return <div>{this.props.type}</div>;
    }
}

export default ListComponent;