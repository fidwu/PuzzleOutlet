import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { Cart } from './cart';
import { Items } from "./items";
import { Orders } from "./orders";
import { Auth } from "./auth";

export const ConfigureStore = () => {
  const store = configureStore({
    reducer: {
      cart: Cart,
      items: Items, 
      orders: Orders,
      user: Auth
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  });
  return store;
};