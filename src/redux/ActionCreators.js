import * as ActionTypes from './ActionTypes';

export const addItem = (item) => dispatch => {
    console.log(item);
    dispatch({
        type: ActionTypes.ADD_ITEM,
        payload: item
    })
    return fetch(`/cart`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
};

export const updateItem = (item) => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_ITEM,
        payload: item
    })
    return fetch(`/cart/tempUser/${item.itemId}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
};

export const deleteItem = (itemId) => dispatch => {
    dispatch({
        type: ActionTypes.DELETE_ITEM,
        payload: itemId
    })
    return fetch(`/cart/tempUser/${itemId}`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
}

export const fetchOrders = () => (dispatch) => {
    dispatch(fetchOrdersBegin());
    const user = "tempUser";
    return fetch(`/orders/${user}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            dispatch(fetchOrdersSuccess(data));
            return data;
        })
        .catch((error) => {
            dispatch(fetchOrdersError(error.message));
            console.error("Error:", error);
        });
};

export const fetchCartBegin = () => ({
    type: ActionTypes.FETCH_CART_BEGIN
})

export const fetchCartSuccess = (cart) => ({
    type: ActionTypes.FETCH_CART_SUCCESS,
    payload: cart
});

export const fetchCartError = (errMsg) => ({
    type: ActionTypes.FETCH_CART_ERROR,
    payload: errMsg
})

export const fetchCartItems = () => (dispatch) => {
    dispatch(fetchCartBegin());
    console.log("fetching cart items here");
    return fetch(`/cart/tempUser`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            dispatch(fetchCartSuccess(data));
            console.log("cart items fetching: ", data);
            // dispatch(fetchItemsSuccess(data));
            return data;
        })
        .catch((error) => {
            dispatch(fetchCartError(error.message));
            // dispatch(fetchItemsError());
            console.error("Error:", error);
        });
};

export const fetchOrdersBegin = () => ({
    type: ActionTypes.FETCH_ORDERS_BEGIN
})

export const fetchOrdersSuccess = (orders) => ({
    type: ActionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders
});

export const fetchOrdersError = (errMsg) => ({
    type: ActionTypes.FETCH_ORDERS_ERROR,
    payload: errMsg
})

export const fetchItemsBegin = () => ({
    type: ActionTypes.FETCH_ITEMS_BEGIN
})

export const fetchItemsSuccess = (items) => ({
    type: ActionTypes.FETCH_ITEMS_SUCCESS,
    payload: items
});

export const fetchItemsError = (errMsg) => ({
    type: ActionTypes.FETCH_ITEMS_ERROR,
    payload: errMsg
})


export const fetchItems = () => (dispatch) => {
    dispatch(fetchItemsBegin());
    return fetch(`/items`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            dispatch(fetchItemsSuccess(data));
            console.log("items fetching next: ", data);
            return data;
        })
        .catch((error) => {
            dispatch(fetchItemsError(error.message));
            console.error("Error:", error);
        });
};