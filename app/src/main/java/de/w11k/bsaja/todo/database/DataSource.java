package de.w11k.bsaja.todo.database;

import java.util.List;
import java.util.concurrent.Executor;

import de.w11k.bsaja.todo.IDataSource;
import io.reactivex.Flowable;
import io.reactivex.Single;

public class DataSource implements IDataSource {
    private final ItemDao mItemDao;
    private Executor mExecutor;

    public DataSource(ItemDao itemDao, Executor exec) {
        mItemDao = itemDao;
        mExecutor = exec;
    }

    @Override
    public Flowable<List<Item>> getItems() {
        return mItemDao.getItems();
    }

    @Override
    public Single<Item> getItemById(String itemId) {
        return mItemDao.getItemById(itemId);
    }

    @Override
    public void insertOrUpdateItem(final Item item) {
        mExecutor.execute(new Runnable() {
            @Override
            public void run() {
                mItemDao.insertItem(item);
            }
        });
    }

    @Override
    public void deleteAllItems() {
        mExecutor.execute(new Runnable() {
            @Override
            public void run() {
                mItemDao.deleteAllItems();
            }
        });
    }

    @Override
    public void deleteItemById(final String itemId) {
        mExecutor.execute(new Runnable() {
            @Override
            public void run() {
                mItemDao.deleteItemById(itemId);
            }
        });
    }
}
