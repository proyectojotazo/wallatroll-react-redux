import { Alert } from "react-bootstrap";

const ErrorMsg = ({ msg, onClick }) => {
  return (
    <Alert onClick={onClick} variant="danger" className="text-center p-1">
      {msg}
    </Alert>
  );
};

export default ErrorMsg;