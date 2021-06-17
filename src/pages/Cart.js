import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CartProduct from "../components/CartProduct";
// import { User } from "../data/User";
// import { Inventory } from "../data/Inventory";
import { Link } from "react-router-dom";
// import { useEffect } from "react";

const Cart = (props) => {
  console.log(props.cartItems);

  return (
    <Container fluid>
      <h2 className="mb-3">
        Shopping Cart ({props.cartItems.length}{" "}
        {props.cartItems.length === 1 ? "item" : "items"})
      </h2>
      <div className="shoppingCart">
        <div className="cartItems">
          {props.cartItems.map((cartItems, id) => 
            <CartProduct
              key={id}
              item={cartItems.product}
              price={cartItems.price + ' ea.'}
              image={cartItems.image}
              quantity={cartItems.quantity}
            />
          )}
        </div>
        <div className="placeOrder">
          <h3 className="mb-4">
            Subtotal ({props.cartItems.length}{" "}
            {props.cartItems.length === 1 ? "item" : "items"}): ${props.totalPrice}
          </h3>
          <Link to="/order">
            <Button>Place Order</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
