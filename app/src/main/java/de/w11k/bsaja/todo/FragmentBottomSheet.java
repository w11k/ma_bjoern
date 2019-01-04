package de.w11k.bsaja.todo;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomSheetDialogFragment;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class FragmentBottomSheet extends BottomSheetDialogFragment {
    private static final String ARG_ITEM_ID = "item_id";
    private OnBottomSheetInteractionListener mListener;
    private String mItemId;
    private String[] mSheetItems = {
            "Edit",
            "Delete",
            "Cancel"
    };

    public static FragmentBottomSheet newInstance(String itemID) {
        final FragmentBottomSheet fragment = new FragmentBottomSheet();
        final Bundle args = new Bundle();
        args.putString(ARG_ITEM_ID, itemID);
        fragment.setArguments(args);
        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_bottom_sheet, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        mItemId = getArguments().getString(ARG_ITEM_ID);
        final RecyclerView recyclerView = (RecyclerView) view;
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(new SheetItemAdapter());
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        final Fragment parent = getParentFragment();
        if (parent != null) {
            mListener = (OnBottomSheetInteractionListener) parent;
        } else {
            mListener = (OnBottomSheetInteractionListener) context;
        }
    }

    @Override
    public void onDetach() {
        mListener = null;
        super.onDetach();
    }

    public interface OnBottomSheetInteractionListener {
        void onSelectSheetItem(int position, String itemId);
    }

    private class ViewHolder extends RecyclerView.ViewHolder {
        final TextView text;

        ViewHolder(LayoutInflater inflater, ViewGroup parent) {
            super(inflater.inflate(R.layout.fragment_bottom_sheet_item, parent, false));
            text = itemView.findViewById(R.id.text);
            text.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (mListener != null) {
                        mListener.onSelectSheetItem(getAdapterPosition(), mItemId);
                        dismiss();
                    }
                }
            });
        }
    }

    private class SheetItemAdapter extends RecyclerView.Adapter<ViewHolder> {
        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            return new ViewHolder(LayoutInflater.from(parent.getContext()), parent);
        }

        @Override
        public void onBindViewHolder(ViewHolder holder, int position) {
            holder.text.setText(mSheetItems[position]);
        }

        @Override
        public int getItemCount() {
            return mSheetItems.length;
        }
    }

}
