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
      localStorage.setItem("customers", JSON.stringify(action.payload));
      state.customers = action.payload;
    },
    createCustomer(state, action) {
      const id = (state.customers?.length + 1).toString();
      localStorage.setItem(
        "customers",
        JSON.stringify([...state.customers, { ...action.payload, id }])
      );
      state.customers = [...state.customers, { ...action.payload, id }];
    },
    updateCustomer(state, action) {
      const customerIndex = state?.customers?.findIndex(
        (customer) => customer?.id == action.payload?.id
      );
      const customerList = [...state?.customers];
      customerList?.splice(customerIndex, 1, action.payload);
      localStorage.setItem("customers", JSON.stringify(customerList));
      state.customers = customerList;
    },
    deleteCustomer(state, action) {
      const customerIndex = state?.customers?.findIndex(
        (customer) => customer?.id == action.payload
      );
      const customerList = [...state?.customers];
      customerList?.splice(customerIndex, 1);
      localStorage.setItem("customers", JSON.stringify(customerList));
      state.customers = customerList;
    },
  },
});

export const {
  createCustomer,
  setCustomerList,
  updateCustomer,
  deleteCustomer,
} = customerSlicer.actions;
const { reducer } = customerSlicer;

export default reducer;
