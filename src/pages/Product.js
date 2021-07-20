import React from "react";
import Container from "react-bootstrap/Container";
import { useParams, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/ActionCreators";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import Image from "react-bootstrap/Image";
import Quantity from "../components/Quantity";

const Product = () => {
  const { id } = useParams();

  const itemsLoading = useSelector((state) => state.items.loading);
  const productData = useSelector((state) => state.items.data.find(item => item._id === id));
  const getItemQuantity = useSelector(state => state.cart.data.find(item => item.itemId === id));
  const userAuth = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addToCart = () => {
    const payload = {
      quantity: 1,
      itemId: id,
      product: productData.product,
      price: productData.price,
      image: productData.image
    };
    dispatch(addItem(payload, userAuth.user.email));
  };

  if (itemsLoading) {
    return <h1>Loading...</h1>;
  } 
  
  else {
    return (
      <Container fluid>
        <div className="productDescription">
          <div className="productDetails">
            <Image rounded src={productData.image} />

            <div className="productInfo">
              <div className="product">
                <h2 className="">{productData.product}</h2>
                <h4 className="">${productData.price}</h4>
                <div className="star-rating">
                  <ReactStars
                    count={5}
                    size={30}
                    isHalf={true}
                    edit={false}
                    value={productData.rating}
                  />
                </div>
                <span>1 review</span>
              </div>

              <div className="buyProduct">
                <div className="actionsDisplay">
                  {getItemQuantity && getItemQuantity.quantity > 0 ? (
                    <Quantity quantity={getItemQuantity.quantity} itemId={id} />

                  ) : (
                    <Button onClick={addToCart}>Add to Cart</Button>
                  )}
                </div>
              </div>
            </div>

            <div className="aboutProduct">
              <h4>About this item</h4>
              <p>{productData.description}</p>
            </div>
          </div>

          <div className="reviews">
            <h4>Customer Reviews</h4>
            <p className="mb-0">Username <span>(Reviewed 1/1/21)</span></p>
            <div className="star-rating">
              <ReactStars
                count={5}
                size={30}
                isHalf={true}
                edit={false}
                value={productData.rating}
              />
            </div>
            <p>Good Product</p>
          </div>
        </div>
      </Container>
    );
  }
};

export default withRouter(Product);
