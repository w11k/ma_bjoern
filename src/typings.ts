import {StyleRulesCallback, WithStyles, WithTheme} from '@material-ui/core';
import React from 'react';

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

export enum ListTypes {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    NONE = 'none'
}

export type AppBarComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & {
    toggleDrawer: (event: React.MouseEvent<HTMLElement>) => void;
    title: string;
};

export type MenuComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & {
    closeDrawer: (event: React.MouseEvent<HTMLElement>) => void;
};

export type DrawerComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & WithTheme & {
    mobileOpen?: boolean;
    closeDrawer: (event: React.MouseEvent<HTMLElement>) => void;
};

export type ListComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & {
    type: string;
};

export type TabsComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & TitleProps;

export type AppComponentState = {
    mobileOpen: boolean;
    title: string;
};

export type TitleProps = {
    setTitle: (title: string) => void;
    title: string;
}