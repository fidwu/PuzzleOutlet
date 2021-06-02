import ProductCard from '../components/ProductCard';
import inventory from '../data/inventory';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';

function Home() {
  return (
    <>
        <Container fluid>
        <h2 className="mb-3">Shop Products</h2>
          <Row>
            {inventory.map((item) => (
              <Col md={3} sm={6} key={item.id}>
                <ProductCard
                  id={item.id}
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
