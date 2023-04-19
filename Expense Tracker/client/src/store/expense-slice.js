import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    totalExpense: 0,
  },
  reducers: {
    addExpense(state, action) {
      const expense = action.payload;
      state.expenses.push({
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
      });
    },
    editExpense() {},
    deleteExpense() {},
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
