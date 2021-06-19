import { CartData } from "../data/Cart";
import * as ActionTypes from "./ActionTypes";

export const Cart = (state = CartData, action) => {
  switch (action.type) {

    case ActionTypes.ADD_ITEM:
      const item = action.payload;
      return state.concat(item);
    
    case ActionTypes.UPDATE_ITEM:
      let updatedState = state.map((item) => {
        console.log(action.payload);
        // if not same item id, keep original
        if (item.itemId !== action.payload.itemId) {
          return item;
        }
        // otherwise, update to new
        return {
          ...item,
          ...action.payload,
        };
      });
      updatedState = updatedState.filter((item) => item.quantity !== 0);
      console.log(updatedState);
      return updatedState;

    case ActionTypes.DELETE_ITEM:
      const filteredArray = state.filter((val) => { 
        return val.itemId !== action.payload.itemId
      });
      return filteredArray;

    default:
      return state;
  }
};
