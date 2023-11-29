import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	myPets: [],
};

const myPetsSlice = createSlice({
	name: 'formPetEditSlice',
	initialState,
	reducers: {
		getMyPets: (state, action) => {
			state.myPets = action.payload;
		},
	},
});

export const { getMyPets } = myPetsSlice.actions;

export default myPetsSlice.reducer;
