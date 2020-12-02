import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { addProductToCart, removeProductFromCart, fetchAllCarts } from "../features/carts/cartsSlice";
import { connect, useDispatch } from "react-redux";
import { FiDollarSign, FiX } from "react-icons/fi";
import Button from "./Button";
import { productsInCartSelector } from "../features/products/productsSlice";
import { openCartSelector } from "../features/carts/cartsSlice";
import ProductSummary from "./ProductSummary";
import { getTotalCost } from "../utils";

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const ShoppingCartList = props => {
  const { productsInCart } = props;

  const dispatch = useDispatch();

  const totalCost = getTotalCost(productsInCart);
  console.log({ productsInCart });
  return (
    <>
      <Cart>
        {productsInCart.length > 0 ?
          productsInCart.map(productInCart => {
            return (
              <ProductSummary
                key={productInCart.product.id}
                product={productInCart.product}
                count={productInCart.count}
              />
            );
          })
          :
          <p>Your cart is empty</p>
        }
      </Cart>
      {productsInCart.length > 0 &&
      <h2>TOTAL: ${totalCost}</h2>
      }
    </>
  );
};

ShoppingCartList.propTypes = {
  cart: PropTypes.object,
  productsInCart: PropTypes.array
};

ShoppingCartList.defaultProps = {
  cart: {},
  productsInCart: []
};

const mapStateToProps = state => {
  return {
    cart: openCartSelector(state),
    productsInCart: productsInCartSelector(state)
  };
};

const mapDispatchToProps = { addProductToCart, removeProductFromCart, fetchAllCarts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartList);
