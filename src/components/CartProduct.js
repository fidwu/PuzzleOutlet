import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from '../redux/ActionCreators';
import InputGroup from "react-bootstrap/InputGroup";
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";

const CartProduct = (props) => {
  let location = useLocation();

  // const [quantityVal, setQuantityVal] = useState(1);
  const dispatch = useDispatch();

  const deleteFromCart = (e) => {
    e.preventDefault();
    console.log(props);
    dispatch(deleteItem(props.itemId));
  }

  const [quantity, setQuantity] = useState(props.quantity || 1);

  const quantityChanged = (e, type) => {
    e.preventDefault();
    let updatedQuantity = quantity;
    if (type === "+") {
      updatedQuantity = quantity + 1;
    }
    else {
      updatedQuantity = quantity - 1;
    }
    setQuantity(updatedQuantity);
    dispatch(updateItem(props.itemId, parseInt(updatedQuantity)));
  }

  return (
    <Card className="card">
      <Card.Img variant="top" src={props.image} />
      <Card.Body className="itemDetails">
        <Card.Title>{props.item}</Card.Title>
        <Card.Text>{props.price}</Card.Text>
        {location.pathname === "/order" || location.pathname === "/pastorders" ?
          <Card.Text>Quantity: {props.quantity}</Card.Text>
          : 
          <Form inline className="mb-2">
          <Form.Label>Quantity: &nbsp;</Form.Label>
          <InputGroup className="form-inline" size="sm">
            <InputGroup.Prepend>
              <Button
                variant="outline-secondary"
                value={"-"}
                onClick={(e) => quantityChanged(e, "-")}
              >
                <MdRemove />
              </Button>
            </InputGroup.Prepend>
            {/* <Form.Control size="sm" name="foo" value={props.quantity || props.quantityVal} onChange={e => props.handleQuantUpdate(e)} /> */}
            <InputGroup.Text>
              {props.quantity || 1}
            </InputGroup.Text>
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                value={"+"}
                onClick={(e) => quantityChanged(e, "+")}
              >
                <MdAdd />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      }
      </Card.Body>
      {location.pathname !== "/order" && (
        <Card.Body className="totalPrice">
          <Card.Subtitle>
            ${parseInt(props.price.substring(1)) * props.quantity}
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
