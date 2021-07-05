import "./App.css";
import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PastOrders from "./pages/PastOrders";
import Header from "./components/Navbar";
import PlaceOrder from "./pages/PlaceOrder";
import { useSelector } from "react-redux";

function App() {

  // items - list of products being sold
  const items = useSelector((state) => state.items.data);
  console.log(items);

  const cart = useSelector((state) => state.cart.data);
  console.log("cart:", cart);

  const orders = useSelector((state) => state.orders.data);
  console.log(orders);

  const totalPrice = cart.reduce(
    (total, current) => total + current.price.substring(1) * current.quantity,
    0
  );

  return (
    <div className="App">
      <Router>
        <Header numCartItems={cart.length} />
        <Switch>
          <Route exact path="/" render={() => <Home inventory={items} />} />
          <Route exact path="/pastorders" render={() => <PastOrders pastOrders={orders} />} />
          <Route exact path="/cart" render={() => <Cart cart={cart} totalPrice={totalPrice} />} />
          <Route exact path="/order" render={() => <PlaceOrder cartItems={cart} totalPrice={totalPrice} />} />
          <Route path="/item/:id" component={Product} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
