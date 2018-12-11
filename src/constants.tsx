import {
    Cancel as CancelIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, Delete as DeleteIcon, Edit as EditIcon,
    Info as InfoIcon,
    List as ListIcon,
    Settings as SettingsIcon
} from '@material-ui/icons';
import React from 'react';
import {ListTypes, SheetActions as SheetActionsEnum} from './typings';

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

export const SheetActions = {
    edit: {
        title: SheetActionsEnum.EDIT,
        icon: <EditIcon/>
    },
    delete: {
        title: SheetActionsEnum.DELETE,
        icon: <DeleteIcon/>
    },
    cancel: {
        title: SheetActionsEnum.CANCEL,
        icon: <CancelIcon/>
    }
};