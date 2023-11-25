import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	myPets: [],
};

const myPetsSlice = createSlice({
	name: 'formPetEditSlice',
	initialState,
	reducers: {
		updateFormPetEdit(state, action) {
			state.formPetEdit = {
				...state.formPetEdit,
				[action.payload.name]: action.payload.value,
			};
		},
	},
});

export const { updateFormPetEdit } = myPetsSlice.actions;

export default myPetsSlice.reducer;
