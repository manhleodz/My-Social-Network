import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './UserSlice';
import { postReducer } from './PostSlice';
import { storyReducer } from './StorySlice'

export const userStore = configureStore({
    reducer: {
        authentication: userReducer,
        posts: postReducer,
        stories: storyReducer
    }
})