import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alert: {
        message: 'alerta',
        type: '',
    }
};

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alert.message = action.payload;
        },
    },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;