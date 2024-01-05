import { createSlice } from "@reduxjs/toolkit";
import { Auth } from '../Network/Auth';

export const userSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: "",
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        signOut(state) {
            Auth.signOut(() => {
                state.user = null;
            })
        }
    }
})

export const { setUser, signOut } = userSlice.actions;

export const userReducer = userSlice.reducer;