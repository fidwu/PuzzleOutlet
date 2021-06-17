import { CartData } from "../data/Cart";
import * as ActionTypes from "./ActionTypes";

export const Cart = (state = CartData, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      console.log(action);
      const item = action.payload;
      console.log(state.concat(item));
      return state.concat(item);
    case ActionTypes.UPDATE_ITEM:
      const updatedState = state.map((item) => {
        // if not same item id, keep original
        if (item.itemId !== action.payload.itemId) {
          // This isn't the item we care about - keep it as-is
          return item;
        }
        // otherwise, update to new
        return {
          ...item,
          ...action.payload,
        };
      });
      console.log(updatedState);
      return updatedState;
    default:
      return state;
  }
};
