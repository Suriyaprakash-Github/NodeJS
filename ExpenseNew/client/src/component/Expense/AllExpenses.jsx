import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllExpenses = () => {
  const [allExpense, setAllExpense] = useState([]);
  const navigate = useNavigate();

  const allExpenseHandler = async (e) => {
    const token = localStorage.getItem("token");

    await axios
      .get("http://localhost:4000/expense/allexpenses", {
        headers: { Authorization: token },
      })
      .then((result) => setAllExpense(result.data))
      .catch((err) => console.log(err));
  };

  const deleteHandler = async (id) => {
    // console.log(id);
    await axios
      .post("http://localhost:4000/expense/delete", { id })
      .then((result) => {
        navigate("/expense");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button onClick={allExpenseHandler}>All Expenses</button>

      <table>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>

      {allExpense.map((expense) => (
        <tbody key={expense.id}>
          <tr>
            <td>{expense.expense}</td>
            <td>{expense.category}</td>
            <td>{expense.cost}</td>
            <td>
              <button onClick={deleteHandler.bind(null, expense.id)}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
};

export default AllExpenses;
