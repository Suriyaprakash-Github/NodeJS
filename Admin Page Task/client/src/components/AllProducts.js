import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { productActions } from "../components/store/product-slice";
import { useDispatch } from "react-redux";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log("all Products", products);
  const deleteHandler = (e) => {
    // console.log(e.id);
    axios
      .post("http://localhost:4000/product/deleteProduct", {
        id: e.id,
      })
      .then((res) => {
        dispatch(
          productActions.deleteProduct({
            id: e.id,
            name: e.name,
            price: e.price,
          })
        );
      });
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={deleteHandler.bind(null, product)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProducts;
