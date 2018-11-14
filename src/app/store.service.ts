import {Injectable} from '@angular/core';
import {noop} from 'rxjs';
import {environment} from '../environments/environment';
import {ITodo} from './typings';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private readonly _dbName: string;

    constructor() {
        this._dbName = environment.storeName;

        if (!localStorage.getItem(this._dbName)) {
            localStorage.setItem(this._dbName, JSON.stringify([]));
        }
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

    public findAll(callback: Function = noop): void {
        callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
    }

    public save(updateData: ITodo, callback: Function = noop, id?): void {
        const todos = JSON.parse(localStorage.getItem(this._dbName));

        // If an ID was actually given, find the item and update each property
        if (id) {
            const index = todos.findIndex(item => item.id === id);
            if (index > -1) {
                Object.assign(todos[index], updateData);

                localStorage.setItem(this._dbName, JSON.stringify(todos));
                callback.call(this, todos);
            } else {
                callback.call(this, todos);
            }
        } else {
            // Generate an ID
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage.setItem(this._dbName, JSON.stringify(todos));
            callback.call(this, todos);
        }
    }

    public remove(id: number, callback: Function): void {
        const todos = JSON.parse(localStorage.getItem(this._dbName));

        const index = todos.findIndex(item => item.id === id);
        if (index > -1) {
            todos.splice(index, 1);
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
