import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/ActionCreators";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import Image from "react-bootstrap/Image";
import Quantity from "../components/Quantity";
import { useSelector } from "react-redux";

const Product = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const itemsLoading = useSelector((state) => state.items.loading);

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchItemDetails = async () => {
      // fetch item details
      const response = await fetch(`/items/${id}`);
      const result = await response.json();
      setProductData(result);

      // get quantity if the item is in the cart already
      let cartQuantity = await fetch(`/cart/tempUser/${id}`);
      cartQuantity = await cartQuantity.json()
      setQuantity(cartQuantity ? cartQuantity.quantity : 0);

    };

    fetchItemDetails();

  }, [id]);

  // setQuantity(quantityRes ? quantityRes.quantity : 0);

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
    setQuantity(1);
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
                  {quantity > 0 ? (
                    <Quantity quantity={quantity} itemId={id} updateQuantity={setQuantity} />
                  ) : (
                    <Button onClick={addToCart}>Add to Cart</Button>
                  )}
                </div>
              </div>
            </div>

            <div className="aboutProduct">
              <h4>About this item</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat Ut wisi enim ad minim veniam, quis nostrud
                exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex
                ea commodo consequat
              </p>
              <p>
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit
                esse molestie consequat, vel illum dolore eu feugiat nulla
                facilisis at vero eros et accumsan et iusto odio dignissim qui
                blandit praesent luptatum zzril delenit augue duis dolore te
                feugait nulla facilisiEpsum factorial non deposit quid pro quo
                hic escorol
              </p>
              <p>
                Defacto lingo est igpay atinlay Marquee selectus non provisio
                incongruous feline nolo contendre
              </p>
              <p>Quote meon an estimate et non interruptus stadium</p>
              <p>
                Sic tempus fugit esperanto hiccup estrogen Glorious baklava ex
                librus hup hey ad infinitum
              </p>
              <p>Epsum factorial non deposit quid pro quo hic escorol</p>
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
