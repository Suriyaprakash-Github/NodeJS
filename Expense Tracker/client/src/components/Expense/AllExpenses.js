import React from "react";
import { useSelector } from "react-redux";

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  console.log("from allExpenses", expenses);
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllExpenses;
