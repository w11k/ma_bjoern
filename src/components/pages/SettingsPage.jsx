import {Link, Navbar, NavLeft, NavTitle, Page} from 'framework7-react';
import React from 'react';

export default () => (
    <Page>
        <Navbar>
            <NavLeft>
                <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"/>
            </NavLeft>
            <NavTitle>Settings</NavTitle>
        </Navbar>
        test
    </Page>
);
