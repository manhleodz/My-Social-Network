import { createSlice } from "@reduxjs/toolkit";

export const MessengerSlice = createSlice({
    name: 'messenger',
    initialState: {
        isOpen: false,
        unread: 0,
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

        updateMessageCache(state, action) {
            const { RelationshipId, message, id, sender, type, updatedAt } = action.payload;
            let idx = state.messageCache.findIndex(e => e.RelationshipId == RelationshipId);

            state.messageCache[idx].messages.push({ RelationshipId, message, id, sender, type, updatedAt })
        },

        addBoxChat(state, action) {
            if (canPush(state.boxChat, action.payload))
                state.boxChat = [action.payload, ...state.boxChat];
        },

        addGroupChat(state, action) {
            state.groupChat = [...state.groupChat, ...action.payload];
        },

        openOneBox(state, action) {
            if (canPush(state.openChat, action.payload))
                state.openChat = [...state.openChat, action.payload];
        },

        seenMessage(state, action) {
            const RelationshipId = action.payload;
            let idx = state.allChat.findIndex(e => e.RelationshipId === RelationshipId);
            state.allChat[idx].seen = true;
        },

        updateOneChat(state, action) {
            const { RelationshipId, message, sender, type, updatedAt } = action.payload;
            let idx = state.allChat.findIndex(e => e.RelationshipId === RelationshipId);

            state.allChat[idx].message = message;
            state.allChat[idx].sender = sender;
            state.allChat[idx].seen = false;
            state.allChat[idx].updatedAt = updatedAt;
            state.allChat[idx].type = type;

            state.allChat = state.allChat.sort(compare)
        },

        updateAfterDeleteMessage(state, action) {
            const { RelationshipId, id } = action.payload;

            const idx = state.messageCache.findIndex(e => e.RelationshipId == RelationshipId);
            if (idx !== -1) {
                const newList = state.messageCache[idx].messages.filter(message => message.id !== id);
                state.messageCache[idx] = {
                    ...state.messageCache[idx],
                    messages: newList
                }
            }
        },

        inscreaseUnread(state, action) {
            if (state.isOpen === false) state.unread++;
        },

        clearUnread(state, action) {
            if (state.isOpen === false) state.unread++;
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

export const { addBoxChat, inscreaseUnread, seenMessage, updateAfterDeleteMessage, clearUnread, openOneBox, closeOneBox, updateOneChat, updateMessageCache, addGroupChat, smallOneBox, openMobileChat, setIsOpenChat, fetchAllChat, saveMessage, setCreateGroup } = MessengerSlice.actions;

export const messengerReducer = MessengerSlice.reducer;