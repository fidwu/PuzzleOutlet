import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { NavLink, useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/ActionCreators";

const Header = (props) => {

  const dispatch = useDispatch();

  const pathname = useLocation().pathname;

  const cartLoading = useSelector((state) => state.cart.loading);
  const userAuth = useSelector((state) => state.user);
  console.log(userAuth);

  const checkPathId = () => {
    const match = matchPath(pathname, {
      path: ["/", "/item/:id"],
      exact: true,
    });
    return match;
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">PuzzleOutlet</Navbar.Brand>
        <Nav className="ml-auto">
          <NavLink to="/" isActive={() => checkPathId()}>
            Home
          </NavLink>
          <NavLink exact to="/cart">
            Cart{" "}
            <Badge pill variant="info" className="align-middle">
              {cartLoading ? ` ` : props.numCartItems}
            </Badge>
          </NavLink>
          { userAuth.authenticated ?
            <NavLink exact to="/pastorders">
              Past Orders
            </NavLink>
            : null
          }

          {!userAuth.authenticated 
            ?
            <NavLink exact to="/login">
              Login
            </NavLink>
            :
            <>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
              <Navbar.Text className="ml-3">{userAuth.name}</Navbar.Text>
            </>
          }
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
