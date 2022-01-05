import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]:
        e.target.name !== "checkbox" ? e.target.value : e.target.checked,
    });
  };

  return [formValues, handleChange];
};
