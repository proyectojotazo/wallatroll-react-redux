import { useState } from "react";

export const useForm = (initialValues = {}, submitFunc) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]:
        e.target.name !== "checkbox" ? e.target.value : e.target.checked,
    });
  };

  // Prueba de closure
  const handleSubmit = values => async (e) => {
    e.preventDefault()

    await submitFunc(values)
  }

  return [formValues, handleChange, handleSubmit];
};
