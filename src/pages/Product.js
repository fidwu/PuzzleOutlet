import { Inventory } from '../data/Inventory';
import Container from 'react-bootstrap/Container';
import { useParams, withRouter } from 'react-router-dom';
import ProductDescription from '../components/ProductDescription';

const Product = () => {
  const { id } = useParams();

  const product = Inventory.filter((item) => item.itemId === parseInt(id))[0];

  return (
    <>
      <Container fluid>
        <ProductDescription
          image={product.image}
          price={product.price}
          product={product.product}
          rating={product.rating}
          id={product.id}
        />
      </Container>
    </>
  );
};

export default withRouter(Product);
