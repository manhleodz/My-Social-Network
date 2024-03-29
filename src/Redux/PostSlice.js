import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        page: 0,
        hasMore: true
    },
    reducers: {
        fetchData(state, action) {
            state.page++;
            state.posts = [...state.posts, ...action.payload];
        },
        setPosts(state, action) {
            state.posts = action.payload;
        },
        stopFetchData(state) {
            state.hasMore = false;
        },
        addPost(state, action) {
            state.posts = [action.payload, ...state.posts];
        },
        deletePost(state, action) {
            if (state.posts.length > 0)
                state.posts.map(post => { return post.id !== action.id });
        }
    }
})

export const { fetchData, stopFetchData, addPost, deletePost, setPosts } = postSlice.actions;

export const postReducer = postSlice.reducer;