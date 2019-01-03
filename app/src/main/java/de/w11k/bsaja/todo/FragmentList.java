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

    private int mSectionNumber = 0;
    private OnListItemInteractionListener mListener;

    public FragmentList() {
    }

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
            mSectionNumber = getArguments().getInt(ARG_SECTION_NUMBER);
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
        if (context instanceof OnListItemInteractionListener) {
            mListener = (OnListItemInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListItemInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnListItemInteractionListener {
        void onListItemSelection(DummyItem item);
        void onListItemChange(DummyItem item);
    }
}
