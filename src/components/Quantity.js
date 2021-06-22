import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { updateItem } from "../redux/ActionCreators";
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";

const Quantity = (props) => {

  const [quantity, setQuantity] = useState(props.quantity || 0);

  const dispatch = useDispatch();

  const quantityChanged = (e, type) => {
    e.preventDefault();

    let updatedQuantity = quantity;
    if (type === "+") {
      updatedQuantity = quantity + 1;
    } else {
      updatedQuantity = quantity - 1;
    }

    setQuantity(updatedQuantity);
    dispatch(updateItem(props.itemId, parseInt(updatedQuantity)));

    const payload = {
      user: "tempUser",
      itemId: props.itemId,
      quantity: updatedQuantity,
    };

    fetch(`/cart/${props.itemId}`, {
      method: `${updatedQuantity !== 0 ? "put" : "delete"}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: updatedQuantity !== 0 ? JSON.stringify(payload) : null,
    })
      .then((response) => {
        console.log(JSON.stringify(response));
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Success:", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Form inline className="mb-2">
        <Form.Label>Quantity: &nbsp;</Form.Label>
        <InputGroup className="form-inline" size="sm">
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              value={"-"}
              onClick={(e) => quantityChanged(e, "-")}
            >
              <MdRemove />
            </Button>
          </InputGroup.Prepend>
          {/* <Form.Control size="sm" name="foo" value={props.quantity || props.quantityVal} onChange={e => props.handleQuantUpdate(e)} /> */}
          <InputGroup.Text>{props.quantity || 1}</InputGroup.Text>
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              value={"+"}
              onClick={(e) => quantityChanged(e, "+")}
            >
              <MdAdd />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  );
};

export default Quantity;
