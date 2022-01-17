import { Alert } from "react-bootstrap";
import PropTypes from 'prop-types'

const ErrorMsg = ({ msg, onClick }) => {
  return (
    <Alert onClick={onClick} variant="danger" className="text-center p-1">
      {msg}
    </Alert>
  );
};

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ErrorMsg;