import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ws: null,
  tryReconnect: 0,
};


const wsSlice = createSlice({
  name: "wsSlice",
  initialState,
  reducers: {
    setWs: (state, action) => {
      state.ws = action.payload;
    },
    setTryReconnect: (state, action) => {
      state.tryReconnect = 1 + state.tryReconnect;
    }
  },
});

export const { setWs, setTryReconnect } = wsSlice.actions;

export default wsSlice.reducer;