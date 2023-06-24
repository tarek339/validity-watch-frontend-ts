import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { snackbarReducer } from "./slices/snackbarSlice";
import { driverReducer } from "./slices/driverSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
    driver: driverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
