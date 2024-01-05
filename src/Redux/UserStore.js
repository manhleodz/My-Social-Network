import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './UserSlice';

export const userStore = configureStore({
    reducer: {
        authentication: userReducer,
    }
})