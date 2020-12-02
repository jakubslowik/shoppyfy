import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";

const Main = styled.main`
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 0 1rem 1.5rem;
`;

const Layout = ({ children }) => {

  return (
    <>
      <Header/>
      <Main>
        {children}
      </Main>
      <Footer/>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
