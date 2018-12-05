import {Info as InfoIcon, List as ListIcon, Settings as SettingsIcon} from '@material-ui/icons';
import React from 'react';


export const drawerWidth = 240;

export const pages = {
    todos: {
        url: '/todos',
        title: 'Todos',
        icon: <ListIcon/>,
        tabs: {
            all: {
                url: '/todos/all',
                title: 'All',
                icon: <ListIcon/>
            },
            active: {
                url: '/todos/active',
                title: 'Active',
                icon: <ListIcon/>
            },
            completed: {
                url: '/todos/completed',
                title: 'Completed',
                icon: <ListIcon/>
            }
        }
    },
    settings: {
        url: '/settings',
        title: 'Settings',
        icon: <SettingsIcon/>
    }
    ,
    about: {
        url: '/about',
        title: 'About',
        icon: <InfoIcon/>
    }
};