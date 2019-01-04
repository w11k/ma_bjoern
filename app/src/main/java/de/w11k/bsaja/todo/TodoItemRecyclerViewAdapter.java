package de.w11k.bsaja.todo;

import android.os.Handler;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.TextView;

import java.util.List;

import de.w11k.bsaja.todo.FragmentList.OnListInteractionListener;
import de.w11k.bsaja.todo.database.Item;

public class TodoItemRecyclerViewAdapter extends RecyclerView.Adapter<TodoItemRecyclerViewAdapter.ViewHolder> {

    private final List<Item> mValues;
    private final OnListInteractionListener mListener;

    public TodoItemRecyclerViewAdapter(List<Item> items, FragmentList.OnListInteractionListener listener) {
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mTitleView.setText(mValues.get(position).getTitle());
        holder.mCompletedView.setChecked(mValues.get(position).getCompleted());

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    mListener.onSelectListItem(holder.mItem);
                }
            }
        });

        holder.mCompletedView.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (null != mListener) {
                    holder.mItem.setCompleted(isChecked);
                    final Handler handler = new Handler();
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            mListener.onChangeListItem(holder.mItem);
                        }
                    }, 500);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mTitleView;
        public final CheckBox mCompletedView;
        public Item mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mTitleView = view.findViewById(R.id.tvTitle);
            mCompletedView = view.findViewById(R.id.cbCompleted);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mTitleView.getText() + "'";
        }
    }
}
