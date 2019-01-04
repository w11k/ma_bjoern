package de.w11k.bsaja.todo;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;

import de.w11k.bsaja.todo.database.Item;

public class FragmentList extends Fragment {
    private static final String ARG_SECTION_NUMBER = "section_number";

    private ListType mListType = ListType.ALL;
    private OnListInteractionListener mListener;
    private RecyclerView mRecyclerView;

    public static FragmentList newInstance(int sectionNumber) {
        FragmentList fragment = new FragmentList();
        Bundle args = new Bundle();
        args.putInt(ARG_SECTION_NUMBER, sectionNumber);
        fragment.setArguments(args);
        return fragment;
    }

    public ListType getListType() {
        return mListType;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mListType = ListType.values()[getArguments().getInt(ARG_SECTION_NUMBER)];
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_list, container, false);

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            mRecyclerView = (RecyclerView) view;
            mRecyclerView.setLayoutManager(new LinearLayoutManager(context));
        }
        return view;
    }

    public void updateViewAdapter(List<Item> items) {
        if (mRecyclerView != null) {
            mRecyclerView.setAdapter(new TodoItemRecyclerViewAdapter(items, mListener));
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        mListener.onListViewStart(this);
    }

    @Override
    public void onStop() {
        super.onStop();
        mListener.onListViewStop(this);
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        final Fragment parent = getParentFragment();
        try {
            if (parent != null) {
                mListener = (OnListInteractionListener) parent;
            } else {
                mListener = (OnListInteractionListener) context;
            }
        } catch (Exception e) {
            throw new RuntimeException(parent.toString()
                    + " must implement OnListInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public enum ListType {
        ALL(0),
        ACTIVE(1),
        COMPLETED(2);

        private final int value;

        private ListType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

    public interface OnListInteractionListener {
        void onSelectListItem(Item item);

        void onChangeListItem(Item item);

        void onListViewStart(FragmentList fragment);

        void onListViewStop(FragmentList fragment);
    }
}
