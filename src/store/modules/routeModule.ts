import { createSlice } from "@reduxjs/toolkit";

export const routeSlice = createSlice({
  name: "route",
  initialState: {
    hasPrevious: false,
  },
  reducers: {
    updateRoute: (state, action) => {
      state.hasPrevious = action.payload.hasPrevious;
    },
  },
});

export const { updateRoute } = routeSlice.actions;

export default routeSlice.reducer;
