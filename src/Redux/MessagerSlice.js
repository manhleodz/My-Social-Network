import { createSlice } from "@reduxjs/toolkit";

export const MessengerSlice = createSlice({
    name: 'messenger',
    initialState: {
        isOpen: false,
        createGroup: false,
        openChat: [],
        boxChat: [],
        groupChat: [],
        allChat: [],
        messageCache: [],
    },
    reducers: {

        fetchAllChat(state, action) {
            state.allChat = [...action.payload, ...state.allChat];

            state.allChat = state.allChat.sort(compare)
        },

        saveMessage(state, action) {
            state.messageCache = [...state.messageCache, action.payload];
        },

        addBoxChat(state, action) {
            if (canPush(state.boxChat, action.payload))
                state.boxChat = [...state.boxChat, action.payload];
        },

        addGroupChat(state, action) {
            state.groupChat = [...state.groupChat, ...action.payload];
        },

        openOneBox(state, action) {
            if (canPush(state.openChat, action.payload))
                state.openChat = [...state.openChat, action.payload];
        },

        closeOneBox(state, action) {
            state.openChat = state.openChat.filter(box => {
                return box.id != action.payload;
            });

            state.boxChat = state.boxChat.filter(box => {
                return box.id != action.payload;
            });
        },

        smallOneBox(state, action) {
            state.openChat = state.openChat.filter(box => {
                return box.id != action.payload;
            });
        },

        openMobileChat(state, action) {
            if (canPush(state.boxChat, action.payload))
                state.boxChat = [action.payload];

            if (canPush(state.openChat, action.payload))
                state.openChat = [action.payload];
        },

        setIsOpenChat(state, action) {
            state.isOpen = action.payload;
        },

        setCreateGroup(state, action) {
            state.createGroup = action.payload;
        },
    }
})

function compare(a, b) {
    if (a.updatedAt > b.updatedAt) {
        return -1;
    } else if (a.updatedAt === b.updatedAt) {
        return 0;
    } else {
        return 1;
    }
}

const canPush = (boxs, myObj) => {
    for (let box of boxs)
        if (box.id === myObj.id) return false;

    return true;
}

export const { addBoxChat, openOneBox, closeOneBox, addGroupChat, smallOneBox, openMobileChat, setIsOpenChat, fetchAllChat, saveMessage, setCreateGroup } = MessengerSlice.actions;

export const messengerReducer = MessengerSlice.reducer;