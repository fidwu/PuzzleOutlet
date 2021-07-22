import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CartProduct from '../components/CartProduct';
import { useSelector } from "react-redux";

const PastOrders = () => {

  const orders = useSelector((state) => state.orders.data);

  const formatDate = (inputDate) => {
    return new Date(inputDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container fluid className="pastOrdersContainer">
      <h2>Past Orders</h2>
        {orders.length === 0 &&
          <div className="text-center">
            <p>No past orders to display</p>
          </div>
        }
      <div className="pastOrders">
        <div className="items">
          {orders.map((orders, id) => {
            return (
              <div key={id} className="mb-3">
                <Card.Header as="h5" className="d-flex">
                  <div>Placed {formatDate(orders.date)}</div>
                  <div className="ml-auto orderTotalPrice">${orders.orderTotal}</div>
                </Card.Header>
                <ListGroup>
                {orders.order.map((item, id) => {
                  return (
                    <ListGroup.Item key={id}>
                      <CartProduct
                        key={id}
                        item={item.product}
                        price={item.price + " ea."}
                        image={item.image}
                        quantity={item.quantity}
                      />
                    </ListGroup.Item>
                  );
                })}
                </ListGroup>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default PastOrders;
