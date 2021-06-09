import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import ReactStars from "react-rating-stars-component";
// import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const CartProduct = (props) => {
  let location = useLocation();

  return (
    <Card className="card">
      <Card.Img variant="top" src={props.image} />
      <Card.Body className="itemDetails">
        <Card.Title>{props.item}</Card.Title>
        <Card.Text>{props.price}</Card.Text>
        {location.pathname === "/order" ?
          <Card.Text>Quantity: {props.quantity}</Card.Text>
          : 
        <Form inline>
          <Form.Label>Quantity: &nbsp;</Form.Label>
            <Form.Control
              as="select"
              className="mr-4"
              defaultValue={props.quantity}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
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
            <Card.Link>Delete</Card.Link>
          ) : (
            <Button>Write a review</Button>
          )}
        </Card.Body>
      )}
    </Card>
  );
};

export default CartProduct;
