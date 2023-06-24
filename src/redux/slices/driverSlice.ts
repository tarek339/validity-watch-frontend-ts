import { createSlice } from "@reduxjs/toolkit";
import { Driver } from "../../types/driverTypes";

interface InitialState {
  driver: Driver | null;
}

const initialState: InitialState = {
  driver: null,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    addDriver: (state, action) => {
      state.driver = action.payload;
    },
    removeDriver: (state) => {
      state.driver = null;
    },
  },
});

export const driverReducer = driverSlice.reducer;
export const { addDriver, removeDriver } = driverSlice.actions;
