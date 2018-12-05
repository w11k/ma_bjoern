import {StyleRulesCallback, WithStyles, WithTheme} from '@material-ui/core';
import React, {ReactElement} from 'react';


export type StringMap<T> = {
    [x: string]: T;
}

export type Page = {
    url: string;
    title: string;
    icon: ReactElement<any>;
};

export type AppBarComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & {
    handleDrawerToggle: (event: React.MouseEvent<HTMLElement>) => void;
    title: string;
};

export type MenuComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & {
    handleDrawerToggle: (event: React.MouseEvent<HTMLElement>) => void;
};

export type DrawerComponentProps<T extends string | StyleRulesCallback = string> = WithStyles<T> & WithTheme & {
    mobileOpen?: boolean;
    handleDrawerToggle: (event: React.MouseEvent<HTMLElement>) => void;
};

export type AppComponentState = {
    mobileOpen: boolean;
    title: string;
};

export type TitleProps = {
    setTitle: (title: string) => void;
    title: string;
}