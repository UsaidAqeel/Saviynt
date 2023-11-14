import { configureStore } from "@reduxjs/toolkit";
import customerSlicer from "./customer/slicer";

const store = configureStore({
  reducer: {
    customer: customerSlicer,
  },
});
export default store;
