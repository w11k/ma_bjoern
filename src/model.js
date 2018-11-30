import {store} from 'react-easy-state';

const model = store({
    items: [
        {
            id: 666,
            title: 'test',
            completed: false
        }
    ],

    getAllItems: () => {
        return model.items;
    },

    getItem: (id) => {
        return model.items.find((item) => item.id === id);
    },

    addItem: (title = '') => {
        console.log(title);
        const item = {
            id: new Date().getTime(),
            title: title.trim(),
            completed: false
        };
        model.items = model.items.concat(item);
    },

    editItem: (id, data) => {
        const index = model.items.findIndex((item) => item.id === id);
        if (index < 0) {
            return;
        }
        const item = Object.assign(model.items[index], data);
        model.items = [...model.items.slice(0, index), item, ...model.items.slice(index + 1)]; // immutable splice
    },

    deleteItem: (id) => {
        const index = model.items.findIndex((item) => item.id === id);
        if (index < 0) {
            return;
        }
        model.items = [...model.items.slice(0, index), ...model.items.slice(index + 1)]; // immutable splice
    },

    getCount: () => {
        return model.items.reduce((count, item) => {
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