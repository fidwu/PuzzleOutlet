import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/datepicker.css";

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
          <Datepicker 
            selected={props.expDate ? props.expDate : null}
            onChange={(date) => props.handleDate(date)}
            placeholderText="Expiration Date"
            dateFormat="MM/yy"
            showMonthYearPicker
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
    </Form>
  );
};

export default PaymentForm;
