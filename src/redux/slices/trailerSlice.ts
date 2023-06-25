import { createSlice } from "@reduxjs/toolkit";
import { Trailer } from "../../types/trailerTypes";

interface InitialState {
  trailer: Trailer | null;
}

const initialState: InitialState = {
  trailer: null,
};

const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  reducers: {
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    removeTrailer: (state) => {
      state.trailer = null;
    },
  },
});

export const trailerReducer = trailerSlice.reducer;
export const { addTrailer, removeTrailer } = trailerSlice.actions;
