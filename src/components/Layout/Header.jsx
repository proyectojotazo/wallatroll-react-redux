import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import icon from "../../assets/images/wallaicon-res.png";

import "./Header.css";

const Header = () => {
  return (
    <Container>
      <Row className="header-row">
        <Col md={2}>
          <Image src={icon} />
        </Col>
        <Col md={8}>
          <h1 className="header-title">WALLATROLL</h1>
        </Col>
        <Col md={2}>LOGIN</Col>
      </Row>
    </Container>
  );
};

export default Header;
