import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './UserSlice';
import { postReducer } from './PostSlice';
import { storyReducer } from './StorySlice';
import { friendReducer } from './FriendSlice';
import { messengerReducer } from './MessagerSlice';
import { notificationReducer } from "./NotificationSlice";

export const userStore = configureStore({
    reducer: {
        authentication: userReducer,
        posts: postReducer,
        stories: storyReducer,
        friends: friendReducer,
        messenger: messengerReducer,
        notifications: notificationReducer
    }
})