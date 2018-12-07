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