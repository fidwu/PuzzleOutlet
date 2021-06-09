import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CartProduct from '../components/CartProduct';
import { User } from '../data/User';
import { Inventory } from '../data/Inventory';

const PastOrders = () => {
  //temporary user authentification
  const user = User.filter(
    (user) => user.username === 'username' && user.password === 'password'
  )[0];

  // get id's of items user bought
  const itemsUserBought = user.boughtItems;
  const getBoughtItemsId = itemsUserBought.map((item) => item.itemId);
  //console.log(getCartItemsId);

  // use item id's and match to inventory id to get product details
  const boughtItems = Inventory.filter((inventory) =>
    getBoughtItemsId.includes(inventory.itemId)
  );
  console.log(boughtItems);

  // combine item info with date and quantity bought info into one array
  const boughtItemDetails = itemsUserBought.map((val, id) => ({
    ...val,
    ...boughtItems[id],
  }));
  console.log("item details combined: ", boughtItemDetails);

  const sortByDate = boughtItemDetails
    .slice()
    .sort((a, b) => new Date(b.dateBought) - new Date(a.dateBought));
  console.log(sortByDate);

  // group items by date - type object
  // key: date bought, values: items
  const groupByDate = sortByDate.reduce((total, current) => {
    const date = new Date(current.dateBought);
    if (!total[date]) {
      total[date] = [];
    }
    total[date].push(current);
    return total;
  }, {});

  //console.log(groupByDate);

  // past orders array sorted and grouped by date with total price and orders info
  const pastOrders = Object.keys(groupByDate).map((date) => {
    const totalPrice = groupByDate[date].reduce((total, current) => {
      return total + current.price.substring(1) * current.quantityBought;
    }, 0);
    return {
      date: date,
      total: totalPrice,
      orders: groupByDate[date],
    };
  });

  console.log(pastOrders);

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
      <div className="pastOrders">
        <div className="items">
          {pastOrders.map((orders, id) => {
            return (
              <div key={id} className="mb-3">
                <Card.Header as="h5" className="d-flex">
                  <div>Placed {formatDate(orders.date)}</div>
                  <div className="ml-auto orderTotalPrice">${orders.total}</div>
                </Card.Header>
                <ListGroup>
                {orders.orders.map((item, id) => {
                  return (
                    <ListGroup.Item key={id}>
                    <CartProduct
                      key={id}
                      item={item.product}
                      price={item.price + " ea."}
                      image={item.image}
                      quantity={item.quantityBought}
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
