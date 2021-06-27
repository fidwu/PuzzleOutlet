import * as ActionTypes from "./ActionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const Items = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ITEMS_BEGIN:
      console.log("fetch begin");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ActionTypes.FETCH_ITEMS_SUCCESS:
      console.log("fetching result : ", action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ActionTypes.FETCH_ITEMS_ERROR:
      console.log("fetch error");
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
