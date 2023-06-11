import Login from "./component/Login/Login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExpenseForm from "./component/Expense/ExpenseForm";
import Expense from "./pages/Expense";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/addexpense" element={<ExpenseForm />} />
        <Route path="expense" element={<Expense />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
