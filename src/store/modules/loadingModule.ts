import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    open: false,
  },
  reducers: {
    updateLoading: (state, action) => {
      state.open = action.payload.open;
    },
  },
});

export const { updateLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
