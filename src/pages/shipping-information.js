import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import UnstyledLink from "../components/UnstyledLink";
import Button from "../components/Button";
import Input from "../components/Input";
import { changeCartState, setShippingInformation } from "../features/carts/cartsSlice";
import { AiOutlineCreditCard, AiOutlineArrowLeft } from "react-icons/ai";
import { CART_STATE } from "../config";

const InputGroup = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  font-weight: 700;
`;

const CreditCardIcon = styled(AiOutlineCreditCard)`
  margin-left: 5px;
  margin-right: -5px;
  font-size: 150%;
`;

const IconArrowLeft = styled(AiOutlineArrowLeft)`
  margin-left: -5px;
  margin-right: 5px;
  font-size: 150%;
`;

const ShippingInformation = props => {

  const { shippingInformation } = props;
  const dispatch = useDispatch();

  const [emailInputValue, setEmailInputValue] = useState("");
  const [deliveryAddressInputValue, setDeliveryAddressInputValue] = useState("");
  const [deliveryCityInputValue, setDeliveryCityInputValue] = useState("");

  const onEmailInputValueChange = e => {
    setEmailInputValue(e.target.value);
  };

  const onDeliveryAddressInputValueChange = e => {
    setDeliveryAddressInputValue(e.target.value);
  };

  const onDeliveryCityInputValueChange = e => {
    setDeliveryCityInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // dispatch(changeCartState(CART_STATE.PAYMENT_IN_PROGRESS));
    dispatch(setShippingInformation({
      email: emailInputValue,
      deliveryAddress: deliveryAddressInputValue,
      deliveryCity: deliveryCityInputValue
    }));
    navigate("/payment-summary");
  };

  useEffect(() => {
    if (shippingInformation.email) {
      setEmailInputValue(shippingInformation.email);
      setDeliveryAddressInputValue(shippingInformation.deliveryAddress);
      setDeliveryCityInputValue(shippingInformation.deliveryCity);
    }
  }, [shippingInformation]);


  return (
    <Layout>
      <SEO title="Shipping information"/>
      <h1>Shipping information</h1>
      <p>Please provide shipping information</p>
      <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
        <form name="shippingInformation" onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="emailInput">E-mail</InputLabel>
            <Input id={"emailInput"}
                   type="email"
                   value={emailInputValue}
                   onChange={onEmailInputValueChange}
                   required={true}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="deliveryAddress">Delivery address</InputLabel>
            <Input id={"deliveryAddress"}
                   type="text"
                   value={deliveryAddressInputValue}
                   onChange={onDeliveryAddressInputValueChange}
                   required={true}
            />
          </InputGroup>
          <InputGroup style={{ marginBottom: "1rem" }}>
            <InputLabel htmlFor="deliveryCity">Delivery city</InputLabel>
            <Input id={"deliveryCity"}
                   type="text"
                   value={deliveryCityInputValue}
                   onChange={onDeliveryCityInputValueChange}
                   required={true}
            />
          </InputGroup>
          <Button type="submit">
            Proceed to payment <CreditCardIcon/>
          </Button>
        </form>
      </div>
      <UnstyledLink to="/shopping-cart">
        <Button>
          <IconArrowLeft/> Go back to the cart
        </Button>
      </UnstyledLink>
    </Layout>
  );
};

const mapStateToProps = state => ({
  shippingInformation: state.carts.shippingInformation
});

const mapDispatchToProps = { setShippingInformation, changeCartState };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingInformation);