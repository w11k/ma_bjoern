import {Injectable} from '@angular/core';
import {BehaviorSubject, noop, Observable} from 'rxjs';
import {ITodo, StoreService} from './store.service';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    private todos: BehaviorSubject<Array<ITodo>> = new BehaviorSubject([]);

    constructor(private storage: StoreService) {
        this.storage.findAll((items) => this.todos.next(items));
    }

    public createItem(title: string = '') {
        this.storage.save({
            title: title.trim(),
            completed: false
        });
    }

    public getItems(): Observable<Array<ITodo>> {
        return this.todos.asObservable();
    }

    public getItemById(id: number): Promise<ITodo> {
        return new Promise<ITodo>((resolve, reject) => {
            this.storage.find({id}, (items) => items.length === 1 ? resolve(items[0]) : reject());
        });
    }

    public updateItem(id: number, data: ITodo): void {
        const liveItems = this.todos.getValue();
        const index = liveItems.findIndex(item => item.id === id);
        if (index > -1) {
            Object.assign(liveItems[index], data);
            this.todos.next(liveItems);
            this.storage.save(data, (storageItems) => this.todos.next(storageItems), id);
        }
    }

    public removeItem(id: number): void {
        const liveItems = this.todos.getValue();
        const index = liveItems.findIndex(item => item.id === id);
        if (index > -1) {
            liveItems.splice(index, 1);
            this.todos.next(liveItems);
            this.storage.remove(id, (storageItems) => this.todos.next(storageItems));
        }
    }

    public removeAll() {
        this.todos.next([]);
        this.storage.drop(noop);
    }

    public getCount(callback: Function) {
        const todos = {
            active: 0,
            completed: 0,
            total: 0
        };

        this.storage.findAll((data) => {
            data.forEach((todo) => {
                if (todo.completed) {
                    todos.completed++;
                } else {
                    todos.active++;
                }

                todos.total++;
            });
            callback(todos);
        });
    }
}
