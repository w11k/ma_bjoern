package de.w11k.bsaja.todo.database;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;

import java.util.List;

import io.reactivex.Flowable;
import io.reactivex.Single;

@Dao
public interface ItemDao {
    @Query("SELECT * FROM Items ORDER BY id")
    Flowable<List<Item>> getItems();

    @Query("SELECT * FROM Items WHERE id = :itemId")
    Single<Item> getItemById(String itemId);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertItem(Item item);

    @Query("DELETE FROM Items")
    void deleteAllItems();

    @Query("DELETE FROM Items WHERE id = :itemId")
    void deleteItemById(String itemId);
}
