package de.w11k.bsaja.todo;

import android.arch.lifecycle.ViewModel;

import java.util.List;

import de.w11k.bsaja.todo.database.Item;
import io.reactivex.Completable;
import io.reactivex.Flowable;
import io.reactivex.functions.Action;
import io.reactivex.functions.Function;

public class TodoViewModel extends ViewModel {
    private IDataSource mRepository;

    public TodoViewModel(IDataSource repository) {
        mRepository = repository;
    }

    public Flowable<List<Item>> getItems() {
        return mRepository.getItems();
    }

    public Completable insertOrUpdateItem(final Item item) {
        return Completable.fromAction(new Action() {
            @Override
            public void run() throws Exception {
                mRepository.insertOrUpdateItem(item);
            }
        });
    }

    public Completable deleteAllItems() {
        return Completable.fromAction(new Action() {
            @Override
            public void run() throws Exception {
                mRepository.deleteAllItems();
            }
        });
    }

    public Flowable<Count> getCount() {
        return mRepository.getItems().map(new Function<List<Item>, Count>() {
            @Override
            public Count apply(List<Item> items) throws Exception {
                int total, active, completed;
                total = active = completed = 0;
                for (Item item : items) {
                    total++;
                    if (item.getCompleted()) {
                        completed++;
                    } else {
                        active++;
                    }
                }
                return new Count(total, active, completed);
            }
        });
    }

    public class Count {
        private int mTotal;
        private int mActive;
        private int mCompleted;

        Count(int total, int active, int completed) {
            mTotal = total;
            mActive = active;
            mCompleted = completed;
        }

        public int getTotal() {
            return mTotal;
        }

        public int getActive() {
            return mActive;
        }

        public int getCompleted() {
            return mCompleted;
        }
    }
}
