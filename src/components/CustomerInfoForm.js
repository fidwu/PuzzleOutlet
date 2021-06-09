import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CustomerInfoForm = (props) => {
  const formValues = {
    fname: "",
    lname: "",
    email: "",
    phoneNum: "",
  };
  const [values, setFormValues] = useState(formValues);

  const handleInputChange = (event) => {
    setFormValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerInfoFormValues = {
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      phoneNum: values.phoneNum,
    };

    console.log(customerInfoFormValues);
  };

  return (
    <Form>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            placeholder="First Name"
            name="fname"
            value={values.fname}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Last Name"
            name="lname"
            value={values.lname}
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Form.Control
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Phone Number"
            name="phoneNum"
            value={values.phoneNum}
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
          props.toNextTab(e);
        }}
        className="d-flex mx-auto"
      >
        Next
      </Button>
    </Form>
  );
};

export default CustomerInfoForm;
