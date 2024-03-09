import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: "",
    },
    reducers: {

        setUser(state, action) {
            state.user = action.payload;
        },
        signOut(state, action) {
            state.user = null;
        }
    }
})

export const { setUser, signOut, setStatus } = userSlice.actions;

export const userReducer = userSlice.reducer;