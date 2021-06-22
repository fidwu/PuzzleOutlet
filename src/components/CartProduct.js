import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteItem } from '../redux/ActionCreators';
import Quantity from './Quantity';

const CartProduct = (props) => {
  let location = useLocation();

  const dispatch = useDispatch();

  const deleteFromCart = (e) => {
    e.preventDefault();
    console.log(props);
    dispatch(deleteItem(props.itemId));
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
          <Quantity 
            quantity={props.quantity}
            itemId={props.itemId}
          />
        //   <Form inline className="mb-2">
        //   <Form.Label>Quantity: &nbsp;</Form.Label>
        //   <InputGroup className="form-inline" size="sm">
        //     <InputGroup.Prepend>
        //       <Button
        //         variant="outline-secondary"
        //         value={"-"}
        //         onClick={(e) => quantityChanged(e, "-")}
        //       >
        //         <MdRemove />
        //       </Button>
        //     </InputGroup.Prepend>
        //     {/* <Form.Control size="sm" name="foo" value={props.quantity || props.quantityVal} onChange={e => props.handleQuantUpdate(e)} /> */}
        //     <InputGroup.Text>
        //       {props.quantity || 1}
        //     </InputGroup.Text>
        //     <InputGroup.Append>
        //       <Button
        //         variant="outline-secondary"
        //         value={"+"}
        //         onClick={(e) => quantityChanged(e, "+")}
        //       >
        //         <MdAdd />
        //       </Button>
        //     </InputGroup.Append>
        //   </InputGroup>
        // </Form>
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
