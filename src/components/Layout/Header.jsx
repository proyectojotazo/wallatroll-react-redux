import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Navbar } from "react-bootstrap";
import PropTypes from "prop-types";

import icon from "../../assets/images/wallaicon-res.png";
import "./Header.css";

const Header = ({ isLogged, onLogout, resetErrors }) => {
  return (
    <Container className="text-center">
      <Row className="header-row">
        <Col md={2}>
          <Image src={icon} />
        </Col>
        <Col md={8}>
          <h1 className="header-title ">WALLATROLL</h1>
        </Col>
        <Col md={2}>
          <Navbar expand="lg" className="header-navbar">
            {isLogged ? (
              <>
                <Link to="/" className="navbar-link-item">
                  Home
                </Link>
                <Link to="/adverts/new" className="navbar-link-item">
                  Create Ad
                </Link>
                <Link onClick={onLogout} to="/" className="navbar-link-item">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={resetErrors}
                  className="navbar-link-item"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={resetErrors}
                  className="navbar-link-item"
                >
                  Register
                </Link>
              </>
            )}
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

export default Header;
