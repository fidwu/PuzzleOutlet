import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Cart } from './cart';
import { Inventory } from "./inventory";
import { Orders } from "./orders";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      cart: Cart,
      inventory: Inventory,
      orders: Orders
    }),
    applyMiddleware(thunk)
  );
  console.log(store);
  return store;
};