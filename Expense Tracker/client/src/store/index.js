import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expense-slice";

const store = configureStore({
  reducer: { expense: expenseSlice.reducer },
});

export default store;
