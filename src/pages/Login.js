import Form from "react-bootstrap/Form" ;
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert'
import "../css/account.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginError, loginUser } from "../redux/ActionCreators";

const Login = () => {

  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.user);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleLogin = (event) => {
    event.preventDefault();
    if (!login.email && !login.password) {
      dispatch(loginError("Missing username and password"));
    }
    else {
      dispatch(loginUser(login));
    }
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="account">
      <h2> Login </h2>

      <Form onSubmit={handleLogin}>

        {userAuth.status.message ?
          userAuth.status.error ? 
            <Alert variant="danger">
              {userAuth.status.message}
            </Alert>
            : 
            <Alert variant="success">
              Successfully logged in
            </Alert>
          : null
        }

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={login.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={login.password} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign in
        </Button>

        <p>New? <Link to="/signup">Create an account</Link></p>

      </Form>

    </div>
  );
};

export default Login;
