import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  ceo: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  street: string;
  houseNumber: number;
  zipCode: number;
  city: string;
  communityLicence: string;
  emailVerified: boolean;
  emailVerificationToken: string;
  createdAt: string;
}

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
