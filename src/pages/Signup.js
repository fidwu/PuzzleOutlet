import Form from "react-bootstrap/Form" ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from 'react-bootstrap/Alert';
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signupError, signupUser } from "../redux/ActionCreators";
import "../css/account.css";

const Signup = () => {

  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.user);

  const [signup, setSignup] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: ""
  })

  const { state } = useLocation();

  if (userAuth.authenticated) {
    return <Redirect to={state?.from || '/'} />
  }

  const handleSignup = (event) => {
    event.preventDefault();
    if (!signup.email && !signup.password && !signup.firstname && !signup.lastname) {
      dispatch(signupError("Please fill out all information."));
    }
    else if (signup.password !== signup.confirmpassword) {
      dispatch(signupError("Passwords do not match"));
    }
    else {
      dispatch(signupUser(signup));
    }
  }

  const handleChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="account">
      <h2> Sign up </h2>

      <Form onSubmit={handleSignup}>

        {userAuth.status.message ?
          userAuth.status.error ? 
            <Alert variant="danger">
              {userAuth.status.message}
            </Alert>
            : 
            <Alert variant="success">
              Successfully registered!
            </Alert>
          : null
        }

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={signup.email} onChange={handleChange} />
        </Form.Group>

        <Form.Row className="mx-auto">
            <Form.Group as={Col} className="pl-0" controlId="firstname">
                <Form.Label>First name</Form.Label>
                <Form.Control name="firstname" value={signup.firstname} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} className="pr-0" controlId="lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control name="lastname" value={signup.lastname} onChange={handleChange} />
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={signup.password} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="confirmpassword" value={signup.confirmpassword} onChange={handleChange} />
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
