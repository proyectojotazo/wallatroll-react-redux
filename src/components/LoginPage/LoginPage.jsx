import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import ErrorMsg from "../common/ErrorMsg";

import "./LoginPage.css";

import { authLogin, uiResetError } from "../../store/actions";
import { getUi } from "../../store/selectors";
import { useForm } from './../../hooks/useForm';

const LoginPage = ({ onLogin, onResetError, isLoading, error }) => {
  const [formValues, handleChange] = useForm({
    email: "",
    password: "",
    checkbox: false,
  });

  const { email, password, checkbox: remember } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

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
                name="email"
                placeholder="Enter email"
                value={email}
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
                name="password"
                placeholder="Password"
                value={password}
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
                name="checkbox"
                label="Remember me"
                checked={remember}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            {error.show && (
              <ErrorMsg
                onClick={onResetError}
                msg={!!error.msg.server ? error.msg.server : error.msg}
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
  return getUi(state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (credentials) => dispatch(authLogin(credentials)),
    onResetError: () => dispatch(uiResetError()),
  };
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;
