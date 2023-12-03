import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	myPets: [],
	updatePetsTriger: false,
	posts : []
};

const myPetsSlice = createSlice({
	name: 'formPetEditSlice',
	initialState,
	reducers: {
		getMyPets: (state, action) => {
			state.myPets = action.payload;
		},
		updatePetsTriger: (state) => {
			state.updatePetsTriger = !state.updatePetsTriger;
		},
		setPosts: (state, action) => {
			state.posts = [...state.posts, action.payload];
		},
		deletePosts: (state, action) => {
			state.posts = state.posts.filter((id) => id !== action.payload);
		}
	},
});

export const { getMyPets, updatePetsTriger, setPosts, deletePosts } = myPetsSlice.actions;

export default myPetsSlice.reducer;
