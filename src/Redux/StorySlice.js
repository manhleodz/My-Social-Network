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
            state.stories = [...state.stories, action.payload];
        },
        deleteStory(state, action) {
            if (state.stories.length > 0)
                state.stories.map(story => { return story.id !== action.id });
        }
    }
})

export const { fetchStory, stopFetchStory, addStory, deleteStory } = storySlice.actions;

export const storyReducer = storySlice.reducer;