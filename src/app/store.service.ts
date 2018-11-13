import {Injectable} from '@angular/core';

export interface ITodo {
    id?: number;
    title?: string;
    completed?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private readonly _dbName: string;

    constructor(name: string, callback: Function = () => {
    }) {
        this._dbName = name;

        if (!localStorage.getItem(name)) {
            const todos = [];

            localStorage.setItem(name, JSON.stringify(todos));
        }

        callback.call(this, JSON.parse(localStorage.getItem(name)));
    }

    public find(query: ITodo, callback: Function): void {
        if (!callback) {
            return;
        }

        const todos = JSON.parse(localStorage.getItem(this._dbName));

        callback.call(this, todos.filter((todo) => {
            for (const q in query) {
                if (query[q] !== todo[q]) {
                    return false;
                }
            }
            return true;
        }));
    }

    public findAll(callback: Function = () => {
    }): void {
        callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
    }

    public save(updateData: ITodo, callback: Function = () => {
    }, id?): void {
        const todos = JSON.parse(localStorage.getItem(this._dbName));

        // If an ID was actually given, find the item and update each property
        if (id) {
            const index = todos.findIndex(item => item.id === id);
            if (index > -1) {
                Object.assign(todos[index], updateData);

                localStorage.setItem(this._dbName, JSON.stringify(todos));
                callback.call(this, todos[index]);
            } else {
                callback.call(this, undefined);
            }
        } else {
            // Generate an ID
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage.setItem(this._dbName, JSON.stringify(todos));
            callback.call(this, updateData);
        }
    }

    public remove(id: number, callback: Function): void {
        const todos = JSON.parse(localStorage.getItem(this._dbName));

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                todos.splice(i, 1);
                break;
            }
        }

        localStorage.setItem(this._dbName, JSON.stringify(todos));
        callback.call(this, todos);
    }

    public drop(callback: Function): void {
        const todos = [];
        localStorage.setItem(this._dbName, JSON.stringify(todos));
        callback.call(this, todos);
    }
}
