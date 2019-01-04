package de.w11k.bsaja.todo;

import android.arch.lifecycle.ViewModelProviders;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.TabLayout;
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

import java.util.ArrayList;
import java.util.List;

import de.w11k.bsaja.todo.database.Item;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class FragmentTabs extends Fragment implements FragmentList.OnListInteractionListener, FragmentBottomSheet.OnBottomSheetInteractionListener {
    private static final String TAG = FragmentTabs.class.getSimpleName();
    private final CompositeDisposable[] mDisposable = {
            new CompositeDisposable(),
            new CompositeDisposable(),
            new CompositeDisposable()
    };
    private SectionsPagerAdapter mSectionsPagerAdapter;
    private ViewPager mViewPager;
    private ViewModelFactory mViewModelFactory;
    private TodoViewModel mViewModel;

    public FragmentTabs() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_tabs, container, false);

        mSectionsPagerAdapter = new SectionsPagerAdapter(getChildFragmentManager());
        mViewPager = view.findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);
        TabLayout tabLayout = view.findViewById(R.id.tabs);
        mViewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(mViewPager));

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

    }

    @Override
    public void onListViewStart(final FragmentList fragment) {
        mDisposable[fragment.getListType().getValue()].add(mViewModel.getItems()
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
                        Log.e(TAG, "Unable to update username", throwable);
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
        mDisposable[fragment.getListType().getValue()].clear();
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
                mViewModel.getItemById(itemId)
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
    }
}
