import React from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ShoppingCartList from "../components/ShoppingCartList";
import Button from "../components/Button";
import UnstyledLink from "../components/UnstyledLink";
import {
  openCartSelector
} from "../features/carts/cartsSlice";
import { connect } from "react-redux";
import { MdLocalShipping } from "react-icons/md";


const IconShipping = styled(MdLocalShipping)`
  margin-left: 5px;
  margin-right: -5px;
  font-size: 150%;
`;


const ShoppingCart = props => {
  const { cart } = props;
  return (
    <Layout>
      <SEO title="Shopping cart"/>
      <h1>
        <FiShoppingCart/> Your shopping cart
      </h1>
      <ShoppingCartList/>
      <UnstyledLink to="/">
        <Button>
          Continue shopping
        </Button>
      </UnstyledLink>
      {cart.items.length > 0 &&
      <UnstyledLink to="/shipping-information">
        <Button>
          Proceed to shipping information
          <IconShipping/>
        </Button>
      </UnstyledLink>}
    </Layout>
  );
};


const mapStateToProps = state => ({
  cart: openCartSelector(state)
});

export default connect(
  mapStateToProps,
  null
)(ShoppingCart);