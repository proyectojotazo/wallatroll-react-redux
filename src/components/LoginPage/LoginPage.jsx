import { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import ErrorMsg from "../common/ErrorMsg";

import "./LoginPage.css";

import { authLogin, loginUiResetError } from "../../store/actions";
import { getLoginUi } from "../../store/selectors";

const LoginPage = ({ onLogin, onResetError, isLoading, error }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    checkbox: false,
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.type]:
        e.target.type !== "checkbox" ? e.target.value : e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, checkbox: remember } = formValues;

    const userToLog = {
      email,
      password,
      remember,
    };

    await onLogin(userToLog);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="login-page-form" onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formValues.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Text className="text-muted text-center d-block">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-center"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="Remember me"
                checked={formValues.checkbox}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {error.show && <ErrorMsg onClick={onResetError} msg={error.msg} />}
            <Button
              variant="primary"
              type="submit"
              className="d-block mx-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return getLoginUi(state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (credentials) => dispatch(authLogin(credentials)),
    onResetError: () => dispatch(loginUiResetError()),
  };
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;
