import React from 'react';
import {withRouter} from 'react-router-dom';
import {pages} from '../constants';
import {MenuComponentProps} from '../typings';

function MenuComponent(props: MenuComponentProps) {
    return (
        <div>
            <app-toolbar>Menu</app-toolbar>
            <div role="listbox">
                {Object.values(pages).map((page) => (
                    <paper-item
                        onClick={() => {
                            props.history.push(page.url);
                            props.closeDrawer();
                        }}
                        key={page.title}>
                        <iron-icon icon={page.icon}/>
                        {page.title}
                        <paper-ripple/>
                    </paper-item>
                ))}
            </div>
        </div>
    );
}

export default withRouter(MenuComponent);