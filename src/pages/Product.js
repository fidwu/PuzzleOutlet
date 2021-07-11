import React, { useEffect, useState } from "react";
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

  const [productData, setProductData] = useState([]);

  const itemsLoading = useSelector((state) => state.items.loading);
  const getItemQuantity = useSelector(state => state.cart.data.find(item => item.itemId === id));

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchItemDetails = async () => {
      // fetch item details
      const response = await fetch(`/items/${id}`);
      const result = await response.json();
      setProductData(result);
    };

    fetchItemDetails();

  }, [id]);

  const addToCart = () => {
    const payload = {
      username: "tempUser",
      quantity: 1,
      itemId: id,
      product: productData.product,
      price: productData.price,
      image: productData.image,
    };
    console.log(payload);
    dispatch(addItem(payload));
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
                <h4 className="">{productData.price}</h4>
                <div className="star-rating">
                  <ReactStars
                    count={5}
                    size={30}
                    isHalf={true}
                    edit={false}
                    value={productData.rating}
                  />
                  <span>&nbsp; &nbsp; | &nbsp; &nbsp; 1 review</span>
                </div>
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
            <p className="mb-0">Username</p>
            <div className="star-rating">
              <ReactStars
                count={5}
                size={30}
                isHalf={true}
                edit={false}
                value={productData.rating}
              />
              <span>(Reviewed 1/1/21)</span>
            </div>
            <p>Good Product</p>
          </div>
        </div>
      </Container>
    );
  }
};

export default withRouter(Product);
