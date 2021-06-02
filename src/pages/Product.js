import inventory from "../data/inventory";
import Container from "react-bootstrap/Container";
import { useParams, withRouter } from "react-router-dom";
import ProductDescription from "../components/ProductDescription";

const Product = () => {
  const { id } = useParams();

  const product = inventory.filter((item) => item.id === parseInt(id))[0];

  return (
    <>
      <Container fluid>
        <ProductDescription
          image={product.image}
          product={product.product}
          rating={product.rating}
          id={product.id}
        />
      </Container>
    </>
  );
};

export default withRouter(Product);
