// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const customerSlicer = createSlice({
  name: "customers",
  initialState: {
    customers: localStorage.getItem("customers")
      ? JSON?.parse(localStorage.getItem("customers"))
      : [],
  },
  reducers: {
    setCustomerList(state, action) {
      state.customers = action.payload;
    },
    createCustomer(state, action) {
      state.customers = [action.payload, ...state.customers];
    },
  },
});

export const {
  createCustomer,
  setCustomerList,
} = customerSlicer.actions;
const { reducer } = customerSlicer;

export default reducer;
