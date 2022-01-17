import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getIsLogged } from "../../store/selectors";

const PrivateRoute = ({ isLogged, ...props }) => {
  const { location } = props;
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: location } }} />
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default ConnectedPrivateRoute;
