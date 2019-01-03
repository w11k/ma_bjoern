package de.w11k.bsaja.todo;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import de.w11k.bsaja.todo.dummy.DummyContent;
import de.w11k.bsaja.todo.dummy.DummyContent.DummyItem;

public class FragmentList extends Fragment {
    private static final String ARG_SECTION_NUMBER = "section_number";

    private ListType mListType = ListType.ALL;
    private OnListItemInteractionListener mListener;

    public static FragmentList newInstance(int sectionNumber) {
        FragmentList fragment = new FragmentList();
        Bundle args = new Bundle();
        args.putInt(ARG_SECTION_NUMBER, sectionNumber);
        fragment.setArguments(args);
        return fragment;
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
            RecyclerView recyclerView = (RecyclerView) view;
            recyclerView.setLayoutManager(new LinearLayoutManager(context));
            recyclerView.setAdapter(new TodoItemRecyclerViewAdapter(DummyContent.ITEMS, mListener));
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        final Fragment parent = getParentFragment();
        try {
            if (parent != null) {
                mListener = (OnListItemInteractionListener) parent;
            } else {
                mListener = (OnListItemInteractionListener) context;
            }
        } catch (Exception e){
            throw new RuntimeException(parent.toString()
                    + " must implement OnListItemInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnListItemInteractionListener {
        void onSelectListItem(DummyItem item);
        void onChangeListItem(DummyItem item);
    }

    public enum ListType {
        ALL,
        ACTIVE,
        COMPLETED
    }
}
