import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	chats: [
		{
			chatId: 0,
			notifications: 0,
		},
	],
	msgtotal: 0,
};

const chatSlice = createSlice({
	name: 'chatSlice',
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
      let numberNot = 0
			state.chats = [...state.chats].map((chat) => {
				if (chat.id === action.payload.id) {
          numberNot = chat.notifications
					chat.notifications = 0;
				}
				return chat;
			});
      state.msgtotal = state.msgtotal - numberNot
		},
	},
});

export const { setChat, cleanChat } = chatSlice.actions;

export default chatSlice.reducer;
