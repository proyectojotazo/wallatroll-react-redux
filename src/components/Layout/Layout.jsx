import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Container fluid="md">
      <Row><Header /></Row>
      <Row>{children}</Row>
      <Row>FOOTER</Row>
    </Container>
  );
};

export default Layout;
