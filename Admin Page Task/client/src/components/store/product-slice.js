import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      state.products.push({
        id: product.id,
        name: product.name,
        price: product.price,
      });
      state.totalPrice = state.totalPrice + Number(action.payload.price);
    },
    deleteProduct(state, action) {
      // let allProd;
      const toRemove = state.products.findIndex(
        (prod) => prod.id === action.payload.id
      );
      state.products.splice(toRemove, 1);
      // allProd = [...state.products];
      state.totalPrice = state.totalPrice - Number(action.payload.price);
    },
    // deleteAll(state, action) {
    //   state.products = [];
    // },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
