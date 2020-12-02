import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT, FETCH_STATUS } from "../../config";
import { openCartSelector } from "../carts/cartsSlice";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: FETCH_STATUS.IDLE,
    error: null,
    isSearching: false,
    isSearchActive: false,
    isSearchError: false,
    isSearchCompleted: false
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setSearchActive: (state, action) => {
      state.isSearchActive = action.payload;
    },
    setSearchError: (state, action) => {
      state.isSearchError = action.payload;
    },
    setSearchCompleted: (state, action) => {
      state.isSearchCompleted = action.payload;
    }
  }
});

export const {
  setProducts,
  setStatus,
  setError,
  setSearching,
  setSearchActive,
  setSearchError,
  setSearchCompleted
} = productsSlice.actions;

async function fetchAllProductsAsync() {
  const responseJSON = await fetch(`${API_ENDPOINT}/products`);
  if (!responseJSON.ok) throw new Error(responseJSON.status);
  return await responseJSON.json();
}

async function fetchProductsForSearchAsync(searchString) {
  const responseJSON = await fetch(`${API_ENDPOINT}/products?search=${searchString}`);
  if (!responseJSON.ok) throw new Error(responseJSON.status);
  return await responseJSON.json();
}

export const fetchAllProducts = () => (dispatch, getState) => {
  if (!getState().isSearchActive) {
    dispatch(setSearching(false));
    dispatch(setSearchCompleted(false));
    dispatch(setSearchError(false));
    dispatch(setStatus(FETCH_STATUS.PENDING));
    fetchAllProductsAsync().then(products => {
      dispatch(setProducts(products));
      dispatch(setStatus(FETCH_STATUS.SUCCESS));
    }).catch(error => {
      dispatch(setStatus(FETCH_STATUS.ERROR));
      dispatch(setError(error));
      console.error(error);
    });
  }
};

export const fetchProductsForSearch = searchInputValue => dispatch => {
  dispatch(setSearching(true));
  dispatch(setSearchActive(true));
  dispatch(setSearchCompleted(false));
  dispatch(setSearchError(false));
  dispatch(setStatus(FETCH_STATUS.PENDING));
  fetchProductsForSearchAsync(searchInputValue).then(products => {
    dispatch(setProducts(products));
    dispatch(setSearchCompleted(true));
    dispatch(setStatus(FETCH_STATUS.SUCCESS));
  }).catch(error => {
    dispatch(setError(error));
    dispatch(setSearchError(true));
    dispatch(setStatus(FETCH_STATUS.ERROR));
    console.error(error);
  }).finally(() => {
    dispatch(setSearching(false));
  });
};

export const productsInCartSelector = state => {
  const cart = openCartSelector(state);
  const productsInCart = [];
  cart.items.forEach(productId => {
    const product = state.products.items.find(product => product.id === productId);
    const productInCart = productsInCart.find(productInCart => productInCart.product && productInCart.product.id === product.id);
    if (!productInCart) {
      productsInCart.push({
        product,
        count: 1
      });
    } else {
      productInCart.count += 1;
    }
  });
  return productsInCart;
};

export default productsSlice.reducer;