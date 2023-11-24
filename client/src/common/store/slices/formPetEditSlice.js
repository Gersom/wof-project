import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	formPetEdit: {
		name: '',
		species: '',
		breed: '',
        gender: '',
		temperaments: '',
		manners: '',
		notes: '',
	},
};

const formPetEditSlice = createSlice({
    name: 'formPetEditSlice',
    initialState,
    reducers: {
        updateFormPetEdit(state, action) {
            state.formPetEdit = {
                ...state.formPetEdit,
                [action.payload.name]: action.payload.value,
            }
        },
    },
});

export const { updateFormPetEdit } = formPetEditSlice.actions;

export default formPetEditSlice.reducer;
