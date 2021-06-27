import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Cart } from './cart';
import { Inventory } from "./inventory";
import { Items } from "./items";
import { Orders } from "./orders";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      cart: Cart,
      inventory: Inventory,
      items: Items, 
      orders: Orders
    }),
    applyMiddleware(thunk)
  );
  console.log(store);
  return store;
};