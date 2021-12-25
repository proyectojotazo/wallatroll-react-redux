import { useState } from "react";

import { connect } from "react-redux";

import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

import ErrorMsg from "../common/ErrorMsg";

import { getRegisterUi } from "../../store/selectors";
import { register, registerUiResetError } from "../../store/actions";

const RegisterPage = ({ onRegister, onResetError, isLoading, error }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, username, name } = formValues;

    const userToRegister = {
      email,
      password,
      username,
      name,
    };

    await onRegister(userToRegister)
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="login-page-form" onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formValues.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {(error.show && error.msg.name) && <ErrorMsg onClick={onResetError} msg={error.msg.name} />}
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formValues.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {(error.show && error.msg.username) && <ErrorMsg onClick={onResetError} msg={error.msg.username} />}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formValues.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Text className="text-muted text-center d-block mb-2">
                We'll never share your email with anyone else.
              </Form.Text>
              {(error.show && error.msg.email) && <ErrorMsg onClick={onResetError} msg={error.msg.email} />}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {(error.show && error.msg.password) && <ErrorMsg onClick={onResetError} msg={error.msg.password} />}
            
            {/* En caso de no conectar con el servidor */}
            {(error.show && typeof error.msg === "string")  && <ErrorMsg onClick={onResetError} msg={error.msg} />}
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
                "Register"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return getRegisterUi(state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (credentials) => dispatch(register(credentials)),
    onResetError: () => dispatch(registerUiResetError()),
  };
};

const ConnectedRegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

export default ConnectedRegisterPage;
