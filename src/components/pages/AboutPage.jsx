import {Link, Navbar, NavLeft, NavTitle, Page} from 'framework7-react';
import React from 'react';

export default () => (
    <Page>
        <Navbar bgColor="primary">
            <NavLeft>
                <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"/>
            </NavLeft>
            <NavTitle>About</NavTitle>
        </Navbar>
        test
    </Page>
);
