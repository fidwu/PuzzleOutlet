import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

const ProductDescription = (props) => {
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
            <Form inline className="mb-2">
              <Form.Label>Quantity: &nbsp;</Form.Label>
              <Form.Control as="select" className="mr-3">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form>
            <Button>Add to Cart</Button>
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
