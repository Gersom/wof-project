import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	myPets: [],
	updatePetsTriger: false,
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
		}
	},
});

export const { getMyPets, updatePetsTriger } = myPetsSlice.actions;

export default myPetsSlice.reducer;
