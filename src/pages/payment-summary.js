import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Button from "../components/Button";
import UnstyledLink from "../components/UnstyledLink";
import { changeCartState, resetCart, resetShippingInformation } from "../features/carts/cartsSlice";
import { connect, useDispatch } from "react-redux";
import { productsInCartSelector } from "../features/products/productsSlice";
import { getTotalCost } from "../utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { API_ENDPOINT, CART_STATE } from "../config";


const IconArrowLeft = styled(AiOutlineArrowLeft)`
  margin-left: -5px;
  margin-right: 5px;
  font-size: 150%;
`;

const PaymentSummary = props => {

  const { shippingInformation, productsInCart } = props;
  const dispatch = useDispatch();
  const [isPaymentBeingProcessed, setPaymentBeingProcessed] = useState(false);
  const [isPaymentReceived, setPaymentReceived] = useState(false);
  const [isPaymentError, setPaymentError] = useState(false);

  async function placeOrder() {
    const responseJSON = await fetch(`${API_ENDPOINT}/orders`, {
      // const responseJSON = await fetch(`https://5fc4023fe5c28f0016f5505b.mockapi.io/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shippingInformation)
    });
    if (!responseJSON.ok) throw new Error(responseJSON.status);
    return await responseJSON.json();
  }

  if (!shippingInformation.email) {
    if (typeof window !== "undefined") {
      navigate("/");
    }
  }

  const totalCost = getTotalCost(productsInCart);
  return (
    <Layout>
      <SEO title="Payment summary"/>
      <h1>Payment summary</h1>
      <h3>Shipping information</h3>
      <p>
        <small>E-mail:</small>
        <br/>
        <b>{shippingInformation.email}
        </b></p>
      <p>
        <small>Delivery address:</small>
        <br/>
        <b>{shippingInformation.deliveryAddress}</b>
      </p>
      <p>
        <small>Delivery city:</small>
        <br/>
        <b>{shippingInformation.deliveryCity}</b>
      </p>
      <br/>
      <h3>Products summary</h3>
      {productsInCart.map(productInCart => {
        const product = productInCart.product;
        return (
          <ul key={product.id}>
            <li>{product.name} <b>x {productInCart.count}</b> = <b>${product.price * productInCart.count}</b></li>
          </ul>
        );
      })}
      <h3>Total to pay: ${totalCost}</h3>

      {!isPaymentReceived &&
      <Button onClick={() => {
        setPaymentBeingProcessed(true);
        setTimeout(() => {
          setPaymentReceived(true);
          setPaymentBeingProcessed(false);
          alert("Payment received");
          placeOrder().then(response => {
            alert("Order created");
            dispatch(resetCart());
            dispatch(resetShippingInformation());
            // dispatch(changeCartState(CART_STATE.CLOSED));
          }).catch(error => {
            console.error(error);
          });
        }, 1500);
      }}>
        {isPaymentBeingProcessed ? "Payment processing..." : "PAY"}
      </Button>
      }
      {isPaymentReceived &&
      <p>
        Payment received. Thank you for your purchase.
      </p>
      }
      {isPaymentError &&
      <p>
        Payment error. Please try again or contact support.
      </p>
      }
      {!isPaymentReceived && !isPaymentError && !isPaymentBeingProcessed &&
      <UnstyledLink to="/shipping-information">
        <Button>
          <IconArrowLeft/> Correct delivery address
        </Button>
      </UnstyledLink>}
    </Layout>
  );
};


const mapStateToProps = state => {
  return {
    productsInCart: productsInCartSelector(state),
    shippingInformation: state.carts.shippingInformation
  };
};

const mapDispatchToProps = { resetCart, resetShippingInformation, changeCartState };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSummary);