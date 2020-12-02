import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT, FETCH_STATUS, CART_STATE } from "../../config";
import React from "react";

export const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    items: [
      {
        state: CART_STATE.OPEN,
        items: []
      }
    ],
    status: FETCH_STATUS.IDLE,
    error: null,
    shippingInformation: {}
  },
  reducers: {
    setCarts: (state, action) => {
      state.items = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    createNewCart: (state, action) => {
      const cartId = action.payload;
      state.items.push({
        id: cartId,
        state: CART_STATE.OPEN,
        items: []
      });
    },
    changeCartState: (state, action) => {
      const { cartId, newCartState } = action.payload;
      state.items.find(cart => cart.id === cartId).state = newCartState;
    },
    addProductToCart: (state, action) => {
      const productId = action.payload;
      state.items.find(cart => cart.state === CART_STATE.OPEN).items.push(productId);
    },
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      const openCart = state.items.find(cart => cart.state === CART_STATE.OPEN);
      openCart.items = openCart.items.filter(id => id !== productId);
    },
    setShippingInformation: (state, action) => {
      const { email, deliveryAddress, deliveryCity } = action.payload;
      state.shippingInformation = {
        email,
        deliveryAddress,
        deliveryCity
      };
    },
    resetCart: (state, action) => {
      state.items.find(cart => cart.state === CART_STATE.OPEN).items = [];
    },
    resetShippingInformation: (state, action) => {
      state.shippingInformation = {};
    }
  }
});

export const {
  addProductToCart,
  removeProductFromCart,
  setCarts,
  setStatus,
  setError,
  setShippingInformation,
  resetCart,
  resetShippingInformation,
  createNewCart,
  changeCartState
} = cartsSlice.actions;

export const openCartSelector = state => {
  return state.carts.items.find(cart => cart.state === CART_STATE.OPEN);
};

async function fetchAllCartsAsync() {
  const responseJSON = await fetch(API_ENDPOINT + "/carts");
  if (!responseJSON.ok) throw new Error(responseJSON.status);
  return await responseJSON.json();
}

async function fetchCreateNewCartAsync() {
  const responseJSON = await fetch(API_ENDPOINT + "/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      state: CART_STATE.OPEN
    })
  });
  if (!responseJSON.ok) throw new Error(responseJSON.status);
  return await responseJSON.json();
}

export const fetchAllCarts = () => dispatch => {
  dispatch(setStatus(FETCH_STATUS.PENDING));
  fetchAllCartsAsync().then(carts => {
    dispatch(setCarts(carts));
    dispatch(setStatus(FETCH_STATUS.SUCCESS));
  }).catch(error => {
    dispatch(setStatus(FETCH_STATUS.ERROR));
    dispatch(setError(error));
    console.error(error);
  });
};

export const fetchCreateNewCart = () => dispatch => {
  fetchCreateNewCartAsync().then(newCart => {
    // console.log({ newCart });
    const cartId = newCart.id;
    dispatch(createNewCart({ cartId }));
  }).catch(error => {
    console.error(error);
  });
};

export default cartsSlice.reducer;