import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Row, Col, Image, Navbar } from "react-bootstrap";

import { getIsLogged } from "../../store/selectors";
import { authLogout, uiResetError } from "../../store/actions";

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

const mapStateProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (e) => {
      e.preventDefault();
      dispatch(authLogout());
    },
    resetErrors: () => dispatch(uiResetError()),
  };
};

const ConnectedHeader = connect(mapStateProps, mapDispatchToProps)(Header);

export default ConnectedHeader;
