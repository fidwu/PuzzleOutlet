import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartProduct from "../components/CartProduct";

const OrderSummary = (props) => {

  return (
    <>
      <h4 className="mb-3">
        Order Summary ({props.items.length}{" "}
        {props.items.length === 1 ? "item" : "items"})
      </h4>
      <ListGroup>
        {props.items.map((cartItems, id) => (
          <ListGroup.Item key={id}>
            <CartProduct
              key={id}
              item={cartItems.product}
              price={`${
                (parseFloat(cartItems.price) * cartItems.quantity).toFixed(2)
              }`}
              image={cartItems.image}
              quantity={cartItems.quantity}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="total">
        <Row>
          <Col>Subtotal:</Col>
          <Col className="d-flex justify-content-end">${props.totalPrice.toFixed(2)}</Col>
        </Row>
        <Row>
          <Col>Shipping:</Col>
          <Col className="d-flex justify-content-end">$0.00</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <b>Total:</b>
          </Col>
          <Col className="d-flex justify-content-end">
            <b>${props.totalPrice.toFixed(2)}</b>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderSummary;
