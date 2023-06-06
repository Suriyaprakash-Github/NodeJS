import React, { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productActions } from "./store/product-slice";

const Form = () => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const priceRef = useRef();

  const addProductHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/product/newProduct", {
        name: nameRef.current.value,
        price: priceRef.current.value,
      })
      .then((res) => {
        dispatch(
          productActions.addProduct({
            id: res.data.product.id,
            name: res.data.product.name,
            price: res.data.product.price,
          })
        );
      })
      .catch((err) => console.log(err));

    nameRef.current.value = "";
    priceRef.current.value = "";
  };
  return (
    <>
      <div className="formContainer">
        <form action="" onSubmit={addProductHandler}>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" required ref={nameRef} />

          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            ref={priceRef}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
};

export default Form;
