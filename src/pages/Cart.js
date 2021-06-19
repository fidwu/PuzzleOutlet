import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";

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
              itemId={cartItems.itemId}
              item={cartItems.product}
              price={cartItems.price + ' ea.'}
              image={cartItems.image}
              quantity={cartItems.quantity}
            />
          )}
          {props.cartItems.length === 0 &&
            <div className="text-center">
              <h3>Your cart is empty.</h3>
              <p>Add an item or sign in to check your cart!</p>
            </div>
          }
        </div>
        <div className="placeOrder">
          <h3 className="mb-4">
            Subtotal ({props.cartItems.length}{" "}
            {props.cartItems.length === 1 ? "item" : "items"}): ${props.totalPrice}
          </h3>
          <Link to="/order">
            <Button disabled={props.cartItems.length === 0}>Place Order</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
