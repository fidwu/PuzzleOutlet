import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";

const Cart = (props) => {

  console.log(props.cart);

  const cart = props.cart;

  return (
    <Container fluid>
      <h2 className="mb-3">
        Shopping Cart ({cart.length}{" "}
        {cart.length === 1 ? "item" : "items"})
      </h2>
      <div className="shoppingCart">
        <div className="cartItems">
          {cart.map((cartItems) => 
            <CartProduct
              key={cartItems.itemId}
              itemId={cartItems.itemId}
              item={cartItems.product}
              price={cartItems.price + ' ea.'}
              image={cartItems.image}
              quantity={cartItems.quantity}
            />
          )}
          {cart.length === 0 &&
            <div className="text-center">
              <h3>Your cart is empty.</h3>
              <p>Add an item or sign in to check your cart!</p>
            </div>
          }
        </div>
        <div className="placeOrder">
          <h3 className="mb-4">
            Subtotal ({cart.length}{" "}
            {cart.length === 1 ? "item" : "items"}): ${props.totalPrice.toFixed(2)}
          </h3>
          <Link to="/order">
            <Button disabled={cart.length === 0}>Place Order</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
