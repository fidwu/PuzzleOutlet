import ProductCard from '../components/ProductCard';
import { Inventory } from '../data/Inventory';
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
            {Inventory.map((item, id) => (
              <Col md={3} sm={6} key={id}>
                <ProductCard
                  id={id}
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
