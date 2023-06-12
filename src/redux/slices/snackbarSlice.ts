import { createSlice } from "@reduxjs/toolkit";

interface Snackbar {
  open: boolean;
  severity: undefined | "error" | "warning" | "info" | "success";
  message: string;
}

const initialState: Snackbar = {
  open: false,
  severity: "success",
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = action.payload.open;
    },
    removeSnackbar: (state, action) => {
      state.open = false;
      state.message = "";
      state.severity = "success";
    },
  },
});

export const snackbarReducer = snackbarSlice.reducer;
export const { setSnackbar, removeSnackbar } = snackbarSlice.actions;
