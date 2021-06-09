import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PaymentForm = (props) => {
  return (
    <Form>
      <Form.Group as={Row}>
        <Col>
          <Form.Check
            custom
            type="checkbox"
            id="checkbox"
            label="Make this my default payment"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Form.Control
            placeholder="Credit Card Number"
            name="cardNum"
            value={props.values.cardNum}
            onChange={props.handleInputChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Control
            placeholder="Expiration Date"
            name="expDate"
            value={props.values.expDate}
            onChange={props.handleInputChange}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="CVC"
            name="cvc"
            value={props.values.cvc}
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

export default PaymentForm;
