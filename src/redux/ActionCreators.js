import * as ActionTypes from "./ActionTypes";

export const addItem = (item, user) => (dispatch) => {
  console.log(item);
  console.log(user);
  dispatch({
    type: ActionTypes.ADD_ITEM,
    payload: item,
  });

  if (user) {
    item = {...item, user: user};
    console.log(item);
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
  }
};

export const updateItem = (item, user) => (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_ITEM,
    payload: item,
  });
  if (user) {
    item = {...item, user: user};
    return fetch(`/cart/${user}/${item.itemId}`, {
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
  }
};

export const deleteItem = (itemId, user) => (dispatch) => {
  dispatch({
    type: ActionTypes.DELETE_ITEM,
    payload: itemId,
  });
  if (user) {
    return fetch(`/cart/${user}/${itemId}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

export const fetchOrders = (user) => (dispatch) => {
  dispatch(fetchOrdersBegin());
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
  type: ActionTypes.FETCH_CART_BEGIN,
});

export const fetchCartSuccess = (cart) => ({
  type: ActionTypes.FETCH_CART_SUCCESS,
  payload: cart,
});

export const fetchCartError = (errMsg) => ({
  type: ActionTypes.FETCH_CART_ERROR,
  payload: errMsg,
});

export const fetchCartItems = (user) => (dispatch) => {
  if (user) {
    dispatch(fetchCartBegin());
    console.log("fetching cart items here");
    return fetch(`/cart/${user}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(fetchCartSuccess(data));
      console.log("cart items fetching: ", data);
      return data;
    })
    .catch((error) => {
      dispatch(fetchCartError(error.message));
      console.error("Error:", error);
    });
  }
};

export const fetchOrdersBegin = () => ({
  type: ActionTypes.FETCH_ORDERS_BEGIN,
});

export const fetchOrdersSuccess = (orders) => ({
  type: ActionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrdersError = (errMsg) => ({
  type: ActionTypes.FETCH_ORDERS_ERROR,
  payload: errMsg,
});

export const fetchItemsBegin = () => ({
  type: ActionTypes.FETCH_ITEMS_BEGIN,
});

export const fetchItemsSuccess = (items) => ({
  type: ActionTypes.FETCH_ITEMS_SUCCESS,
  payload: items,
});

export const fetchItemsError = (errMsg) => ({
  type: ActionTypes.FETCH_ITEMS_ERROR,
  payload: errMsg,
});

export const fetchItems = () => (dispatch) => {
  dispatch(fetchItemsBegin());
  return fetch('/items')
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

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload: creds.email,
  };
};

export const loginSuccess = (response) => {
  console.log("in login success:", response);
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
    user: response.user
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin(creds));

  return fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        console.log(response);
        if (response.ok) {
          return response;
        } else {
          throw new Error("Incorrect email or password");
        }
      }
    )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.email);
      dispatch(loginSuccess(response));
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(logoutSuccess());
};
