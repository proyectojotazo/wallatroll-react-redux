import { connect } from "react-redux";
import { LoginPage } from "../components";

import { authLogin } from "../store/actions/auth";
import { uiResetError } from "../store/actions/ui";
import { getUi } from "../store/selectors";


const mapStateToProps = (state) => {
  return getUi(state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (credentials) => dispatch(authLogin(credentials)),
    onResetError: () => dispatch(uiResetError()),
  };
};

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageContainer