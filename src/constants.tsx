import {
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    Info as InfoIcon,
    List as ListIcon,
    Settings as SettingsIcon
} from '@material-ui/icons';
import React from 'react';
import {ListTypes} from './typings';

export const drawerWidth = 240;

export const pages = {
    todos: {
        url: '/todos',
        title: 'Todos',
        icon: <ListIcon/>,
        tabs: {
            [ListTypes.ALL]: {
                url: `/todos/${ListTypes.ALL}`,
                title: 'All',
                icon: <ListIcon/>
            },
            [ListTypes.ACTIVE]: {
                url: `/todos/${ListTypes.ACTIVE}`,
                title: 'Active',
                icon: <CheckBoxOutlineBlankIcon/>
            },
            [ListTypes.COMPLETED]: {
                url: `/todos/${ListTypes.COMPLETED}`,
                title: 'Completed',
                icon: <CheckBoxIcon/>
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