import { productActions } from "./product-slice";
import axios from "axios";

export const getAllProducts = () => {
  return async (dispatch) => {
    return await axios
      .get("http://localhost:4000/product/getProduct")
      .then((result) => {
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

// export const deleteAll = () => {
//   return (dispatch) => {
//     dispatch(productActions.deleteAll());
//   };
// };

// export const deleteProduct = () => {
//   return async (dispatch) => {
//     return await axios
//       .get("http://localhost:4000/product/deleteProduct")
//       .then((result) => {
//         result.data.map((prod) =>
//           dispatch(
//             productActions.deleteProduct({
//               id: prod.id,
//               name: prod.name,
//               price: prod.price,
//             })
//           )
//         );
//       })
//       .catch((err) => console.log("err deleting prod", err));
//   };
// };
