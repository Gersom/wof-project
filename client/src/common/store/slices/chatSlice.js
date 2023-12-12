import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [
    {
      chatId: 0,
      notifications: 0,
    },
  ],
  msgtotal: 0,
  chatsTotal: [],
  chatTrigger: false,
  role: "",
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setChat: (state, action) => {
      let flag = false;
      state.chats = [...state.chats].map((chat) => {
        if (chat.id === action.payload.id) {
          chat.notifications += 1;
          flag = true;
        }
        return chat;
      });
      if (!flag) {
        state.chats = [
          ...state.chats,
          { id: action.payload.id, notifications: 1 },
        ];
      }
      state.msgtotal = state.msgtotal += 1;
    },
    cleanChat: (state, action) => {
      let numberNot = 0;
      state.chats = [...state.chats].map((chat) => {
        if (chat.id === action.payload.id) {
          numberNot = chat.notifications;
          chat.notifications = 0;
        }
        return chat;
      });
      state.msgtotal = state.msgtotal - numberNot;
    },
    getChat: (state, action) => {
      state.chatsTotal = action.payload;
    },
    setMsgChat: (state, action) => {
      state.chatsTotal = [...state.chatsTotal].map((chat) => {
        if (chat.id === action.payload.chatId) {
          chat.messageChats = [...chat.messageChats, action.payload];
        }
        return chat;
      });
      if (state.role === "owner" && action.payload.isCaregiver) {
        let flag = false;
        state.chats = [...state.chats].map((chat) => {
          if (chat.id === action.payload.chatId) {
            chat.notifications += 1;
            flag = true;
          }
          return chat;
        });
        if (!flag) {
          state.chats = [
            ...state.chats,
            { id: action.payload.chatId, notifications: 1 },
          ];
        }
        state.msgtotal = state.msgtotal += 1;
      } else if (state.role === "caregiver" && action.payload.isOwner) {
        let flag = false;
        state.chats = [...state.chats].map((chat) => {
          if (chat.id === action.payload.chatId) {
            chat.notifications += 1;
            flag = true;
          }
          return chat;
        });
        if (!flag) {
          state.chats = [
            ...state.chats,
            { id: action.payload.chatId, notifications: 1 },
          ];
        }
        state.msgtotal = state.msgtotal += 1;
      }
      // setChat(state, action.payload.id)
    },
    setChatTrigger: (state, action) => {
      state.chatTrigger = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const {
  setChat,
  cleanChat,
  getChat,
  setMsgChat,
  setChatTrigger,
  setRole,
} = chatSlice.actions;

export default chatSlice.reducer;
