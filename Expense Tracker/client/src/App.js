import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import { useSelector } from "react-redux";
import Overview from "./pages/Overview";
// import AddExpenseForm from "./components/Expense/AddExpenseForm";
import { getAllExpenses } from "./store/expense-actions";

function App() {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expenses);
  console.log("state of expenses from app.js", expense);

  // to get expenses for first time by redux-thunk
  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
        {/* <AddExpenseForm /> */}
      </div>
    </>
  );
}

export default App;
