import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        page: 0,
        hasMore: true
    },
    reducers: {
        fetchNotifications(state, action) {
            state.page++;
            state.notifications = [...state.notifications, ...action.payload];
        },
        setNotifications(state, action) {
            state.notifications = action.payload;
        },
        stopFetchNotifications(state) {
            state.hasMore = false;
        },
        addNotification(state, action) {
            state.notifications = [action.payload, ...state.notifications];
        },
        deleteNptification(state, action) {
            if (state.notifications.length > 0)
                state.notifications.map(post => { return post.id !== action.id });
        }
    }
})

export const { fetchNotifications, stopFetchNotifications, addNotification, deleteNptification, setNotifications } = NotificationSlice.actions;

export const postReducer = NotificationSlice.reducer;