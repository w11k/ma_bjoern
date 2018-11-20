export interface ITodoCount {
    active: number;
    completed: number;
    total: number;
}

export interface ITodo {
    id?: number;
    title?: string;
    completed?: boolean;
}

export enum ListType {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    NONE = 'NONE'
}

export enum TodoActions {
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    NONE = 'NONE'
}
