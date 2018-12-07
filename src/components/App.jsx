import {App, Panel, Statusbar, View} from 'framework7-react';
import React from 'react';

import routes from '../routes';

export default function (props) {

    // Framework7 parameters here
    const f7params = {
        id: 'io.framework7.react-nui', // App bundle ID
        name: 'Todo', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes
    };

    return (
        <App params={f7params}>
            {/* Statusbar */}
            <Statusbar/>

            {/* Left Panel */}
            <Panel left cover>
                <View url="/menu/"/>
            </Panel>

            {/* Main View */}
            <View id="main-view" url="/todos/" main className="ios-edges" pushState pushStateRoot={process.env.PUBLIC_URL} pushStateSeparator=""/>
        </App>
    );
};
