import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(state, action) {
      const notification = action.payload;
      return notification;
    },
    notificationRemove(state, action) {
      return initialState;
    },
  },
});

export const { notificationChange, notificationRemove } =
  notificationSlice.actions;
export default notificationSlice.reducer;
