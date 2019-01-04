package de.w11k.bsaja.todo;

import java.util.List;

import de.w11k.bsaja.todo.database.Item;
import io.reactivex.Flowable;

/**
 * Access point for managing item data.
 */
public interface IDataSource {

    /**
     * Gets the item from the data source.
     *
     * @return the item from the data source.
     */
    Flowable<List<Item>> getItems();

    /**
     * Inserts the item into the data source, or, if this is an existing item, updates it.
     *
     * @param item the item to be inserted or updated.
     */
    void insertOrUpdateItem(Item item);

    /**
     * Deletes all items from the data source.
     */
    void deleteAllItems();
}
