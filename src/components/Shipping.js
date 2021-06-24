import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Shipping = (props) => {
  return (
    <Form>
      <Form.Group as={Row}>
        <Col>
          <Form.Control
            placeholder="First Name"
            name="fname"
            value={props.values.fname}
            onChange={props.handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Last Name"
            name="lname"
            value={props.values.lname}
            onChange={props.handleInputChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Form.Control
            placeholder="Email"
            name="email"
            value={props.values.email}
            onChange={props.handleInputChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Form.Control
            placeholder="Address"
            name="address"
            value={props.values.address}
            onChange={props.handleInputChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Form.Control
            placeholder="City"
            name="city"
            value={props.values.city}
            onChange={props.handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Zip Code"
            name="zip"
            type="number"
            pattern="[0-9]*"
            value={props.values.zip}
            onChange={props.handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="State"
            name="state"
            value={props.values.state}
            onChange={props.handleInputChange}
          />
        </Col>
      </Form.Group>

      {/* <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          props.handleSubmit(e);
          props.toNextTab(e);
        }}
        className="d-flex mx-auto"
      >
        Next
      </Button> */}
    </Form>
  );
};

export default Shipping;
