import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CartProduct from'../components/CartProduct';
import { User } from '../data/User';
import { Inventory } from '../data/Inventory';
import { Link } from 'react-router-dom';

const Cart = () => {

    //temporary user authentification 
    const user = User.filter((user) => user.username === 'username' && user.password === 'password')[0];

    // get id's of items in the user's cart
    const itemsInCart = user.cartItemsId;
    const getCartItemsId = itemsInCart.map((item) => item.itemId);
    //console.log(getCartItemsId);

    // use item id's and match to inventory id to get product details
    const cartItems = Inventory.filter((inventory) => getCartItemsId.includes(inventory.itemId));
    //console.log(cartItems);
  
    // combine item and quantity in cart information into one array
    const cartItemDetails = itemsInCart.map((val, id) => ({ ...val, ...cartItems[id] }));
    console.log("item details combined: ", cartItemDetails);

    // use reduce to get the total amount
    const totalPrice = cartItemDetails.reduce((total, current) => (total + (current.price.substring(1) * current.quantity)), 0);
    console.log("total: ", totalPrice);

  return (
    <Container fluid>
      <h2 className="mb-3">Shopping Cart ({cartItemDetails.length} {cartItemDetails.length === 1 ? 'item' : 'items'})</h2>
      <div className="shoppingCart"> 
        <div className="cartItems">
          {cartItemDetails.map((cartItems, id) => (
            <CartProduct 
              key={id}
              item={cartItems.product}
              price={cartItems.price + ' ea.'}
              image={cartItems.image}
              quantity={cartItems.quantity}
            />
          ))}
        </div>
        <div className="placeOrder">
          <h3 className="mb-4">Subtotal ({cartItemDetails.length} {cartItemDetails.length === 1 ? 'item' : 'items'}): ${totalPrice}</h3>
          <Link to='/order'>
            <Button>Place Order</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Cart;

