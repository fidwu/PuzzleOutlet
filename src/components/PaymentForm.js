import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/datepicker.css";
import toDate from 'date-fns/toDate'
import parse from 'date-fns/parse'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format';

const PaymentForm = (props) => {
  // console.log(props.values.expDate);
  // console.log(typeof(props.values.expDate));

  // //let date = parse(props.values.expDate, "MM-dd-yy", new Date()) ;
  // //console.log(date);
  // let date;
  // if (props.values.expDate) {
  //   //date = parse("Jul 8, 2005", "MMM d, y", new Date())
  //   date = format(props.values.expDate, "MM/yy")
  //   // date = toDate(props.values.expDate)
  //   console.log(typeof(date));
  //   //let date = parseISO(new Date(props.values.expDate));
  //   console.log(date);
  // }

  // let date ;
  // if (props.values.expDate) {
  //   date = format(props.values.expDate, "MM/yy");
  //   console.log(date);
  //   date = date.toString();
  //   console.log(date);
  //   console.log(typeof(date));

  //   // date = parseISO(date)
  //   // console.log(typeof(date));
  //   // date = format(parseISO(props.values.expDate), 'MM/yy');
  //   // date = new Date(d ate);
  //   console.log(date);

  // }

  // console.log(date);


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
          {/* <Form.Control
            placeholder="Expiration Date"
            name="expDate"
            value={props.values.expDate}
            onChange={props.handleInputChange}
          /> */}
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
