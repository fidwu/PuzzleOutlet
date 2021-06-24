import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PaymentForm from "../components/PaymentForm";
import Shipping from "../components/Shipping";
import Confirm from "../components/Confirm";
import OrderSummary from "../components/OrderSummary";
import "react-datepicker/dist/react-datepicker.css";
import "../css/datepicker.css";

const PlaceOrder = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expDate, setExpDate] = useState(false);
  const shippingFormValues = {
    fname: "",
    lname: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    state: "",
  };
  const paymentFormValues = {
    cardNum: "",
    cvc: "",
  };
  const [shippingValues, setShippingFormValues] = useState(shippingFormValues);
  const [paymentValues, setPaymentFormValues] = useState(paymentFormValues);

  const handleInputChange = (event) => {
    if (activeTab === 0) {
      //shipping page
      setShippingFormValues({
        ...shippingValues,
        [event.target.name]: event.target.value,
      });
    } else {
      setPaymentFormValues({
        ...paymentValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleDateChange = (date) => {
    setExpDate(date);
    console.log(date);

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const shippingVal = {
      fname: shippingValues.fname,
      lname: shippingValues.lname,
      email: shippingValues.email,
      address: shippingValues.address,
      city: shippingValues.city,
      zip: shippingValues.zip,
      state: shippingValues.state,
    };

    const paymentVal = {
      cardNum: paymentValues.cardNum,
      cvc: paymentValues.cvc,
    };

    console.log(shippingVal, paymentVal);
    console.log(props.cartItems);
    console.log(props.totalPrice);

    const payload = {
      user: "tempUser",
      orderTotal: props.totalPrice,
      order: props.cartItems,
      shipping: shippingVal,
      payment: {
        ...paymentVal,
        expDate: expDate
      }
    };
    console.log(payload);

    if (paymentVal && shippingVal) {
      fetch("/orders", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("Success:", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleTabChange = (e, change) => {
    setActiveTab(activeTab + change);
    if (activeTab === 0) {
        for (var key in shippingValues) {
            console.log(key);
            if (shippingValues[key] === "") {
                console.log(`${key} is blank -- not allowed`);
                setActiveTab(activeTab);
            }
        }
    }
    else {
        for (key in paymentValues) {
            if (paymentValues[key] === "") {
                console.log(`${key} is blank -- not allowed`);
                setActiveTab(activeTab);
            }
        }
    }
    e.preventDefault();
  };

  const selectTab = (pageId) => {
    if (activeTab === 0) {
        for (var key in shippingValues) {
            if (shippingValues[key] === "") {
                console.log(`${key} is blank -- not allowed`);
                setActiveTab(activeTab);
            }
            else {
                setActiveTab(pageId);
            }
        }
    }
    else {
        for (key in paymentValues) {
            console.log(key);
            if (paymentValues[key] === "") {
                console.log(`${key} is blank -- not allowed`);
                setActiveTab(pageId);
            }
            else {
                setActiveTab(pageId);
            }
        }
    }
  }

  return (
    <Container fluid className="d-flex justify-content-between">
      <div className="placeorder">
        <h4>Checkout</h4>
        <Tabs activeKey={activeTab} onSelect={(k) => selectTab(k)}>
          <Tab eventKey={0} title="Shipping">
            <Shipping
              toNextTab={(e) => handleTabChange(e)}
              values={shippingValues}
              handleInputChange={(e) => handleInputChange(e)}
              handleSubmit={(e) => handleSubmit(e)}
            />
          </Tab>
          <Tab eventKey={1} title="Payment">
            <PaymentForm
              toNextTab={(e) => handleTabChange(e)}
              values={paymentValues}
              expDate={expDate}
              handleDate={handleDateChange}
              handleInputChange={(e) => handleInputChange(e)}
              handleSubmit={(e) => handleSubmit(e)}
            />
          </Tab>
          <Tab eventKey={2} title="Confirm">
            <Confirm
              shippingValues={shippingValues}
              paymentValues={paymentValues}
              expDate={expDate}
            />
          </Tab>
        </Tabs>
          {/* <Datepicker 
            selected={expDate ? expDate : null}
            onChange={(date) => handleDateChange(date)}
            placeholderText="Expiration Date"
            dateFormat="MM/yy"
            showMonthYearPicker
          /> */}
        <div className="d-flex">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleTabChange(e, -1);
            }}
            className="d-flex"
            disabled={activeTab === 0 ? true : false}
          >
            &#8249; Back
          </Button>
          {activeTab !== 2 ? 
        <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleTabChange(e, 1);
            }}
            className="d-flex ml-auto"
          >
            Next &#8250;
          </Button>
          :
          <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            handleSubmit(e, true);
            handleTabChange(e, 0);
          }}
          className="d-flex ml-auto"
        >
          Place Order
        </Button>
        }

        </div>
      </div>
      <div className="order-summary">
        <OrderSummary 
          items={props.cartItems} 
          totalPrice={props.totalPrice}
        />
      </div>
    </Container>
  );
};

export default PlaceOrder;
