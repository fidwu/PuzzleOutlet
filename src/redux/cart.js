import * as ActionTypes from "./ActionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const Cart = (state = initialState, action) => {

  switch (action.type) {

    case ActionTypes.ADD_ITEM:
      const item = action.payload;
      return {
        ...state,
        data: [...state.data, item],
      }
    
    case ActionTypes.UPDATE_ITEM:
      let updatedState = state.data.map(item => {
        if(item.itemId === action.payload.itemId)
           return {
             ...item,
             quantity: action.payload.quantity
           }
        return item
      });
      return {
        ...state,
        data: updatedState
      };

    case ActionTypes.DELETE_ITEM:
      const filteredArray = state.data.filter((val) => { 
        return val.itemId !== action.payload
      });
      return {
        ...state,
        data: filteredArray
      };

    case ActionTypes.DELETE_ALL:
      return {
        ...state,
        data: []
      }

    case ActionTypes.FETCH_CART_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        data: [...state.data]
      };
  
    case ActionTypes.FETCH_CART_SUCCESS:
      // merge fetched cart data with existing cart
      const combinedCart = [...state.data, ...action.payload];
      const itemIdSet = new Set();
      let result = combinedCart.filter((item) => {
        const duplicate = itemIdSet.has(item.itemId);
        itemIdSet.add(item.itemId);
        return !duplicate;
      })
      return {
        ...state,
        loading: false,
        data: result,
      };
  
    case ActionTypes.FETCH_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [...state.data],
      };

    default:
      return state;
  }
};
