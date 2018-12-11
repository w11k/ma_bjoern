import {StyleRulesCallback, WithStyles, WithTheme} from '@material-ui/core';
import React from 'react';
import {RouteComponentProps} from 'react-router';

export type Storage = {
    items: Array<Item>
}

export type Item = {
    id: number;
    title: string;
    completed: boolean;
}

export type ItemUpdate = {
    title?: string;
    completed?: boolean;
}

export type Count = {
    active: number;
    completed: number;
    all: number;
    [key: string]: number;
}

export enum ListTypes {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    NONE = 'none'
}

export enum SheetActions {
    EDIT = 'Edit',
    DELETE = 'Delete',
    CANCEL = 'Cancel'
}

export type AppBarComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & {
    toggleDrawer: (event: React.MouseEvent<HTMLElement>) => void;
    title: string;
};

export type MenuComponentProps = RouteComponentProps & {
    closeDrawer: () => void;
};

export type DrawerComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & WithTheme & {
    mobileOpen?: boolean;
    closeDrawer: (event: React.MouseEvent<HTMLElement>) => void;
};

export type ListComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & {
    type: string;
};

export type TabsComponentProps = TitleProps & RouteComponentProps;

export type AppComponentState = {
    title: string;
    drawerPersistent: boolean;
};

export type TabsComponentState = {
    activeTab: number;
    dialogOpened: boolean;
};

export type ListComponentState = {
    sheetOpened: number;
    dialogState: {
        opened: boolean;
        id: number;
        value: string;
    };
};

export type TitleProps = {
    setTitle: (title: string) => void;
    title: string;
}

export type DialogComponentProps = {
    title: string;
    opened: boolean;
    id?: number;
    defaultValue?: string;
    handleClose: (value?: string, id?: number) => void;
}

export type SheetComponentProps = {
    opened: number;
    handleClose: (action: SheetActions, value: number) => void;
}