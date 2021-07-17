import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Quantity from './Quantity';
import { deleteItem } from "../redux/ActionCreators";

const CartProduct = (props) => {
  let location = useLocation();

  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.user);

  const deleteFromCart = (e) => {
    e.preventDefault();
    dispatch(deleteItem(props.itemId, userAuth.user.email));
  }

  const calculateTotal = (price, quantity) => {
    return (parseFloat(price) * quantity).toFixed(2);
  }

  return (
    <Card className="card">
      <Card.Img variant="top" src={props.image} />
      <Card.Body className="itemDetails">
        <Card.Title>{props.item}</Card.Title>
        <Card.Text>${props.price}</Card.Text>
        {location.pathname === "/order" || location.pathname === "/pastorders" ?
          <Card.Text>Quantity: {props.quantity}</Card.Text>
          : 
          <Quantity 
            quantity={props.quantity}
            itemId={props.itemId}
          />
      }
      </Card.Body>
      {location.pathname !== "/order" && (
        <Card.Body className="totalPrice">
          <Card.Subtitle>
            ${calculateTotal(props.price, props.quantity)}
          </Card.Subtitle>
        </Card.Body>
      )}
      {location.pathname !== "/order" && (
        <Card.Body>
          {location.pathname !== "/pastorders" ? (
            <Card.Link onClick={(e) => deleteFromCart(e)}>Delete</Card.Link>
          ) : (
            <Button>Write a review</Button>
          )}
        </Card.Body>
      )}
    </Card>
  );
};

export default CartProduct;
