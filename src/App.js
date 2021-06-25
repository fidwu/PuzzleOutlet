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
import { fetchOrders } from './redux/ActionCreators';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("time to fetch orders");
    dispatch(fetchOrders());
  }, [dispatch])

  // inventory - list of products being sold
  const inventory = useSelector((state) => state.inventory);

  // cart - info on products being added to cart
  const cart = useSelector((state) => {
    return state.cart.map((val, id) => {
      console.log(val);
      return {
      ...val,
      ...inventory.find((item) => {
        return (item.itemId === val.itemId)
      })
    }});
  });

  const orders = useSelector((state) => state.orders.data);

  console.log(orders);

  // updatedItemAmtInventory - list of inventory items, and quantity added to cart
  const updatedItemAmtInventory = useSelector((state) => {
    return state.inventory.map((val, id) => ({
      ...val,
      ...cart.find((item) => {
        return (item.itemId === val.itemId)
      })
    }))
  });

  console.log(updatedItemAmtInventory);
  // console.log(bought);

  const CartComponent = () => {

    // use reduce to get the total amount
    const totalPrice = cart.reduce(
      (total, current) => total + current.price.substring(1) * current.quantity,
      0
    );

    return <Cart cartItems={cart} totalPrice={totalPrice} />;
  };

  const pastOrdersComponent = () => {
    console.log(orders);
    return <PastOrders pastOrders={orders} />;
  };

  const PlaceOrderComponent = () => {

    // use reduce to get the total amount
    const totalPrice = cart.reduce(
      (total, current) => total + current.price.substring(1) * current.quantity,
      0
    );

    return <PlaceOrder cartItems={cart} totalPrice={totalPrice} />;
  };

  return (
    <div className="App">
      <Router>
        <Header numCartItems={cart.length} />
        <Switch>
          <Route exact path="/" render={() => <Home inventory={inventory} />} />
          <Route exact path="/pastorders" component={pastOrdersComponent} />
          <Route exact path="/cart" component={CartComponent} />
          <Route exact path="/order" component={PlaceOrderComponent} />
          <Route
            path="/:id"
            render={() => <Product inventory={updatedItemAmtInventory} cart={cart} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
