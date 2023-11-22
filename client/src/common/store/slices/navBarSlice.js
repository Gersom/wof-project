import { createSlice } from '@reduxjs/toolkit';

const initialState = { // Estado inicial
	selected: 'ofertas',
};

const navBarSlice = createSlice({
	name: 'navBarSlice', // Nombre de asignación del slice
	initialState,
	reducers: {
		// Funciones que modifican el estado
		actionSelected(state, action) {
			state.selected = action.payload;
		},
	},
});

export const { actionSelected } = navBarSlice.actions; //Exportamos las funciones para usarlas directamente

export default navBarSlice.reducer;
