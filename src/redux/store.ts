import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { snackbarReducer } from "./slices/snackbarSlice";
import { driverReducer } from "./slices/driverSlice";
import { truckReducer } from "./slices/truckSlice";
import { trailerReducer } from "./slices/trailerSlice";
import { propertyReducer } from "./slices/propertySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
    driver: driverReducer,
    truck: truckReducer,
    trailer: trailerReducer,
    property: propertyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
