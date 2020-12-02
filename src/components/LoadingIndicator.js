import { colorPrimary } from "../config";
import React from "react";
import styled, { keyframes } from "styled-components";


const ellipsisLoaderAnimation1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ellipsisLoaderAnimation2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const ellipsisLoaderAnimation3 = keyframes`
  0% {
   transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const EllipsisLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${colorPrimary};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: ${ellipsisLoaderAnimation1} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${ellipsisLoaderAnimation2} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: ${ellipsisLoaderAnimation2} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: ${ellipsisLoaderAnimation3} 0.6s infinite;
  }
`;

const StyledWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5rem;
`;

const LoadingIndicator = () => {
  return (
    <StyledWrapper>
      <EllipsisLoader>
        <div/>
        <div/>
        <div/>
        <div/>
      </EllipsisLoader>
      <p>We are retrieving products for you...</p>
    </StyledWrapper>
  );
};

export default LoadingIndicator;