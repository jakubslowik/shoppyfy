import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 15px;
`;


const Footer = () => {
  return (
    <StyledWrapper>
      Shoppyfy shopping app © {new Date().getFullYear()}
    </StyledWrapper>
  );
};

export default Footer;