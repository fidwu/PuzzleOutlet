import Button from 'react-bootstrap/Button';
import ReactStars from 'react-rating-stars-component';
import { withRouter } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

const ProductDescription = (props) => {

  return (
    <>
      <div className="productDetails">
        <Image rounded />
        <div className="productInfo">
          <h2>{props.product}</h2>
          <div className="star-rating">
            <ReactStars
              count={5}
              size={30}
              isHalf={true}
              edit={false}
              value={props.rating}
            />{" "}
            <span>| 1 review</span>
          </div>
          <div className="aboutProduct">
            <h4>About this item</h4>
            <p>Good Product</p>
          </div>
        </div>
        <div className="buyProduct">
          <p>Quantity: 1</p>
          <Button>Add to Cart</Button>
        </div>
      </div>
      <div className="reviews">
        <h3>Customer Reviews</h3>
        <p>Username</p>
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
    </>
  );
};

export default withRouter(ProductDescription);
