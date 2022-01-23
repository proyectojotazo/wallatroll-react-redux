import { connect } from "react-redux";
import { getIsLogged } from "../store/selectors";

import { PrivateRoute } from "../components";

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const PrivateRouteContainer = connect(mapStateToProps)(PrivateRoute);

export default PrivateRouteContainer


