import * as ActionTypes from "./ActionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const Orders = (state = initialState, action) => {
  switch (action.type) {
    
    case ActionTypes.POST_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [...state.data],
      };

    case ActionTypes.FETCH_ORDERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ActionTypes.FETCH_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };

    default:
      return state;
  }
};
