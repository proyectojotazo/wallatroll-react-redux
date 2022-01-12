import { useState } from "react";
import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";

import { useTags } from "./../../hooks/useTags";
import { useDispatch, useSelector } from "react-redux";

import { createAd } from "../../store/actions/adverts";
import { getUi } from "./../../store/selectors";

const parseTags = (data, tags) => {
  const tagIncluded = data.get("tags"); // Obtenemos el tag que ha sido incluido en el FormData
  const tagsToAppend = tags.filter((tag) => tag !== tagIncluded); // Obtenemos de los tags del estado los tags que no sean el tag ya incluido
  data.append("tags", tagsToAppend); // Añadimos los tags restantes al FormData
};

const NewAdvertPage = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(getUi);

  const [formValues, setFormValues] = useState({
    name: "",
    sale: "true",
    tags: [],
    price: "",
    photo: null,
  });

  const tags = useTags();

  const [tagSelected, setTagSelected] = useState("lifestyle");

  const handleTag = (e) => setTagSelected(e.target.value);

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

    parseTags(data, formValues.tags);

    dispatch(createAd(data));
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

  const buttonDisabled =
    formValues.name === "" ||
    formValues.price === "" ||
    formValues.tags.length === 0 ||
    isLoading;

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
              {tags.map((tag, i) => (
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
          className="d-block mx-auto"
          disabled={buttonDisabled}
        >
          {isLoading ? (
            <>
              Loading...
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </>
          ) : (
            "Send"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default NewAdvertPage;
