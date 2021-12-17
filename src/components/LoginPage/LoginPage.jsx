/**
 * - Formulario con inputs para recoger email y password del usuario. (HECHO)
   - Checkbox “Recordar contraseña” mediante el que indicaremos que 
     guardamos en el localStorage el hecho de que hay un usuario logado, 
     evitando tener que introducir credenciales en cada visita al sitio 
     (pensad la información mínima que os interesea guardar). (HECHO?)
 */

import React from "react";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import ErrorMsg from "../common/ErrorMsg";

import userServices from "../../api/userServices";

import "./LoginPage.css";

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    checkbox: false,
  });
  const [showErr, setShowErr] = useState({ msg: "", show: false });

  const handleChange = (e) => {
    setShowErr({ msg: "", show: false });
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
    };

    try {
      await userServices.login(userToLog, remember);
      if (remember) {
        console.log("logeado correctamente con token");
      } else {
        console.log("logeado correctamente sin token");
      }
    } catch (error) {
      // 401 Unauthorized
      console.error(error.status);
      if (error.status === 401) {
        setShowErr({ msg: "Unauthorized user", show: true });
      }
    }
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
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-center"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="Check me out"
                checked={formValues.checkbox}
                onChange={handleChange}
              />
            </Form.Group>
            {showErr.show && <ErrorMsg msg={showErr.msg} />}
            <Button variant="primary" type="submit" className="d-block mx-auto">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
