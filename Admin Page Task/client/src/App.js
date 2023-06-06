import React, { useEffect } from "react";
import Form from "./components/Form";
import AllProducts from "./components/AllProducts";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteAll } from "./components/store/product-actions";

function App() {
  const dispatch = useDispatch();
  let product = useSelector((state) => state.product.products);
  // console.log(product);
  const totalPrice = useSelector((state) => state.product.totalPrice);

  useEffect(() => {
    // dispatch(deleteAll());
    dispatch(getAllProducts());
  }, [dispatch]);
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
