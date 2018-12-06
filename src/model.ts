import {setStorage, storage} from 'react-easy-params';
import {store} from 'react-easy-state';
import {Item, ItemUpdate, Storage} from './typings';

export class Model {
    private storage: Storage;

    constructor() {
        this.storage = storage as unknown as Storage;
        this.storage.items = this.storage.items || new Array<Item>();
    }

    getAllItems(): Array<Item> {
        return this.storage.items;
    };

    getItem(id: number): Item | undefined {
        return this.storage.items.find((item) => item.id === id);
    };

    createItem(title: string = ''): void {
        const item = {
            id: new Date().getTime(),
            title: title.trim(),
            completed: false
        };
        this.storage.items = this.storage.items.concat(item);
    };

    updateItem(id: number, data: ItemUpdate): void {
        const index = this.storage.items.findIndex((item) => item.id === id);
        if (index < 0) {
            return;
        }
        const item = Object.assign(this.storage.items[index], data);
        this.storage.items = [...this.storage.items.slice(0, index), item, ...this.storage.items.slice(index + 1)]; // immutable splice
    };

    deleteItem(id: number): void {
        const index = this.storage.items.findIndex((item) => item.id === id);
        if (index < 0) {
            return;
        }
        this.storage.items = [...this.storage.items.slice(0, index), ...this.storage.items.slice(index + 1)]; // immutable splice
    };

    getCount() {
        return this.storage.items.reduce((count, item) => {
            return {
                active: count.active + +!item.completed,
                completed: count.completed + +item.completed,
                total: ++count.total
            };
        }, {
            active: 0,
            completed: 0,
            total: 0
        });
    };
}

export default store(new Model());