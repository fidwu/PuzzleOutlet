import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { NavLink, useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import { User } from "../data/User";

const Header = () => {
  const pathname = useLocation().pathname;

  const checkPathId = () => {
    const match = matchPath(pathname, {
      path: ["/", "/:id(\\d+)"],
      exact: true,
    });
    return match;
  };

  const numCartItems = () => {
    const user = User.filter(
      (user) => user.username === "username" && user.password === "password"
    )[0];

    // get id's of items in the user's cart
    const itemsInCart = user.cartItemsId.length;
    return itemsInCart;
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">ShopTech</Navbar.Brand>
        <Form inline className="ml-3">
          <Form.Control
            placeholder="Search ShopTech"
            type="search"
            aria-label="Search"
          />
          <Button variant="primary" type="submit" className="ml-2">
            Submit
          </Button>
        </Form>
        <Nav className="ml-auto">
          <NavLink to="/" isActive={() => checkPathId()}>
            Home
          </NavLink>
          <NavLink exact to="/cart">
            Cart{" "}
            <Badge pill variant="info">
              {numCartItems()}
            </Badge>
          </NavLink>
          <NavLink exact to="/pastorders">
            Past Orders
          </NavLink>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
