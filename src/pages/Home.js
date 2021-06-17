import ProductCard from '../components/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';

function Home(props) {

  console.log(props.inventory);

  return (
    <>
        <Container fluid>
        <h2 className="mb-3">Shop Products</h2>
          <Row>
            {props.inventory.map((item, id) => (
              <Col md={3} sm={6} key={id}>
                <ProductCard
                  id={item.itemId}
                  image={item.image}
                  price={item.price}
                  item={item.product}
                  rating={item.rating}
                />
              </Col>
            ))}
          </Row>
        </Container> 
    </>
  );
}

export default withRouter(Home);
