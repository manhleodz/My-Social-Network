import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
    name: 'stories',
    initialState: {
        stories: [],
        page: 0,
        hasMore: true,
    },
    reducers: {
        fetchStory(state, action) {
            state.page++;
            state.stories = [...state.stories, ...action.payload];
        },
        stopFetchStory(state) {
            state.hasMore = false;
        },
        addStory(state, action) {
            state.stories = [action.payload, ...state.stories];
        },
        deleteStory(state, action) {
            if (state.stories.length > 0)
                state.stories = state.stories.filter(story => {
                    return story.id !== action.payload.id
                });
        },
        replaceFirstStory(state, action) {
            state.stories = [action.payload, ...state.stories.slice(1)];
        },
    }
})

export const { fetchStory, stopFetchStory, addStory, deleteStory, replaceFirstStory } = storySlice.actions;

export const storyReducer = storySlice.reducer;