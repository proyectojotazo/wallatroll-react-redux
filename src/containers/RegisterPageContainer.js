import { connect } from "react-redux";
import { getUi } from "../store/selectors";
import { register } from "../store/actions/register";
import { uiResetError } from "../store/actions/ui";

import { RegisterPage } from "../components";

const mapStateToProps = (state) => {
  return getUi(state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (credentials) => dispatch(register(credentials)),
    onResetError: () => dispatch(uiResetError()),
  };
};

const RegisterPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

export default RegisterPageContainer;
