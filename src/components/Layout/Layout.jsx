import React from "react";
import { Container, Row } from "react-bootstrap";

import Header from "./Header";

import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <Row className="layout-row-children">{children}</Row>
      <Row>
        <footer className="layout-footer">© 2021 Javier Guerrero</footer>
      </Row>
    </Container>
  );
};

export default Layout;
