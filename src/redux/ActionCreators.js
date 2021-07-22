import * as ActionTypes from "./ActionTypes";

export const addItem = (item, user) => (dispatch) => {
  dispatch({
    type: ActionTypes.ADD_ITEM,
    payload: item,
  });

  if (user) {
    item = {...item, user: user};
    return fetch("api/cart", {
      method: "post",
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

const getItemInfo = async (itemId) => {
  let response = await fetch(`api/items/${itemId}`);
  let itemInfo = await response.json();
  return itemInfo;
}

export const updateItem = (item, user) => async (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_ITEM,
    payload: item,
  });
  if (user) {
    let itemInfo = await getItemInfo(item.itemId);
    const { product, price, image } = itemInfo;
    item = {...item, user: user, product, price, image};
    return fetch(`api/cart/${user}/${item.itemId}`, {
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
      .then((data) => {
        return data;
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
    return fetch(`api/cart/${user}/${itemId}`, {
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
  dispatch(fetchCartBegin());
  return fetch(`api/cart/${user}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(fetchCartSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(fetchCartError(error.message));
      console.error("Error:", error);
    });
};

export const emptyCart = (user) => (dispatch) => {
  dispatch({
    type: ActionTypes.DELETE_ALL
  });
  return fetch(`api/cart/${user}`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.err);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    })
}

export const fetchOrders = (user) => (dispatch) => {
  dispatch(fetchOrdersBegin());
  return fetch(`api/orders/${user}`)
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

export const postOrdersError = (errMsg) => ({
  type: ActionTypes.POST_ORDERS_ERROR,
  payload: errMsg,
});

export const postOrders = (user, payload) => (dispatch) => {
  return fetch("api/orders", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.err);
      }
      return response.json();
    })
    .then((data) => {
      dispatch(fetchOrders(user));
    })
    .catch((error) => {
      console.error("Error:", error);
      dispatch(postOrdersError(error.message));
    })
};

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
  return fetch('api/items')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(fetchItemsSuccess(data));
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

  return fetch("api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error("Incorrect email or password");
        }
      }
    )
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify({ "name": response.user, "email": response.email}));
      dispatch(loginSuccess(response));
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestSignup = (creds) => {
  return {
    type: ActionTypes.SIGNUP_REQUEST,
    payload: creds.email,
  };
};

export const signupSuccess = (response) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    token: response.token,
    user: response.user
  };
};

export const signupError = (message) => {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    message,
  };
};

export const signupUser = (creds) => (dispatch) => {
  dispatch(requestSignup(creds));

  return fetch("api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.err) {
        throw new Error(response.err);
      }
      else {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify({ "name": response.user, "email": response.email}));
        dispatch(signupSuccess(response));
      }
    })
    .catch((error) => dispatch(signupError(error.message)));
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

export const getUser = (user) => {
  return {
    type: ActionTypes.GET_USER,
    user
  };
};