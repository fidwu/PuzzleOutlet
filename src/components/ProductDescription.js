import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Quantity from "./Quantity";

const ProductDescription = (props) => {
  console.log(props.quantity);
  return (
    <div className="productDescription">
      <div className="productDetails">
        <Image rounded src={props.image} />

        <div className="productInfo">
          <div className="product">
            <h2 className="">{props.product}</h2>
            <h4 className="">{props.price}</h4>
            <div className="star-rating">
              <ReactStars
                count={5}
                size={30}
                isHalf={true}
                edit={false}
                value={props.rating}
              />
              <span>&nbsp; &nbsp; | &nbsp; &nbsp; 1 review</span>
            </div>
          </div>

          <div className="buyProduct">
            <div className="actionsDisplay">
            {props.inCart() || props.quantity > 0 ? (
              <Quantity 
                quantity={props.quantity}
                itemId={props.itemId}
              />
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
            ) : (
              <Button onClick={props.addToCart}>
                Add to Cart
              </Button>
            )}
            </div>
          </div>
        </div>

        <div className="aboutProduct">
          <h4>About this item</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat
          </p>
          <p>
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat, vel illum dolore eu feugiat nulla facilisis at
            vero eros et accumsan et iusto odio dignissim qui blandit praesent
            luptatum zzril delenit augue duis dolore te feugait nulla
            facilisiEpsum factorial non deposit quid pro quo hic escorol
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
            value={props.rating}
          />
          <span>(Reviewed 1/1/21)</span>
        </div>
        <p>Good Product</p>
      </div>
    </div>
  );
};

export default withRouter(ProductDescription);
