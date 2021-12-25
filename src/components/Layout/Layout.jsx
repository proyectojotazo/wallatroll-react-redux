import { Container, Row } from "react-bootstrap";

import ConnectedHeader from "./Header";

import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <ConnectedHeader />
      </Row>
      <Row className="layout-row-children">{children}</Row>
      <Row>
        <footer className="layout-footer">© 2021 Javier Guerrero</footer>
      </Row>
    </Container>
  );
};

export default Layout;
