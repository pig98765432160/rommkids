import { EStatus } from "@/shared/types/Status";
import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    status: EStatus.SUCCESS,
    open: false,
    text: null,
    link: null,
    closeBtn: false,
    routerLink: null,
  },
  reducers: {
    update: (state, action) => {
      state.status = action.payload.status;
      state.open = action.payload.open;
      state.text = action.payload.text;
      state.link = action.payload.link;
      state.closeBtn = action.payload.closeBtn;
      state.routerLink = action.payload.routerLink;
    },
  },
});

export const { update } = alertSlice.actions;

export default alertSlice.reducer;
