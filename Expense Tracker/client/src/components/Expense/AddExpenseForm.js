import React, { useRef } from "react";
import axios from "axios";

const AddExpenseForm = () => {
  const enteredExpenseName = useRef();
  const enteredExpenseAmount = useRef();
  const enteredExpenseCategory = useRef();

  const addExpenseHandler = (e) => {
    e.preventDefault();
    console.log(
      "indside form",
      enteredExpenseName.current.value,
      enteredExpenseAmount.current.value,
      enteredExpenseCategory.current.value
    );

    axios
      .post("http://localhost:4000/expense/newExpense", {
        name: enteredExpenseName.current.value,
        amount: enteredExpenseAmount.current.value,
        category: enteredExpenseCategory.current.value,
      })
      .then()
      .catch((err) => console.log(err));

    enteredExpenseName.current.value = "";
    enteredExpenseAmount.current.value = "";
    enteredExpenseCategory.current.value = "";
  };
  return (
    <>
      <div>
        <h1>Add Expense</h1>
        <form action="" onSubmit={addExpenseHandler}>
          <div>
            <label htmlFor="expenseName">Expense: </label>
            <input
              type="text"
              id="expenseName"
              name="expenseName"
              required
              ref={enteredExpenseName}
            />
          </div>
          <div>
            <label htmlFor="expenseAmount">Amount: </label>
            <input
              type="number"
              id="expenseAmount"
              name="expenseAmount"
              required
              ref={enteredExpenseAmount}
            />
          </div>
          <div>
            <label htmlFor="expenseCategory">Expense Category: </label>
            <select
              id="expenseCategory"
              name="expenseCategory"
              required
              ref={enteredExpenseCategory}
            >
              <option value="">Choose an Expenditure</option>
              <option value="Housing Expenses">Housing Expenses</option>
              <option value="Travel Expenses">Travel Expenses</option>
              <option value="Food Expenses">Food Expenses</option>
              <option value="Personal Care Expenses">
                Personal Care Expenses
              </option>
              <option value="Entertainment Expenses">
                Entertainment Expenses
              </option>
              <option value="Health Care Expenses">Health Care Expenses</option>
              <option value="Clothing Expenses">Clothing Expenses</option>
              <option value="Education Expenses">Education Expenses</option>
              <option value="Debt Payments">Debt Payments</option>
              <option value="Savings">Savings</option>
            </select>
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </>
  );
};

export default AddExpenseForm;
