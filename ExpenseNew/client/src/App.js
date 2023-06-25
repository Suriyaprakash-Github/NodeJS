import Login from "./component/Login/Login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExpenseForm from "./component/Expense/ExpenseForm";
import Expense from "./pages/Expense";
import Profile from "./pages/Profile";
import ResetPassword from "./component/Login/ResetPassword";

function App() {
  <Route path="/profile" element={<Profile />} />;

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/addexpense" element={<ExpenseForm />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password/resetpassword/:id" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
