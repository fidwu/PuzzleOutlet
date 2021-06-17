import "./App.css";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PastOrders from "./pages/PastOrders";
import Header from "./components/Navbar";
import PlaceOrder from "./pages/PlaceOrder";
import { useDispatch, useSelector } from "react-redux";

function App() {

  // inventory - list of products being sold
  const inventory = useSelector((state) => state.inventory);

  // cart - info on products being added to cart
  const cart = useSelector((state) => {
    return state.cart.map((val, id) => (
      {
      ...val,
      ...inventory.find((item) => {
        return (item.itemId === val.itemId)
      })
    }));
  });

  // bought - info on products bought
  const bought = useSelector((state) => {
    return state.bought.map((val, id) => ({
      ...val,
      ...inventory[id],
    }));
  });

  // updatedItemAmtInventory - list of inventory items, and quantity added to cart
  const updatedItemAmtInventory = useSelector((state) => {
    return state.inventory.map((val, id) => ({
      ...val,
      ...cart.find((item) => {
        return (item.itemId === val.itemId)
      })
    }))
  });

  // console.log(updatedItemAmtInventory);
  // console.log(cart);
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

    // sort past orders/bought array data by date
    const sortByDate = bought
      .slice()
      .sort((a, b) => new Date(b.dateBought) - new Date(a.dateBought));

    // group items by date - type object
    // key: date bought, values: items
    const groupByDate = sortByDate.reduce((total, current) => {
      const date = new Date(current.dateBought);
      if (!total[date]) {
        total[date] = [];
      }
      total[date].push(current);
      return total;
    }, {});

    // past orders array sorted and grouped by date with total price and orders info
    const pastOrders = Object.keys(groupByDate).map((date) => {
      const totalPrice = groupByDate[date].reduce((total, current) => {
        return total + current.price.substring(1) * current.quantityBought;
      }, 0);
      return {
        date: date,
        total: totalPrice,
        orders: groupByDate[date],
      };
    }); 

    console.log(pastOrders);

    return <PastOrders pastOrders={pastOrders} />;
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
