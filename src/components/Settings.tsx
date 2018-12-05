import React from 'react';
import {TitleProps} from '../typings';

class SettingsComponent extends React.Component<TitleProps> {
    componentDidMount() {
        this.props.setTitle(this.props.title);
    }

    render() {
        return <div>test</div>;
    }
}

export default SettingsComponent;