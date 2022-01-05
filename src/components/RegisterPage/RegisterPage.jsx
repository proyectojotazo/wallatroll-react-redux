import { connect } from "react-redux";

import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

import ErrorMsg from "../common/ErrorMsg";

import { getUi } from "../../store/selectors";
import { register, uiResetError } from "../../store/actions";
import { useForm } from './../../hooks/useForm';

const RegisterPage = ({ onRegister, onResetError, isLoading, error }) => {
  const {
    email: emailErr,
    password: passwordErr,
    username: usernameErr,
    name: nameErr,
    server: serverErr,
  } = error?.msg || [];

  const [formValues, handleChange] = useForm({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  const { email, password, username, name } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userToRegister = {
      email,
      password,
      username,
      name,
    };

    await onRegister(userToRegister);
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
                value={name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {nameErr && <ErrorMsg onClick={onResetError} msg={nameErr} />}
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {usernameErr && (
              <ErrorMsg onClick={onResetError} msg={usernameErr} />
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Text className="text-muted text-center d-block mb-2">
                We'll never share your email with anyone else.
              </Form.Text>
              {emailErr && <ErrorMsg onClick={onResetError} msg={emailErr} />}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {(serverErr || passwordErr) && (
              <ErrorMsg
                onClick={onResetError}
                msg={serverErr ? serverErr : passwordErr}
              />
            )}

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
  return getUi(state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (credentials) => dispatch(register(credentials)),
    onResetError: () => dispatch(uiResetError()),
  };
};

const ConnectedRegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

export default ConnectedRegisterPage;
