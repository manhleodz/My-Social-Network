import { createSlice } from "@reduxjs/toolkit";

export const MessengerSlice = createSlice({
    name: 'messenger',
    initialState: {
        openChat: [],
        boxChat: [],
    },
    reducers: {

        addBoxChat(state, action) {
            if (canPush(state.boxChat, action.payload))
                state.boxChat = [action.payload, ...state.boxChat];
        },

        openOneBox(state, action) {
            if (canPush(state.openChat, action.payload))
                state.openChat = [action.payload, ...state.openChat];
        },
        
        closeOneBox(state, action) {
            state.openChat = state.openChat.filter(box => {
                return box.id != action.payload;
            });
        }
    }
})

const canPush = (boxs, myObj) => {
    for (let box of boxs)
        if (box.id === myObj.id) return false;

    return true;
}

export const { addBoxChat, openOneBox, closeOneBox } = MessengerSlice.actions;

export const messengerReducer = MessengerSlice.reducer;