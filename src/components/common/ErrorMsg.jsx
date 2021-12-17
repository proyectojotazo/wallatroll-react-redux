import React from "react";

import { Alert } from "react-bootstrap";

const ErrorMsg = ({ msg }) => {
  return (
    <Alert variant="danger">
      {msg}
    </Alert>
  );
};

export default ErrorMsg;
