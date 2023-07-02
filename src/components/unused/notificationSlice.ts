import { createSlice } from "@reduxjs/toolkit";

interface Notification {
  messageDrivers: string;
  messageTrucks: string;
  messageTrailers: string;
}

const initialState: Notification = {
  messageDrivers: "Check drivers",
  messageTrucks: "Check trucks",
  messageTrailers: "Check Trailers",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.messageDrivers = action.payload.messageDrivers;
      state.messageTrucks = action.payload.messageTrucks;
      state.messageTrailers = action.payload.messageTrailers;
    },
    removeNotification: (state, action) => {
      state.messageDrivers = "";
      state.messageTrucks = "";
      state.messageTrailers = "";
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { setNotification, removeNotification } =
  notificationSlice.actions;
