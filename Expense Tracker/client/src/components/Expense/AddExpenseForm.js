import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import axios from "axios";
import Modal from "../UI/Modal";
import classes from "./../../styles/AddExpenseForm.module.css";
import deleteBtn from "./../../assets/delete.svg";
import moneyIcon from "./../../assets/rupee.svg";

const AddExpenseForm = (props) => {
  const dispatch = useDispatch();
  const enteredExpenseName = useRef();
  const enteredExpenseAmount = useRef();
  const enteredExpenseCategory = useRef();

  const addExpenseHandler = (e) => {
    e.preventDefault();
    // sending to sql
    axios
      .post("http://localhost:4000/expense/newExpense", {
        name: enteredExpenseName.current.value,
        amount: enteredExpenseAmount.current.value,
        category: enteredExpenseCategory.current.value,
      })
      .then((res) => {
        //  sending to redux state
        dispatch(
          expenseActions.addExpense({
            id: res.data.expense.id,
            name: res.data.expense.name,
            amount: res.data.expense.amount,
            category: res.data.expense.category,
            createdAt: res.data.expense.createdAt,
            updatedAt: res.data.expense.updatedAt,
          })
        );
      })
      .catch((err) => console.log(err));
    // resetting addExpense form
    enteredExpenseName.current.value = "";
    enteredExpenseAmount.current.value = "";
    enteredExpenseCategory.current.value = "";
  };
  return (
    <Modal onClose={props.onClose}>
      <div>
        <div className={classes.formHeader}>
          <h1>Add Expense</h1>
          <button type="button" onClick={props.onClose}>
            <img className="icon" src={deleteBtn} alt="" />
          </button>
        </div>
        <hr />

        <form
          className={classes.formContainer}
          action=""
          onSubmit={addExpenseHandler}
        >
          <div className={classes.formControl}>
            <label className={classes.formLabel} htmlFor="expenseName">
              Expense:
            </label>
            <input
              className={classes.formInput}
              type="text"
              id="expenseName"
              name="expenseName"
              required
              ref={enteredExpenseName}
            />
          </div>
          <div className={classes.formControl}>
            <label className={classes.formLabel} htmlFor="expenseAmount">
              Amount:
            </label>

            <input
              className={classes.formInput}
              type="number"
              id="expenseAmount"
              name="expenseAmount"
              required
              ref={enteredExpenseAmount}
            />
          </div>
          <div className={classes.formControl}>
            <label className={classes.formLabel} htmlFor="expenseCategory">
              Expense Category:
            </label>
            <select
              className={classes.formInput}
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
          <div className={classes.formButtons}>
            <button type="button" onClick={props.onClose}>
              Cancel
            </button>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddExpenseForm;
