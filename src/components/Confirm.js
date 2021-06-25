import React from "react";
import format from 'date-fns/format';
import isValid from 'date-fns/isValid'

const Confirm = (props) => {

  const formatDate = (date) => {
    let formattedDate;
    if (isValid(props.expDate) && !isNaN(props.expDate)) {
      formattedDate = format(date, "MM/yy");
    }
    return formattedDate;
  }

  return (
    <>
      <div className="confirm">
        <div className="shipping col-6">
          <div>
            <h5>Shipping to:</h5>
            <br />
            <p>{props.shippingValues.fname} {props.shippingValues.lname}</p>
            <br />
            <p>{props.shippingValues.address}</p>
            <br />
            <p>{props.shippingValues.city}, {props.shippingValues.state} {props.shippingValues.zip}</p>
            <br />
          </div>
        </div>
        <div className="billing col-6">
          <div>
            <h5>Billing:</h5>
            <br />
            <p>Card ending in: {props.paymentValues.cardNum.substr(-4)}</p>
            <br />
            <p>{formatDate(props.expDate)}</p>
            <br />
            <p>{props.paymentValues.cvc}</p>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
