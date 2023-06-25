import { createSlice } from "@reduxjs/toolkit";
import { Truck } from "../../types/truckTypes";

interface InitialState {
  truck: Truck | null;
}

const initialState: InitialState = {
  truck: null,
};

const truckSlice = createSlice({
  name: "truck",
  initialState,
  reducers: {
    addTruck: (state, action) => {
      state.truck = action.payload;
    },
    removeTruck: (state) => {
      state.truck = null;
    },
  },
});

export const truckReducer = truckSlice.reducer;
export const { addTruck, removeTruck } = truckSlice.actions;
