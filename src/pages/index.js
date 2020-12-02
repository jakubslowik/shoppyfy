import React, { useState } from "react";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import { FiSearch, FiX } from "react-icons/fi";
import { RiEmotionSadLine } from "react-icons/ri";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Input from "../components/Input";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import ProductList from "../components/ProductList";
import {
  fetchAllProducts,
  fetchProductsForSearch, setSearchActive
} from "../features/products/productsSlice";


const SearchBar = styled.div`
  display: flex;
  justify-content: center; 
  margin-bottom: 2rem;
`;

const SearchInputContainer = styled.div`
  position: relative;
  max-width: 500px; 
  width: 50%; 
`;

const SearchInput = styled(Input)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px
`;

const SearchResetButton = styled(Button)`
  height: 100%;
  font-size: 125%;
  background: transparent;
  border-left: none;
  border-radius: 0px;
  color: #cacaca;
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  transition: 0.2s;
  transform: translateX(${props => props.isHidden ? "20px" : "0"});
  opacity: ${props => props.isHidden ? 0 : 1};
`;

const SearchButton = styled(Button)`
  z-index: 1;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  margin-left: -2px;
`;

const SearchIcon = styled(FiSearch)`
  font-size: 150%;
  margin-left: -5px;
  margin-right: 5px;
`;

const MessageText = styled.p`
 display: flex;
 align-items: center; 
 justify-content: center; 
 padding: 0 5rem;
`;

const MessageTextBigPadding = styled(MessageText)`
 padding: 5rem;
`;

const SadFaceIcon = styled(RiEmotionSadLine)`
  font-size: 150%; 
  margin-left: 5px;
`;


const IndexPage = props => {
  const { products, isSearching, isSearchCompleted, isSearchError } = props;

  const dispatch = useDispatch();

  const [searchInputValue, setSearchInputValue] = useState("");

  const searchForProducts = () => {
    if (searchInputValue !== "") {
      dispatch(fetchProductsForSearch(searchInputValue));
    } else {
      resetSearch();
    }
  };

  const resetSearch = () => {
    setSearchInputValue("");
    dispatch(setSearchActive(false));
    dispatch(fetchAllProducts());
  };

  const onSearchInputKeyDown = e => {
    if (e.key === "Enter") {
      searchForProducts();
    } else if (e.key === "Escape") {
      resetSearch();
    }
  };

  const onSearchInputChange = e => {
    setSearchInputValue(e.target.value);
  };


  return (
    <Layout>
      <SEO title="Home"/>
      <h1>Welcome to our shop!</h1>
      <p style={{ textAlign: "center" }}>What are you looking for?</p>
      <SearchBar>
        <SearchInputContainer>
          <SearchInput
            type="text"
            value={searchInputValue}
            placeholder={"chair, keyboard..."}
            onKeyDown={onSearchInputKeyDown}
            onChange={onSearchInputChange}
          />
          <SearchResetButton
            title={"Reset search"}
            isHidden={searchInputValue === ""}
            onClick={resetSearch}
          >
            <FiX/>
          </SearchResetButton>
        </SearchInputContainer>
        <SearchButton title={"Search"} onClick={searchForProducts}>
          <SearchIcon/> Search
        </SearchButton>
      </SearchBar>
      {isSearchCompleted && products.length > 0 &&
      <MessageText>
        We have found {products.length} products for you:
      </MessageText>
      }
      {isSearchCompleted && products.length === 0 &&
      <MessageTextBigPadding>
        We haven't found anything for that phrase
        <SadFaceIcon/>
      </MessageTextBigPadding>
      }
      {isSearchError &&
      <MessageTextBigPadding>
        Something went wrong while retrieving products. Please try again.
      </MessageTextBigPadding>
      }
      {!isSearching ?
        <ProductList/>
        :
        <LoadingIndicator/>
      }
    </Layout>
  );
};

const mapStateToProps = state => ({
  products: state.products.items,
  isSearching: state.products.isSearching,
  isSearchCompleted: state.products.isSearchCompleted,
  isSearchError: state.products.isSearchError
});

const mapDispatchToProps = { fetchAllProducts, fetchProductsForSearch, setSearchActive };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);