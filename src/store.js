export class Store {
    constructor(name, callback = () => {
    }) {
        this._dbName = name;

        if (!localStorage.getItem(name)) {
            const todos = [];

            localStorage.setItem(name, JSON.stringify(todos));
        }

        callback.call(this, JSON.parse(localStorage.getItem(name)));
    }

    find(query, callback) {
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
    };

    findAll(callback = () => {
    }) {
        callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
    };

    save(updateData, callback = () => {
    }, id) {
        const todos = JSON.parse(localStorage.getItem(this._dbName));

        // If an ID was actually given, find the item and update each property
        if (id) {
            let i;
            for (i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    for (const key in updateData) {
                        todos[i][key] = updateData[key];
                    }
                    break;
                }
            }

            localStorage.setItem(this._dbName, JSON.stringify(todos));
            callback.call(this, todos[i]);
        } else {
            // Generate an ID
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage.setItem(this._dbName, JSON.stringify(todos));
            callback.call(this, updateData);
        }
    };

    remove(id, callback) {
        const todos = JSON.parse(localStorage.getItem(this._dbName));

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                todos.splice(i, 1);
                break;
            }
        }

        localStorage.setItem(this._dbName, JSON.stringify(todos));
        callback.call(this, todos);
    };

    drop(callback) {
        const todos = [];
        localStorage.setItem(this._dbName, JSON.stringify(todos));
        callback.call(this, todos);
    };
}
