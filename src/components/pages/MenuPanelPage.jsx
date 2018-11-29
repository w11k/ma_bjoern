import {List, ListItem, Navbar, Page} from 'framework7-react';
import React from 'react';

export default () => (
    <Page>
        <Navbar title="Todo-App"/>
        <List>
            <ListItem link="/todos/" title="Todos" view="#main-view" panelClose/>
            <ListItem link="/settings/" title="Settings" view="#main-view" panelClose/>
            <ListItem link="/about/" title="About" view="#main-view" panelClose/>
        </List>
    </Page>
);
