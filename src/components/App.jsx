import {App, Block, Link, Navbar, NavRight, Page, Panel, Popup, Statusbar, View} from 'framework7-react';
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
            <View id="main-view" url="/todos/" main className="ios-edges" pushState={true}/>

            {/* Popup */}
            <Popup id="popup">
                <View>
                    <Page>
                        <Navbar title="Popup">
                            <NavRight>
                                <Link popupClose>Close</Link>
                            </NavRight>
                        </Navbar>
                        <Block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate
                            laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam.
                            Omnis iusto nemo quos ullam obcaecati, quod.</Block>
                    </Page>
                </View>
            </Popup>
        </App>
    );
};
