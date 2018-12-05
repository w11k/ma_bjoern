import {Info as InfoIcon, List as ListIcon, Settings as SettingsIcon} from '@material-ui/icons';
import React from 'react';
import {Page} from './typings';


export const drawerWidth = 240;

export const pages = {
    todos: {
        url: '/todos',
        title: 'Todos',
        icon: <ListIcon/>
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