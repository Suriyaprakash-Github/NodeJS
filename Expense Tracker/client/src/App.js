import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";

import Overview from "./pages/Overview";

function App() {
  // const getExpense = async () => {
  //   await axios
  //     .get("http://localhost:4000/expense/getExpenses")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // };
  // getExpense();
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
