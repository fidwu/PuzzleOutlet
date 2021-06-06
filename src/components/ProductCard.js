import Card from "react-bootstrap/Card";
import ReactStars from "react-rating-stars-component";
import { useHistory } from 'react-router-dom';

const ProductCard = (props) => {

  const history = useHistory();

  const handleCardClick = (id) => history.push(`/${id}`);

  return (
      <Card onClick={() => handleCardClick(props.id)} style={{ cursor: "pointer" }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title className="mb-0">{props.item}</Card.Title>
          <div className="star-rating">
            <ReactStars
              count={5}
              size={30}
              isHalf={true}
              edit={false}
              value={props.rating}
            />
          </div>
          <Card.Text>{props.price}</Card.Text>
        </Card.Body>
      </Card>
  );
};

export default ProductCard;
