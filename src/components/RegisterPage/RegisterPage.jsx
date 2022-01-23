import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

import ErrorMsg from "../common/ErrorMsg";

import { useForm } from "./../../hooks/useForm";

const RegisterPage = ({ onRegister, onResetError, isLoading, error }) => {
  const {
    email: emailErr,
    password: passwordErr,
    username: usernameErr,
    name: nameErr,
    server: serverErr,
  } = error?.msg || [];

  const [formValues, handleChange, handleSubmit] = useForm(
    {
      email: "",
      password: "",
      username: "",
      name: "",
    },
    onRegister
  );

  const { email, password, username, name } = formValues;

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form
            className="login-page-form"
            onSubmit={handleSubmit(formValues)}
            noValidate
          >
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

RegisterPage.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onResetError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    msg: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string,
        password: PropTypes.string,
        server: PropTypes.string,
      }),
    ]),
    show: PropTypes.bool.isRequired,
  }),
};

export default RegisterPage;
