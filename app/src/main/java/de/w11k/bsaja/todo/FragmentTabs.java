package de.w11k.bsaja.todo;

import android.arch.lifecycle.ViewModelProviders;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.FrameLayout;

import com.rahimlis.badgedtablayout.BadgedTabLayout;

import java.util.ArrayList;
import java.util.List;

import de.w11k.bsaja.todo.database.Item;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class FragmentTabs extends Fragment implements FragmentList.OnListInteractionListener, FragmentBottomSheet.OnBottomSheetInteractionListener {
    private static final String TAG = FragmentTabs.class.getSimpleName();
    private final CompositeDisposable[] mDisposableTabContent = {
            new CompositeDisposable(),
            new CompositeDisposable(),
            new CompositeDisposable()
    };
    private Disposable mDisposableGetCount;
    private Disposable mDisposableGetItem;
    private SectionsPagerAdapter mSectionsPagerAdapter;
    private ViewPager mViewPager;
    private ViewModelFactory mViewModelFactory;
    private TodoViewModel mViewModel;
    private BadgedTabLayout mTabLayout;

    public FragmentTabs() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_tabs, container, false);

        mSectionsPagerAdapter = new SectionsPagerAdapter(getChildFragmentManager());
        mViewPager = view.findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);
        mTabLayout = view.findViewById(R.id.tabs);
        mTabLayout.setupWithViewPager(mViewPager);
        mTabLayout.setIcon(0, R.drawable.ic_list_white_24dp);
        mTabLayout.setIcon(1, R.drawable.ic_check_box_outline_white_24dp);
        mTabLayout.setIcon(2, R.drawable.ic_check_box_white_24dp);
        mTabLayout.setBadgeText(0, "0");
        mTabLayout.setBadgeText(1, "0");
        mTabLayout.setBadgeText(2, "0");

        FloatingActionButton fab = view.findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onAddListItem();
            }
        });
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModelFactory = Injection.provideViewModelFactory(getContext());
        mViewModel = ViewModelProviders.of(this, mViewModelFactory).get(TodoViewModel.class);
    }

    @Override
    public void onSelectListItem(Item item) {
        FragmentBottomSheet bottomSheetFragment = FragmentBottomSheet.newInstance(item.getId());
        bottomSheetFragment.show(getChildFragmentManager(), bottomSheetFragment.getTag());
    }

    @Override
    public void onChangeListItem(Item item) {
        mViewModel.insertOrUpdateItem(item);
    }

    @Override
    public void onListViewStart(final FragmentList fragment) {
        mDisposableTabContent[fragment.getListType().getValue()].add(mViewModel.getItems()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<List<Item>>() {
                    @Override
                    public void accept(List<Item> items) throws Exception {
                        if (items != null) {
                            fragment.updateViewAdapter(filterItems(items, fragment.getListType()));
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(Throwable throwable) throws Exception {
                        Log.e(TAG, "Unable to get tab content", throwable);
                    }
                }));
    }

    private List<Item> filterItems(List<Item> items, FragmentList.ListType type) {
        List<Item> result = new ArrayList<Item>();
        for (Item item : items) {
            if (type == FragmentList.ListType.ALL || (type == FragmentList.ListType.ACTIVE && !item.getCompleted()) || (type == FragmentList.ListType.COMPLETED && item.getCompleted())) {
                result.add(item);
            }
        }
        return result;
    }

    @Override
    public void onListViewStop(FragmentList fragment) {
        mDisposableTabContent[fragment.getListType().getValue()].clear();
    }

    public void onAddListItem() {
        openDialog();
    }

    private void openDialog() {
        openDialog(null);
    }

    private void openDialog(final Item item) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());

        if (item != null) {
            builder.setTitle("Edit Item");
        } else {
            builder.setTitle("Create Item");
        }

        final EditText input = new EditText(getContext());
        input.setSingleLine();
        input.setHint("Title");
        if (item != null) {
            input.setText(item.getTitle());
        }
        FrameLayout container = new FrameLayout(getContext());
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.leftMargin = getResources().getDimensionPixelSize(R.dimen.dialog_margin);
        params.rightMargin = getResources().getDimensionPixelSize(R.dimen.dialog_margin);
        input.setLayoutParams(params);
        container.addView(input);
        builder.setView(container);

        builder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String title = input.getText().toString();
                if (item != null) {
                    item.setTitle(title);
                    mViewModel.insertOrUpdateItem(item);
                } else {
                    mViewModel.insertOrUpdateItem(new Item(title));
                }
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });

        builder.show();
        input.requestFocus();
    }

    @Override
    public void onSelectSheetItem(int position, String itemId) {
        switch (position) {
            case 0:
                mDisposableGetItem = mViewModel.getItemById(itemId)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(new Consumer<Item>() {
                            @Override
                            public void accept(Item item) throws Exception {
                                if (item != null) {
                                    openDialog(item);
                                }
                            }
                        }, new Consumer<Throwable>() {
                            @Override
                            public void accept(Throwable throwable) throws Exception {
                                Log.e(TAG, "Unable to retrieve item", throwable);
                            }
                        });
                break;
            case 1:
                mViewModel.deleteItemById(itemId);
                break;
            case 2:
            default:
                break;
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        mDisposableGetCount = mViewModel.getCount()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        new Consumer<TodoViewModel.Count>() {
                            @Override
                            public void accept(TodoViewModel.Count count) throws Exception {
                                mTabLayout.setBadgeText(0, String.valueOf(count.getTotal()));
                                mTabLayout.setBadgeText(1, String.valueOf(count.getActive()));
                                mTabLayout.setBadgeText(2, String.valueOf(count.getCompleted()));
                            }
                        },
                        new Consumer<Throwable>() {
                            @Override
                            public void accept(Throwable throwable) throws Exception {
                                Log.e(TAG, "Unable to get count", throwable);
                            }
                        }
                );
    }

    @Override
    public void onStop() {
        super.onStop();
        if (mDisposableGetItem != null && !mDisposableGetItem.isDisposed()) {
            mDisposableGetItem.dispose();
        }
        if (mDisposableGetCount != null && !mDisposableGetCount.isDisposed()) {
            mDisposableGetCount.dispose();
        }
    }

    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return FragmentList.newInstance(position);
        }

        @Override
        public int getCount() {
            return 3;
        }


        @Override
        public CharSequence getPageTitle(int position) {
            switch (position) {
                case 0:
                    return "All";
                case 1:
                    return "Active";
                case 2:
                    return "Completed";
            }
            return null;
        }
    }
}
