import { createSlice } from "@reduxjs/toolkit";

export const FriendSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: [],
        hasMore: true
    },
    reducers: {
        fetchFriend(state, action) {
            state.friends =action.payload;
        },
        stopFetchFriend(state) {
            state.hasMore = false;
        }
    }
})

export const { fetchFriend, stopFetchFriend } = FriendSlice.actions;

export const friendReducer = FriendSlice.reducer;