import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { useParams, withRouter } from 'react-router-dom';
import ProductDescription from '../components/ProductDescription';
import { useDispatch } from "react-redux";
import { addItem, updateItem } from '../redux/ActionCreators';

const Product = (props) => {

  const { id } = useParams();

  const product = props.inventory.filter(item => 
    item.itemId === parseInt(id)
  )[0];

  console.log(product);

  const [quantity, setQuantity] = useState(product.quantity || 0);

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
      dispatch(updateItem(product.itemId, parseInt(updatedQuantity)));
  }

  const dispatch = useDispatch();

  const addToCart = () => {
    setQuantity(1);
    dispatch(addItem(product.itemId, 1));
  }

  useEffect(() => {
    inCart();
  })

  const inCart = () => {
    const matchCartItem = props.cart.filter(item => item.itemId === product.itemId)[0];

    if (matchCartItem) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <>
      <Container fluid>
        <ProductDescription
          image={product.image}
          price={product.price}
          product={product.product}
          rating={product.rating}
          quantity={product.quantity || quantity}
          id={product.itemId}
          addToCart={() => addToCart()}
          inCart={() => inCart()}
          handleQuantUpdate={quantityChanged}
        />
      </Container>
    </>
  );
};

export default withRouter(Product);
