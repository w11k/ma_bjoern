export class Store {

    /**
     * Creates a new client side storage object and will create an empty
     * collection if no collection already exists.
     *
     * @constructor
     * @param {string} name The name of our DB we want to use
     * @param {function} callback Our fake DB uses callbacks because in
     * real life you probably would be making AJAX calls
     */
    constructor(name, callback = () => {
    }) {
        this._dbName = name;

        if (!localStorage.getItem(name)) {
            const todos = [];

            localStorage.setItem(name, JSON.stringify(todos));
        }

        callback.call(this, JSON.parse(localStorage.getItem(name)));
    }

    /**
     * Finds items based on a query given as a JS object
     *
     * @param {object} query The query to match against (i.e. {foo: 'bar'})
     * @param {function} callback     The callback to fire when the query has
     * completed running
     *
     * @example
     * db.find({foo: 'bar', hello: 'world'}, (data) => {
     *	 // data will return any items that have foo: bar and
     *	 // hello: world in their properties
     * });
     */
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

    /**
     * Will retrieve all data from the collection
     *
     * @param {function} callback The callback to fire upon retrieving data
     */
    findAll(callback = () => {
    }) {
        callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
    };

    /**
     * Will save the given data to the DB. If no item exists it will create a new
     * item, otherwise it'll simply update an existing item's properties
     *
     * @param {object} updateData The data to save back into the DB
     * @param {function} callback The callback to fire after saving
     * @param {number} id An optional param to enter an ID of an item to update
     */
    save(updateData, callback = () => {
    }, id) {
        const todos = JSON.parse(localStorage.getItem(this._dbName));

        // If an ID was actually given, find the item and update each property
        if (id) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    for (const key in updateData) {
                        todos[i][key] = updateData[key];
                    }
                    break;
                }
            }

            localStorage.setItem(this._dbName, JSON.stringify(todos));
            callback.call(this, todos);
        } else {
            // Generate an ID
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage.setItem(this._dbName, JSON.stringify(todos));
            callback.call(this, [updateData]);
        }
    };

    /**
     * Will remove an item from the Store based on its ID
     *
     * @param {number} id The ID of the item you want to remove
     * @param {function} callback The callback to fire after saving
     */
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

    /**
     * Will drop all storage and start fresh
     *
     * @param {function} callback The callback to fire after dropping the data
     */
    drop(callback) {
        const todos = [];
        localStorage.setItem(this._dbName, JSON.stringify(todos));
        callback.call(this, todos);
    };
}
