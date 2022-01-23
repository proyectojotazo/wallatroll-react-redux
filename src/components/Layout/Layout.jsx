import { Container, Row } from "react-bootstrap";
import PropTypes from 'prop-types'

import "./Layout.css";
import HeaderContainer from './../../containers/HeaderContainer';

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <HeaderContainer/>
      </Row>
      <Row className="layout-row-children">{children}</Row>
      <Row>
        <footer className="layout-footer">© 2021 Javier Guerrero</footer>
      </Row>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.element
}

export default Layout;
