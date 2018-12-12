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

export type MenuComponentProps = RouteComponentProps & {
    closeDrawer: () => void;
};

export type ListComponentProps = {
    type: ListTypes;
};

export type TabsComponentProps = TitleProps & RouteComponentProps;

export type AppComponentState = {
    title: string;
    drawerPersistent: boolean;
};

export type TabsComponentState = {
    activeTab: number;
};

export type TitleProps = {
    setTitle: (title: string) => void;
    title: string;
}

export type ListItemComponentProps = {
    onChange: (c: boolean) => void;
    onSheetAction: (a: SheetActions) => void;
    item: Item;
}

export type ContextMenuElement = HTMLElement & {
    renderer: (root: HTMLElement) => void
}