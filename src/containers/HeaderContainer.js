import { connect } from "react-redux";
import { getIsLogged } from "../store/selectors";
import { authLogout } from "../store/actions/auth";
import { uiResetError } from "../store/actions/ui";

import Header from "../components/Layout/Header";

const mapStateProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (e) => {
      e.preventDefault();
      dispatch(authLogout());
    },
    resetErrors: () => dispatch(uiResetError()),
  };
};

const HeaderContainer = connect(mapStateProps, mapDispatchToProps)(Header);

export default HeaderContainer;
