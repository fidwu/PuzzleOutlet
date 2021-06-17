import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { useParams, withRouter } from 'react-router-dom';
import ProductDescription from '../components/ProductDescription';
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from '../redux/ActionCreators';

const Product = (props) => {

  const { id } = useParams();

  const [quantityVal, setQuantityVal] = useState(1);

  const quantityChanged = (e) => {
    setQuantityVal(parseInt(e.target.value));

    if (inCart()) {
      dispatch(updateItem(product.itemId, parseInt(e.target.value)));
    }
  }

  const product = props.inventory.filter(item => 
    item.itemId === parseInt(id)
  )[0];

  console.log(product);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem(product.itemId, parseInt(quantityVal)));
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
          quantity={product.quantity}
          id={product.itemId}
          quantityVal={quantityVal}
          setQuantityVal={e => quantityChanged(e)}
          addToCart={() => addToCart()}
          inCart={() => inCart()}
        />
      </Container>
    </>
  );
};

export default withRouter(Product);
