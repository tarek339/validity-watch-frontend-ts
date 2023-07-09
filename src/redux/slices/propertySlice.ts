import { createSlice } from "@reduxjs/toolkit";
import { Property } from "../../types/propertyTypes";

const initialState: Property = {
  drivers: [],
  trucks: [],
  trailers: [],
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setDrivers: (state, action) => {
      state.drivers = action.payload;
    },
    setTrucks: (state, action) => {
      state.trucks = action.payload;
    },
    setTrailers: (state, action) => {
      state.trailers = action.payload;
    },
    removeProperty: (state) => {
      state.drivers = [];
      state.trucks = [];
      state.trailers = [];
    },
  },
});

export const propertyReducer = propertySlice.reducer;
export const { setDrivers, setTrucks, setTrailers, removeProperty } =
  propertySlice.actions;
