import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { fetchAllProducts } from "../features/products/productsSlice";


const StyledWrapper = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  margin-bottom: -1rem; // adjusting the margin we have introduced in ProductCard
  margin-right: -1rem;
`;

const ProductList = props => {
  const { products, isSearchActive } = props;

  const dispatch = useDispatch();
  const [cardWidth, setCardWidth] = useState(325);

  useEffect(() => {
    if (!isSearchActive) {
      dispatch(fetchAllProducts());
    }
  }, []);

  return (
    <StyledWrapper>
      {products && products.map(product => {
        return (
          <ProductCard key={product.id} product={product} cardWidth={cardWidth}/>
        );
      })}
    </StyledWrapper>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
  status: PropTypes.string,
  error: PropTypes.string,
  isSearchActive: PropTypes.bool
};

ProductList.defaultProps = {
  products: [],
  status: "idle",
  error: null,
  isSearchActive: false
};

const mapStateToProps = state => ({
  products: state.products.items,
  status: state.products.status,
  error: state.products.error,
  isSearchActive: state.products.isSearchActive
});

const mapDispatchToProps = { fetchAllProducts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);