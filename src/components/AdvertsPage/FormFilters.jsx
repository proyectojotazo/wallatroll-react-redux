import { Form, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { useTags } from "./../../hooks/useTags";

import MyRange from "./MyRange";

const FormFilters = ({ filters, setFilters, prices }) => {
  const tagsFetched = useTags();

  const { name, sale, price, tags } = filters;

  // Redondeamos para que no haya problemas con STEP de MyRange
  const maxPrice = Math.round(Math.max(...prices));

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target;
      const newTags = checked
        ? [...tags, name]
        : tags.filter((tag) => tag !== name);
      setFilters((prevFilters) => ({ ...prevFilters, tags: newTags }));
      return;
    }
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handlePrice = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, price: value }));
  };

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, price: [0, maxPrice] }));
  }, [maxPrice, setFilters]);

  return (
    <Form>
      <Form.Group
        as={Row}
        className="mb-1 p-1 align-items-center"
        controlId="formHorizontalName"
      >
        <Col md={3}>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter advert name to search..."
          />
        </Col>
        <Col md={2} className="d-flex justify-content-evenly">
          <Form.Check
            type="radio"
            name="sale"
            label="Sell"
            id="Sell"
            onChange={handleChange}
            value="true"
            checked={sale === "true"}
          />
          <Form.Check
            type="radio"
            name="sale"
            label="Buy"
            id="Buy"
            onChange={handleChange}
            value="false"
            checked={sale === "false"}
          />
          <Form.Check
            type="radio"
            name="sale"
            label="All"
            id="All"
            onChange={handleChange}
            value="all"
            checked={sale === "all"}
          />
        </Col>
        <Col md={4} className="d-flex flex-column align-items-center">
          <MyRange max={maxPrice} value={price} onChange={handlePrice} />
        </Col>
        <Col md={3} className="d-flex justify-content-evenly">
          {tagsFetched.map((tag, i) => (
            <Form.Check
              onChange={handleChange}
              key={i}
              type="checkbox"
              name={tag}
              label={tag}
              id={tag}
            />
          ))}
        </Col>
      </Form.Group>
    </Form>
  );
};

FormFilters.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.string,
    sale: PropTypes.string,
    price: PropTypes.arrayOf(PropTypes.number),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  prices: PropTypes.arrayOf(PropTypes.number),
};

export default FormFilters;
