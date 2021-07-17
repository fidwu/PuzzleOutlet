import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import Shipping from "../components/Shipping";
import Confirm from "../components/Confirm";
import OrderSummary from "../components/OrderSummary";
import "react-datepicker/dist/react-datepicker.css";
import "../css/datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { postOrders, emptyCart } from "../redux/ActionCreators";

const PlaceOrder = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.data);
  const userAuth = useSelector((state) => state.user);

  const totalPrice = cart.reduce(
    (total, current) => total + current.price * current.quantity,
    0
  );

  const [activeTab, setActiveTab] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
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
  };

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

    const payload = {
      user: JSON.parse(localStorage.getItem("user")).email,
      orderTotal: totalPrice.toFixed(2),
      order: cart,
      shipping: shippingVal,
      payment: {
        ...paymentVal,
        expDate: expDate,
      },
    };
    console.log(payload);

    if (paymentVal && shippingVal) {
      dispatch(postOrders(userAuth.user.email, payload));
      dispatch(emptyCart(userAuth.user.email));
    }
    history.push("/");
  };

  const handleTabChange = (e, change) => {
    console.log(change);
    setErrorMsg(null);
    if ((change === 1)) {
      if (activeTab === 0) {
        for (var key in shippingValues) {
          if (shippingValues[key] === "") {
            setErrorMsg("Please fill in all fields.");
            setActiveTab(activeTab);
          } else {
            setActiveTab(activeTab + change);
          }
        }
      } else {
        for (key in paymentValues) {
          if (paymentValues[key] === "") {
            setErrorMsg("Please fill in all fields.");
            setActiveTab(activeTab);
          } else {
            setActiveTab(activeTab + change);
          }
        }
      }
    }
    else {
      console.log("in here to go back");
      setActiveTab(activeTab + change);
    }
    return ;
  };

  const alertMsg = () => {
    return <Alert variant={"danger"}>{errorMsg}</Alert>;
  };

  return (
    <Container fluid className="d-flex justify-content-between">
      <div className="placeorder">
        <h4>Checkout</h4>
        <Tabs activeKey={activeTab}>
          <Tab eventKey={0} title="Shipping">
            {errorMsg && alertMsg()}
            <Shipping
              values={shippingValues}
              handleInputChange={(e) => handleInputChange(e)}
              handleSubmit={(e) => handleSubmit(e)}
            />
          </Tab>
          <Tab eventKey={1} title="Payment">
            {errorMsg && alertMsg()}
            <PaymentForm
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
          {activeTab !== 2 ? (
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
          ) : (
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
          )}
        </div>
      </div>
      <div className="order-summary">
        <OrderSummary items={cart} totalPrice={totalPrice} />
      </div>
    </Container>
  );
};

export default PlaceOrder;
