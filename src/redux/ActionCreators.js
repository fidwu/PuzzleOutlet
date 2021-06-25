import * as ActionTypes from './ActionTypes';

export const addItem = (itemId, quantity) => ({
    type: ActionTypes.ADD_ITEM,
    payload: {
        itemId,
        quantity
    }
});

export const updateItem = (itemId, quantity) => ({
    type: ActionTypes.UPDATE_ITEM,
    payload: {
        itemId,
        quantity
    }
})

export const deleteItem = (itemId) => ({
    type: ActionTypes.DELETE_ITEM,
    payload: {
        itemId
    }
})

export const fetchOrders = () => (dispatch) => {
    dispatch(fetchOrdersBegin());
    const user = "tempUser";
    return fetch(`/orders/${user}`)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
            dispatch(fetchOrdersSuccess(data));
            return data;
        })
        .catch((error) => {
            dispatch(fetchOrdersError());
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

export const fetchOrdersError = () => ({
    type: ActionTypes.FETCH_ORDERS_ERROR
})
