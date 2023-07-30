import React, { useRef } from "react";
import classes from "../../styles/ExpenseForm.module.css";
import axios from "axios";

const ExpenseForm = () => {
  const expenseRef = useRef();
  const catergoryRef = useRef();
  const costRef = useRef();

  const expenseFormSubmitHandler = async (e) => {
    e.preventDefault();
    const expense = expenseRef.current.value;
    const category = catergoryRef.current.value;
    const cost = costRef.current.value;

    const token = localStorage.getItem("token");
    // const expenseDetail = {
    //   expense: expenseRef.current.value,
    //   category: catergoryRef.current.value,
    //   cost: costRef.current.value,
    // };
    await axios
      .post("http://localhost:4000/expense/addexpense", {
        headers: { Authorization: token },
        expense,
        category,
        cost,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h2>Add Expense</h2>

      <form
        action=""
        onSubmit={expenseFormSubmitHandler}
        className={classes.ExpenseForm}
      >
        <div className={classes.formControl}>
          <label htmlFor="expense">Expense</label>
          <input
            type="text"
            id="expense"
            name="expense"
            ref={expenseRef}
            required
          />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="category">Expense Category</label>
          <select name="category" id="category" ref={catergoryRef} required>
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

        <div className={classes.formControl}>
          <label htmlFor="cost">Cost</label>
          <input type="number" id="cost" name="cost" ref={costRef} required />
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </>
  );
};

export default ExpenseForm;
