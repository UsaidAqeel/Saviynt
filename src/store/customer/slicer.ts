// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { setItemInLocalStorage } from "../../utils/helper";

const customerSlicer = createSlice({
  name: "customers",
  initialState: {
    customers: localStorage.getItem("customers")
      ? JSON?.parse(localStorage.getItem("customers"))
      : [],
  },
  reducers: {
    setCustomerList(state, action) {
      setItemInLocalStorage("customers", action?.payload);
      state.customers = action.payload;
    },
    createCustomer(state, action) {
      const lastIndex = state.customers?.length - 1;
      const id = Number(state.customers[lastIndex]?.id) + 1;
      setItemInLocalStorage("customers", [
        ...state.customers,
        { ...action.payload, id },
      ]);
      state.customers = [...state.customers, { ...action.payload, id }];
    },
    updateCustomer(state, action) {
      const customerIndex = state?.customers?.findIndex(
        (customer) => customer?.id == action.payload?.id
      );
      const customerList = [...state?.customers];
      customerList?.splice(customerIndex, 1, action.payload);
      setItemInLocalStorage("customers", customerList);
      state.customers = customerList;
    },
    deleteCustomer(state, action) {
      const customerIndex = state?.customers?.findIndex(
        (customer) => customer?.id == action.payload
      );
      const customerList = [...state?.customers];
      customerList?.splice(customerIndex, 1);
      setItemInLocalStorage("customers", customerList);
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
