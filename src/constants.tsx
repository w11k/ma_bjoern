import React from 'react';
import {ListTypes} from './typings';

export const drawerWidth = 240;

export const pages = {
    todos: {
        url: '/todos',
        title: 'Todos',
        icon: 'list',
        tabs: {
            [ListTypes.ALL]: {
                url: `/todos/${ListTypes.ALL}`,
                title: 'All',
                icon: 'list'
            },
            [ListTypes.ACTIVE]: {
                url: `/todos/${ListTypes.ACTIVE}`,
                title: 'Active',
                icon: 'check-box-outline-blank'
            },
            [ListTypes.COMPLETED]: {
                url: `/todos/${ListTypes.COMPLETED}`,
                title: 'Completed',
                icon: 'check-box'
            }
        }
    },
    settings: {
        url: '/settings',
        title: 'Settings',
        icon: 'settings'
    }
    ,
    about: {
        url: '/about',
        title: 'About',
        icon: 'info'
    }
};