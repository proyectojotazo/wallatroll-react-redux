import { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";

import { useTags } from "./../../hooks/useTags";

const TagsHandler = ({ formTags, setFormValues }) => {
  const tags = useTags();

  const [tagSelected, setTagSelected] = useState("lifestyle");

  const handleTag = (e) => setTagSelected(e.target.value);

  const addTag = () => {
    setFormValues((prevValues) => {
      return !prevValues.tags.includes(tagSelected)
        ? { ...prevValues, tags: [...prevValues.tags, tagSelected] }
        : { ...prevValues };
    });
  };

  const removeTag = () => {
    setFormValues((prevValues) => {
      return prevValues.tags.includes(tagSelected)
        ? {
            ...prevValues,
            tags: prevValues.tags.filter((tag) => tag !== tagSelected),
          }
        : { ...prevValues };
    });
  };

  return (
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
      <ul className="mt-2 text-center p-0 pb-2 border-bottom">Tags Selected</ul>
      {formTags.length !== 0 ? (
        formTags.map((tag, i) => (
          <li key={i} className="text-center list-unstyled">
            {tag}
          </li>
        ))
      ) : (
        <p className="text-center">No Tags Selected</p>
      )}
    </Col>
  );
};

export default TagsHandler;
