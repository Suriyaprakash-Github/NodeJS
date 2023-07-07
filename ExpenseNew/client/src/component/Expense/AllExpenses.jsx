import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllExpenses = () => {
  const [currentPage, setCurrentPage] = useState("0");
  const [allExpense, setAllExpense] = useState([]);
  const numberOfExpensesRef = useRef();
  const navigate = useNavigate();

  const allExpenseHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios
      .get(
        `http://localhost:4000/expense/allexpenses/?numberOfExpenses=${numberOfExpensesRef.current.value}&page=${currentPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((result) => {
        setAllExpense(result.data.result);
      })
      .catch((err) => console.log(err));
  };

  const getExpense = async (page) => {
    const token = localStorage.getItem("token");
    console.log(page);
    setCurrentPage(page);
    await axios
      .get(
        `http://localhost:4000/expense/allexpenses/?numberOfExpenses=${numberOfExpensesRef.current.value}&page=${currentPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((result) => {
        setAllExpense(result.data.result);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = async (id) => {
    await axios
      .post("http://localhost:4000/expense/delete", { id })
      .then((result) => {
        navigate("/expense");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={allExpenseHandler}>
        <label htmlFor="numberOfExpenses">Number of Expenses</label>
        <select
          name="numberOfExpenses"
          id="numberOfExpenses"
          ref={numberOfExpensesRef}
        >
          <option value="all">All</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <button>Show Expenses</button>
      </form>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
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
        </table>
      </div>
      <button onClick={() => getExpense(parseInt(currentPage) - 1)}>
        Previous Page
      </button>
      <button onClick={() => getExpense(parseInt(currentPage) + 1)}>
        Next Page
      </button>
    </>
  );
};

export default AllExpenses;
