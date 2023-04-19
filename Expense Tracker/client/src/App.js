import React from "react";
import axios from "axios";
// import AddExpenseForm from "./components/Expense/AddExpenseForm";
import Sidebar from "./components/Layout/Sidebar";

function App() {
  const getExpense = async () => {
    await axios
      .get("http://localhost:4000/expense/getExpenses")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  getExpense();
  return (
    <>
      <div>
        <h1>Expense App</h1>
        {/* <AddExpenseForm /> */}
        <Sidebar />
      </div>
    </>
  );
}

export default App;
