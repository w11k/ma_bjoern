package de.w11k.bsaja.todo.database;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;
import android.support.annotation.NonNull;

/**
 * Immutable model class for a Item
 */
@Entity(tableName = "items")
public class Item {

    @NonNull
    @PrimaryKey
    @ColumnInfo(name = "id")
    private String mId;

    @ColumnInfo(name = "title")
    private String mTitle;

    @ColumnInfo(name = "completed")
    private Boolean mCompleted;

    @Ignore
    public Item(String title) {
        mId = String.valueOf(System.currentTimeMillis() / 1000L);
        mTitle = title;
        this.mCompleted = false;
    }

    public Item(String id, String title, Boolean completed) {
        this.mId = id;
        this.mTitle = title;
        this.mCompleted = completed;
    }

    public String getId() {
        return mId;
    }

    public String getTitle() {
        return mTitle;
    }

    public Boolean getCompleted() {
        return mCompleted;
    }
}
