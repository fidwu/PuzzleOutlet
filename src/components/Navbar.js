import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { matchPath } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/ActionCreators";

const Header = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const pathname = useLocation().pathname;

  const cartLoading = useSelector((state) => state.cart.loading);
  const userAuth = useSelector((state) => state.user);

  const checkPathId = () => {
    const match = matchPath(pathname, {
      path: ["/", "/item/:id"],
      exact: true,
    });
    return match;
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  }

  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/">PuzzleOutlet</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link eventKey="1" as={NavLink} to="/" isActive={() => checkPathId()}>
            Home
          </Nav.Link>
          <Nav.Link eventKey="2" as={NavLink} exact to="/cart">
            Cart{" "}
            <Badge pill variant="info" className="align-middle">
              {cartLoading ? ` ` : props.numCartItems}
            </Badge>
          </Nav.Link>
          { userAuth.authenticated ?
            <Nav.Link eventKey="3" as={NavLink} exact to="/pastorders">
              Past Orders
            </Nav.Link>
            : null
          }

          {!userAuth.authenticated 
            ?
            <Nav.Link eventKey="4" as={NavLink} exact to="/login">
              Login
            </Nav.Link>
            :
            <>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
              <Navbar.Text className="ml-3">{userAuth.user.name}</Navbar.Text>
            </>
          }
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
