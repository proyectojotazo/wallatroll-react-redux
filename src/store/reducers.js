import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./types";

const defaultState = {
  auth: true,
  ui: {
    isLoading: false,
    error: { msg: "", show: false },
  },
};

export const auth = (authState = defaultState.auth, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return authState;
  }
};

export const ui = (uiState = defaultState.ui, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: { msg: "", show: false } };
    case AUTH_LOGIN_SUCCESS:
      return { isLoading: false, error: { msg: "", show: false } };
    case AUTH_LOGIN_FAILURE:
      return { isLoading: false, error: { msg: action.payload , show: true } };
    case UI_RESET_ERROR:
      return { ...uiState, error: { msg: "", show: false } };
    default:
      return uiState;
  }
};
