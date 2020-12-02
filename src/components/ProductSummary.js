import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FiDollarSign, FiX } from "react-icons/fi";
import Button from "./Button";
import { removeProductFromCart } from "../features/carts/cartsSlice";
import { connect, useDispatch } from "react-redux";

const StyledWrapper = styled.div`
  background: #fafafa;
  display: flex;
  height: 120px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin: 0;
  cursor: pointer;
  margin-bottom: 1rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.07), 0 6px 6px rgba(0,0,0,0.05), 0 0 4px rgba(0,0,0,0.05);
  transition: 0.5s;
  overflow: hidden;
  padding: 1rem;
  padding-left: 0;
`;

const ProductSummaryIdAndNameContainer = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-top: -1rem;
  margin-left: 1rem;
  flex-direction: column;
`;

const ProductSummaryId = styled.div`
  font-size: 12px;
  color: #cecece;
  align-self: flex-start;
  font-weight: 500;
`;

const ProductSummaryImage = styled.img`
  margin: 0;
  width: 20%;
  border-bottom-right-radius: 50%;
`;

const ProductSummaryName = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
`;

const ProductSummaryPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  color: #333;  
  margin-left: auto;
  margin-right: 1rem;
  letter-spacing: -0.1rem;
`;

const XIcon = styled(FiX)`
  font-size: 150%;
`;


const ProductSummary = props => {

  const dispatch = useDispatch();
  const { product, count } = props;

  return (
    <StyledWrapper>
      <ProductSummaryImage title={`Image of product ${product.name}`} src={product.imageUrl}/>
      <ProductSummaryIdAndNameContainer>
        <ProductSummaryId>ID: {product.id}</ProductSummaryId>
        <ProductSummaryName>{product.name} x {count}</ProductSummaryName>
      </ProductSummaryIdAndNameContainer>
      <ProductSummaryPrice><FiDollarSign/> {parseInt(product.price) * count}</ProductSummaryPrice>
      <Button onClick={() => {
        dispatch(removeProductFromCart(product.id));
      }}>
        <XIcon/>
      </Button>
    </StyledWrapper>
  );
};

ProductSummary.propTypes = {
  product: PropTypes.object,
  count: PropTypes.number
};

ProductSummary.defaultProps = {
  product: {},
  count: 0
};

const mapDispatchToProps = { removeProductFromCart };

export default connect(
  null,
  mapDispatchToProps
)(ProductSummary);