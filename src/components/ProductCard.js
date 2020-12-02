import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiDollarSign } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "./Button";
import { colorPrimary } from "../config";
import { connect, useDispatch } from "react-redux";
import { addProductToCart } from "../features/carts/cartsSlice";
import { FiCheckCircle } from "react-icons/fi";


const AddToFavoriteHeart = styled(AiOutlineHeart)`
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 1rem;
  right: 1rem;
  color: white;
  filter: drop-shadow(0 1px 6px rgba(0,0,0,0.5));
  transition: 0.2s;
  :hover{
    color: #f51692;
  } 
  :active{
    transform: scale(0.85);
  }
`;

const ProductImage = styled.img`
  margin: 0;
  width: 100%;
  border-bottom-left-radius: 50%;
`;

const ProductName = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const ProductCardContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  padding-top: 0;
`;

const ProductId = styled.div`
  font-size: 12px;
  color: #cecece;
  align-self: flex-start;
  font-weight: 500;
`;

const ProductDescription = styled.div`
  font-size: 13px;
  color: #888;
  line-height: 1.6;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ProductCardFooter = styled.div`
  display: flex; 
  align-items: center;
  margin-top: auto;
  width: 100%;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  color: #333;  
  letter-spacing: -0.1rem;
`;

const StyledWrapper = styled.li`
  position: relative;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.width * 1.65}px`};
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  margin: 0;
  cursor: pointer;
  margin-bottom: 1rem;
  margin-right: 1rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.07), 0 6px 6px rgba(0,0,0,0.05), 0 0 4px rgba(0,0,0,0.05);
  transition: 0.5s;
  overflow: hidden;
  :hover {
    transition-delay: -0.1s;
    transform: translateY(-3px) scale(1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.05), 0 0 4px rgba(0,0,0,0.05);
    ${ProductName}{
      text-decoration: underline;
      text-decoration-color: ${colorPrimary};
    }
  }
`;

const CheckIcon = styled(FiCheckCircle)`
  margin-left: 5px;
  margin-right: -5px;
  font-size: 150%;
`;


const ProductCard = props => {
  const { product, cardWidth } = props;

  const dispatch = useDispatch();
  const [hasAddedToCartRecently, setAddedToCartRecently] = useState(false);

  const onAddToCartButtonClick = () => {
    if (!hasAddedToCartRecently) {
      setAddedToCartRecently(true);
      dispatch(addProductToCart(product.id));
    }
  };

  useEffect(() => {
    if (hasAddedToCartRecently) {
      setTimeout(() => {
        setAddedToCartRecently(false);
      }, 750);
    }
  }, [hasAddedToCartRecently]);

  return (
    <StyledWrapper key={product.id} width={cardWidth}>
      <AddToFavoriteHeart/>
      <ProductImage title={`Image of product ${product.name}`} src={product.imageUrl}/>
      <ProductCardContent>
        <ProductId>ID: {product.id}</ProductId>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description.substring(0, 150)}</ProductDescription>
        <ProductCardFooter>
          <ProductPrice><FiDollarSign/> {product.price}</ProductPrice>
          <Button alignRight onClick={onAddToCartButtonClick}>
            {hasAddedToCartRecently ?
              <span style={{ display: "flex", alignItems: "center" }}>Added <CheckIcon/></span>
              :
              <span style={{ display: "flex", alignItems: "center" }}>Add to cart</span>
            }
          </Button>
        </ProductCardFooter>
      </ProductCardContent>
    </StyledWrapper>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  cardWidth: PropTypes.number
};

ProductCard.defaultProps = {
  product: {},
  cardWidth: 325
};

const mapDispatchToProps = { addProductToCart };

export default connect(
  null,
  mapDispatchToProps
)(ProductCard);