package de.w11k.bsaja.todo.database;

import java.util.List;

import de.w11k.bsaja.todo.IDataSource;
import io.reactivex.Flowable;

/**
 * Using the Room database as a data source.
 */
public class DataSource implements IDataSource {

    private final ItemDao mItemDao;

    public DataSource(ItemDao itemDao) {
        mItemDao = itemDao;
    }

    @Override
    public Flowable<List<Item>> getItems() {
        return mItemDao.getItems();
    }

    @Override
    public void insertOrUpdateItem(Item item) {
        mItemDao.insertItem(item);
    }

    @Override
    public void deleteAllItems() {
        mItemDao.deleteAllItems();
    }
}
