import { createSlice } from "@reduxjs/toolkit";

interface Driver {
  _id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licenceNumber: string;
  licenceTyp: string;
  licenceTypExpire: string;
  codeNumber: string;
  codeNumberExpire: string;
  driverCardNumber: string;
  driverCardNumberExpire: string;
  createdAt: string;
}

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
    fetchDriver: (state, action) => {
      state.driver = action.payload;
    },
  },
});

export const driverReducer = driverSlice.reducer;
export const { fetchDriver } = driverSlice.actions;
