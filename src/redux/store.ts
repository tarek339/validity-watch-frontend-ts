import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { snackbarReducer } from "./slices/snackbarSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
