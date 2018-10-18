export class Model {
    constructor(storage) {
        this.storage = storage;
    }

    create(title = '', callback = () => {
    }) {
        const newItem = {
            title: title.trim(),
            completed: false
        };

        this.storage.save(newItem, callback);
    };

    read(query, callback = () => {
    }) {
        const queryType = typeof query;

        if (queryType === 'function') {
            callback = query;
            return this.storage.findAll(callback);
        } else if (queryType === 'string' || queryType === 'number') {
            query = parseInt(query, 10);
            this.storage.find({id: query}, callback);
        } else {
            this.storage.find(query, callback);
        }
    };

    update(id, data, callback) {
        this.storage.save(data, callback, id);
    };

    remove(id, callback) {
        this.storage.remove(id, callback);
    };

    removeAll(callback) {
        this.storage.drop(callback);
    };

    getCount(callback) {
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
    };
}
