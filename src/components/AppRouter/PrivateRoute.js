import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { getIsLogged } from "../../store/selectors";

const PrivateRoute = ({ isLogged, ...props }) => {
  const location = useLocation();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      <Redirect
        to={{ pathname: "/login", state: { from: location } }}
      />
    </Route>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  }
};

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default ConnectedPrivateRoute;