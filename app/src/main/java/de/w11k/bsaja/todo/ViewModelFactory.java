package de.w11k.bsaja.todo;


import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;

/**
 * Factory for ViewModels
 */
public class ViewModelFactory implements ViewModelProvider.Factory {

    private final IDataSource mRepository;

    public ViewModelFactory(IDataSource dataSource) {
        mRepository = dataSource;
    }

    @Override
    public <T extends ViewModel> T create(Class<T> modelClass) {
        if (modelClass.isAssignableFrom(TodoViewModel.class)) {
            return (T) new TodoViewModel(mRepository);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }
}