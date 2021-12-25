import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import adsServices from "../../api/adsServices";

const TAGS = ["lifestyle", "mobile", "motor", "work"];

const NewAdvertPage = () => {
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    name: "",
    sale: "true",
    tags: [],
    price: "",
    photo: null,
  });

  const [tagSelected, setTagSelected] = useState("lifestyle");

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]:
        e.target.name === "photo" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await adsServices.createAd(data, history);
  };

  const addTag = () => {
    if (!formValues.tags.includes(tagSelected)) {
      setFormValues({ ...formValues, tags: [...formValues.tags, tagSelected] });
    }
  };

  const removeTag = () => {
    if (formValues.tags.includes(tagSelected)) {
      setFormValues({
        ...formValues,
        tags: formValues.tags.filter((tag) => tag !== tagSelected),
      });
    }
  };

  const handleTag = (e) => setTagSelected(e.target.value);

  const buttonDisabled =
    formValues.name === "" ||
    formValues.price === "" ||
    formValues.tags.length === 0;

  return (
    <Container>
      <Form className="login-page-form" onSubmit={handleSubmit} noValidate>
        <Row className="justify-content-md-center">
          {/* Left Side */}
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Ad Name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Check
              type="radio"
              name="sale"
              label="sell"
              value="true"
              onChange={handleChange}
              checked={formValues.sale === "true"}
            />
            <Form.Check
              type="radio"
              name="sale"
              label="buy"
              value="false"
              checked={formValues.sale === "false"}
              onChange={handleChange}
            />

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Ad price"
                value={formValues.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control name="photo" type="file" onChange={handleChange} />
            </Form.Group>
          </Col>
          {/* Right Side */}
          <Col md={4}>
            <label htmlFor="formBasicTags" style={{ marginBottom: ".47rem" }}>
              Tags
            </label>
            <Form.Select
              value={tagSelected}
              className="mb-2"
              aria-label="Default select example"
              name="tags"
              id="formBasicTags"
              onChange={handleTag}
            >
              {TAGS.map((tag, i) => (
                <option value={tag} key={i}>
                  {tag}
                </option>
              ))}
            </Form.Select>
            <Button variant="success" onClick={addTag}>
              Add
            </Button>
            <Button className="mx-2" variant="danger" onClick={removeTag}>
              Remove
            </Button>
            <ul className="mt-2 text-center p-0 pb-2 border-bottom">
              Tags Selected
            </ul>
            {formValues.tags.length !== 0 ? (
              formValues.tags.map((tag, i) => (
                <li key={i} className="text-center list-unstyled">
                  {tag}
                </li>
              ))
            ) : (
              <p className="text-center">No Tags Selected</p>
            )}
          </Col>
        </Row>
        <Button
          variant="primary"
          type="submit"
          className="d-block mx-auto my-3"
          disabled={buttonDisabled}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default NewAdvertPage;
