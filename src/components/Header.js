import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CART_STATE, colorPrimary, colorSecondary } from "../config";
import { connect } from "react-redux";

const StyledWrapper = styled.header`
  display: flex;
  margin-bottom: 1.5rem;
  max-width: 1400px;
  padding: 1.5rem 1rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, ${colorPrimary}, ${colorSecondary});
    border-bottom-left-radius: 999px;
    border-bottom-right-radius: 999px;
    z-index: -1;
  }
`;

const Nav = styled.nav`
  display: flex;
  margin-left: auto;
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const StyledLink = styled(Link)`
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: 0.2s;
`;

const NavMenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.75rem;
  margin: 0;
  ${StyledLink}{
    color: #999;
  }
  :hover{
    ${StyledLink}{
      color: ${colorPrimary};
    }
  }
  :active{
    ${StyledLink}{
      filter: brightness(40%);
    }
  }
`;

const ShoppingCartIcon = styled(FiShoppingCart)`
  margin-bottom: -5px;
  font-size: 150%;
`;

const LogoLink = styled(Link)`
  color: #333;
  font-weight: 700;
  text-decoration: none;
  transition: 0.2s;
  :hover{
    color: #555;
  }
  :active{
    color: #222;
  }
`;

const Header = props => {
  const { itemsInCart } = props;
  return (
    <StyledWrapper>
      <div style={{ fontSize: "23px", margin: 0, letterSpacing: "-2px" }}>
        <LogoLink to="/" title={"Logo"}>
          Shoppyfy
          <small style={{ color: "#999", fontSize: "12px", letterSpacing: "initial" }}> .netlify.app</small>
        </LogoLink>
      </div>
      <Nav>
        <NavMenu>
          <NavMenuItem>
            <StyledLink to="/" activeStyle={{ color: colorPrimary }}>
              Home
            </StyledLink>
          </NavMenuItem>
          <NavMenuItem>
            <StyledLink to="/shopping-cart/" activeStyle={{ color: colorPrimary }}>
              <ShoppingCartIcon/> {itemsInCart} item{(itemsInCart > 1 || itemsInCart === 0) && "s"}
            </StyledLink>
          </NavMenuItem>
        </NavMenu>
      </Nav>
    </StyledWrapper>
  );
};

Header.propTypes = {
  itemsInCart: PropTypes.number
};

Header.defaultProps = {
  itemsInCart: 0
};

const mapStateToProps = state => ({
  itemsInCart: state.carts.items.find(cart => cart.state === CART_STATE.OPEN).items.length
});

export default connect(
  mapStateToProps,
  null
)(Header);