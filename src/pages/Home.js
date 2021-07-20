import ProductCard from '../components/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from 'react-router-dom';

function Home(props) {

  return (
    <>
        <Container fluid>
          <div className="d-flex mb-3 search">
            <h2>Shop Products</h2>
            <Form inline>
              <Form.Control
                placeholder="Search PuzzleOutlet"
                type="search"
                aria-label="Search"
              />
              <Button variant="primary" type="submit" className="ml-2">
                Submit
              </Button>
            </Form>
          </div>
          <Row>
            {props.inventory.map((item, id) => (
              <Col md={4} sm={6} key={id} >
                <ProductCard
                  id={item._id}
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
