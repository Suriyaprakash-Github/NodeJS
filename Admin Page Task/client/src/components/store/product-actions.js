import { productActions } from "./product-slice";
import axios from "axios";

export const getAllProducts = () => {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:4000/product/getProduct")
      .then((result) => {
        dispatch(productActions.deleteAll());
        result.data.map((prod) =>
          dispatch(
            productActions.addProduct({
              id: prod.id,
              name: prod.name,
              price: prod.price,
            })
          )
        );
      })
      .catch((err) => console.log("err getting all prods", err));
  };
};
