import {storage} from 'react-easy-params';
import {store} from 'react-easy-state';

storage.items = storage.items || [];

const model = store({
    getAllItems: () => {
        return storage.items;
    },

    getItem: (id) => {
        return storage.items.find((item) => item.id === id);
    },

    addItem: (title = '') => {
        const item = {
            id: new Date().getTime(),
            title: title.trim(),
            completed: false
        };
        storage.items = storage.items.concat(item);
    },

    editItem: (id, data) => {
        const index = storage.items.findIndex((item) => item.id === id);
        if (index < 0) {
            return;
        }
        const item = Object.assign(storage.items[index], data);
        storage.items = [...storage.items.slice(0, index), item, ...storage.items.slice(index + 1)]; // immutable splice
    },

    deleteItem: (id) => {
        const index = storage.items.findIndex((item) => item.id === id);
        if (index < 0) {
            return;
        }
        storage.items = [...storage.items.slice(0, index), ...storage.items.slice(index + 1)]; // immutable splice
    },

    getCount: () => {
        return storage.items.reduce((count, item) => {
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
    }
});
export default model;