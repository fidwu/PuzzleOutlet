import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useParams, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/ActionCreators";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import Image from "react-bootstrap/Image";
import Quantity from "../components/Quantity";

const Product = (props) => {
  const { id } = useParams();

  const product = props.inventory.filter(
    (item) => item.itemId === parseInt(id)
  )[0];

  console.log(product);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem(product.itemId, 1));
    const payload = {
      user: "tempUser",
      itemId: product.itemId,
      quantity: 1,
    };
    console.log(payload);
    fetch("/cart", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Success:", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    inCart();
  });

  const inCart = () => {
    const matchCartItem = props.cart.filter(
      (item) => item.itemId === product.itemId
    )[0];

    if (matchCartItem) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Container fluid>
        {/* <ProductDescription
          image={product.image}
          price={product.price}
          product={product.product}
          rating={product.rating}
          quantity={product.quantity || quantity}
          itemId={product.itemId}
          addToCart={() => addToCart()}
          inCart={() => inCart()}
          handleQuantUpdate={quantityChanged}
        /> */}
        <div className="productDescription">
          <div className="productDetails">
            <Image rounded src={product.image} />

            <div className="productInfo">
              <div className="product">
                <h2 className="">{product.product}</h2>
                <h4 className="">{product.price}</h4>
                <div className="star-rating">
                  <ReactStars
                    count={5}
                    size={30}
                    isHalf={true}
                    edit={false}
                    value={product.rating}
                  />
                  <span>&nbsp; &nbsp; | &nbsp; &nbsp; 1 review</span>
                </div>
              </div>

              <div className="buyProduct">
                <div className="actionsDisplay">
                  {inCart() || product.quantity > 0 ? (
                    <Quantity quantity={product.quantity} itemId={product.itemId} />
                  ) : (
                    // <Form inline className="mb-2" method="POST">
                    //   <Form.Label>Quantity: &nbsp;</Form.Label>
                    //   <InputGroup className="form-inline" size="sm">
                    //     <InputGroup.Prepend>
                    //       <Button
                    //         variant="outline-secondary"
                    //         value={"-"}
                    //         onClick={(e) => props.handleQuantUpdate(e, "-")}
                    //       >
                    //         <MdRemove />
                    //       </Button>
                    //     </InputGroup.Prepend>
                    //     {/* <Form.Control size="sm" name="foo" value={props.quantity || props.quantityVal} onChange={e => props.handleQuantUpdate(e)} /> */}
                    //     <InputGroup.Text>
                    //       {props.quantity || 1}
                    //     </InputGroup.Text>
                    //     <InputGroup.Append>
                    //       <Button
                    //         variant="outline-secondary"
                    //         value={"+"}
                    //         onClick={(e) => props.handleQuantUpdate(e, "+")}
                    //       >
                    //         <MdAdd />
                    //       </Button>
                    //     </InputGroup.Append>
                    //   </InputGroup>
                    // </Form>
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
                value={product.rating}
              />
              <span>(Reviewed 1/1/21)</span>
            </div>
            <p>Good Product</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default withRouter(Product);
