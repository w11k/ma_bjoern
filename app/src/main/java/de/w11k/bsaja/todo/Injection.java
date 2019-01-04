package de.w11k.bsaja.todo;

import android.content.Context;

import de.w11k.bsaja.todo.database.DataSource;
import de.w11k.bsaja.todo.database.ItemsDatabase;

/**
 * Enables injection of data sources.
 */
public class Injection {

    public static IDataSource provideUserDataSource(Context context) {
        ItemsDatabase database = ItemsDatabase.getInstance(context);
        return new DataSource(database.ItemDao());
    }

    public static ViewModelFactory provideViewModelFactory(Context context) {
        IDataSource dataSource = provideUserDataSource(context);
        return new ViewModelFactory(dataSource);
    }
}
