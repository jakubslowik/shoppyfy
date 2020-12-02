import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartsReducer from "../features/carts/cartsSlice";

export default configureStore({
  reducer: {
    carts: cartsReducer,
    products: productsReducer
  }
});