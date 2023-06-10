import React from "react";
import Form from "./components/Form";
import AllProducts from "./components/AllProducts";
import { useSelector } from "react-redux";

function App() {
  const totalPrice = useSelector((state) => state.product.totalPrice);

  return (
    <>
      <div>
        <h1>Admin Product Task</h1>
        <Form />
        <AllProducts />
        Total Price:{totalPrice}
      </div>
    </>
  );
}

export default App;
