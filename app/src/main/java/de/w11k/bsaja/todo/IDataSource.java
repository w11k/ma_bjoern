package de.w11k.bsaja.todo;

import java.util.List;

import de.w11k.bsaja.todo.database.Item;
import io.reactivex.Flowable;
import io.reactivex.Single;

public interface IDataSource {
    Flowable<List<Item>> getItems();

    Single<Item> getItemById(String itemId);

    void insertOrUpdateItem(Item item);

    void deleteAllItems();

    void deleteItemById(String itemId);
}
