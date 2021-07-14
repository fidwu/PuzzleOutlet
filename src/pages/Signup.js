import Form from "react-bootstrap/Form" ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "../css/account.css";

const Signup = () => {
  return (
    <div className="account">
      <h2> Sign up </h2>

      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Form.Row className="mx-auto">
            <Form.Group as={Col} className="pl-0" controlId="firstname">
                <Form.Label>First name</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group as={Col} className="pr-0" controlId="lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control />
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create account
        </Button>

        <p>Returning user? <Link to="/login">Sign in</Link></p>

      </Form>

    </div>
  );
};

export default Signup;
