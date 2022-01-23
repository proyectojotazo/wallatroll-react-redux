import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'

const PrivateRoute = ({ isLogged, ...props }) => {
  const { location } = props;
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: location } }} />
  );
};

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired
}

export default PrivateRoute;
