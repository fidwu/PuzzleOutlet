import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, deleteItem } from "../redux/ActionCreators";
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";

const Quantity = (props) => {
  
  const [quantity, setQuantity] = useState(props.quantity);

  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.user);

  const quantityChanged = (e, type) => {
    e.preventDefault();

    let updatedQuantity = quantity;
    if (type === "+") {
      updatedQuantity = quantity + 1;
    } else {
      updatedQuantity = quantity - 1;
    }

    setQuantity(updatedQuantity);

    const payload = {
      itemId: props.itemId,
      quantity: updatedQuantity,
    };

    if (updatedQuantity <= 0) {
      console.log("DELETING.....");
      dispatch(deleteItem(props.itemId, userAuth.user.email));
    }
    else {
      console.log("UPDATING...");
      dispatch(updateItem(payload, userAuth.user.email));
    }
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
          <InputGroup.Text>{quantity || 1}</InputGroup.Text>
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
