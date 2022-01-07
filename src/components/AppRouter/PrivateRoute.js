import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getIsLogged } from "../../store/selectors";

const PrivateRoute = ({ isLogged, ...props }) => {
  // TODO: Arreglar warning
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default ConnectedPrivateRoute;
