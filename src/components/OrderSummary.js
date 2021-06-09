import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartProduct from "../components/CartProduct";
import { User } from "../data/User";
import { Inventory } from "../data/Inventory";

const OrderSummary = () => {
  //temporary user authentification
  const user = User.filter(
    (user) => user.username === "username" && user.password === "password"
  )[0];

  // get id's of items in the user's cart
  const itemsInCart = user.cartItemsId;
  const getCartItemsId = itemsInCart.map((item) => item.itemId);
  //console.log(getCartItemsId);

  // use item id's and match to inventory id to get product details
  const cartItems = Inventory.filter((inventory) =>
    getCartItemsId.includes(inventory.itemId)
  );
  //console.log(cartItems);

  // combine item and quantity in cart information into one array
  const cartItemDetails = itemsInCart.map((val, id) => ({
    ...val,
    ...cartItems[id],
  }));

  // use reduce to get the total amount
  const totalPrice = cartItemDetails.reduce(
    (total, current) => total + current.price.substring(1) * current.quantity,
    0
  );

  return (
    <>
      <h4 className="mb-3">
        Order Summary ({cartItemDetails.length}{" "}
        {cartItemDetails.length === 1 ? "item" : "items"})
      </h4>
      <ListGroup>
        {cartItemDetails.map((cartItems, id) => (
          <ListGroup.Item key={id}>
            <CartProduct
              key={id}
              item={cartItems.product}
              price={`$${
                parseInt(cartItems.price.substring(1)) * cartItems.quantity
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
          <Col className="d-flex justify-content-end">${totalPrice}</Col>
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
            <b>${totalPrice}</b>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderSummary;
