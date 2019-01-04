package de.w11k.bsaja.todo.database;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;

import java.util.List;

import io.reactivex.Flowable;

/**
 * Data Access Object for the items table.
 */
@Dao
public interface ItemDao {

    /**
     * Get the item from the table. Since for simplicity we only have one item in the database,
     * this query gets all items from the table, but limits the result to just the 1st item.
     *
     * @return the item from the table
     */
    @Query("SELECT * FROM Items ORDER BY id")
    Flowable<List<Item>> getItems();

    /**
     * Insert a item in the database. If the item already exists, replace it.
     *
     * @param item the item to be inserted.
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertItem(Item item);

    /**
     * Delete all items.
     */
    @Query("DELETE FROM Items")
    void deleteAllItems();
}
