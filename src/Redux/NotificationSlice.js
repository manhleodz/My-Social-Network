import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        isOpen: false,
        count: 0,
    },
    reducers: {

        setOpenNotification(state, action) {
            state.isOpen = action.payload;
            state.count = 0;
        },

        fetchNotifications(state, action) {
            state.notifications = [...state.notifications, ...action.payload];
            state.count = (Number)(state.count) + action.payload.length;
        },

        setNotifications(state, action) {
            state.notifications = action.payload;
        },
        stopFetchNotifications(state) {
            state.hasMore = false;
        },
        addNotification(state, action) {
            state.notifications = [action.payload, ...state.notifications];
            if (!state.isOpen)
                state.count++;
        },
        deleteNotification(state, action) {
            if (state.notifications.length > 0) {
                state.count--;
                state.notifications.map(post => { return post.id !== action.id });
            }
        }
    }
})

export const { setOpenNotification, fetchNotifications, stopFetchNotifications, addNotification, deleteNotification, setNotifications } = NotificationSlice.actions;

export const notificationReducer = NotificationSlice.reducer;