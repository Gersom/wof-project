import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ws: null,
};


const wsSlice = createSlice({
  name: "wsSlice",
  initialState,
  reducers: {
    setWs: (state, action) => {
      state.ws = action.payload;
    },
  },
});

export const { setWs } = wsSlice.actions;

export default wsSlice.reducer;