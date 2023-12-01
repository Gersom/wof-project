import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alert: {
        message: false,
        type: '', // success, error, warning,
        trigger: false,
        id: 100,
    }
};

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alert.message = action.payload.message;
            state.alert.type = action.payload.type;
            state.alert.trigger = !state.alert.trigger;
            state.alert.id = state.alert.id + 1;
        },
    },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;