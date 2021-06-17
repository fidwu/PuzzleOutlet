import { createStore, combineReducers } from "redux";
import { Cart } from './cart';
import { Inventory } from "./inventory";
import { Bought } from "./bought";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      cart: Cart,
      inventory: Inventory,
      bought: Bought
    })
  );
  console.log(store);
  return store;
};