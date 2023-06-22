import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/companyTypes";

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
