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
      const toRemove = state.products.findIndex(
        (prod) => prod.id === action.payload.id
      );
      state.products.splice(toRemove, 1);
      state.totalPrice = state.totalPrice - Number(action.payload.price);
    },
    deleteAll(state, action) {
      console.log("inside slice delete");
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
