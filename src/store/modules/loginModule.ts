import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    open: false,
  },
  reducers: {
    updateLogin: (state, action) => {
      state.open = action.payload.open;
    },
  },
});

export const { updateLogin } = loginSlice.actions;

export default loginSlice.reducer;
