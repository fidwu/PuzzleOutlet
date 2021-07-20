import "./App.css";
import "./App.scss";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PastOrders from "./pages/PastOrders";
import Header from "./components/Navbar";
import PlaceOrder from "./pages/PlaceOrder";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { fetchCartItems, fetchOrders } from "./redux/ActionCreators";
import PrivateRoute from "./pages/PrivateRoute";

function App() {

  const dispatch = useDispatch();

  // items - list of products being sold
  const items = useSelector((state) => state.items.data);

  const cart = useSelector((state) => state.cart.data);

  const totalPrice = cart?.reduce(
    (total, current) => total + current.price * current.quantity,
    0
  );

  const userAuth = useSelector((state) => state.user);

  useEffect(() => {

    if (userAuth.authenticated) {
      dispatch(fetchCartItems(userAuth.user.email));
      dispatch(fetchOrders(userAuth.user.email));
    }

  }, [dispatch, userAuth])

  return (
    <div className="App">
      <Router>
        <Header numCartItems={cart ? cart.length : 0} />
        <Switch>
          <PrivateRoute path="/pastorders" component={PastOrders} />
          <Route path="/cart" render={() => <Cart cart={cart} totalPrice={totalPrice} />} />
          <PrivateRoute path="/order" component={PlaceOrder} />
          <Route path="/item/:id" component={Product} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" render={() => <Home inventory={items} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
