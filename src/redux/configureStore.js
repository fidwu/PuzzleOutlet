import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { Cart } from './cart';
import { Items } from "./items";
import { Orders } from "./orders";

export const ConfigureStore = () => {
  const store = configureStore({
    reducer: {
      cart: Cart,
      items: Items, 
      orders: Orders
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  });
  return store;
};