import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  LOGIN_UI_RESET_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_UI_RESET_ERROR,
  AUTH_LOGOUT,
} from "./types";

const defaultState = {
  auth: true,
  loginUi: {
    isLoading: false,
    error: { msg: "", show: false },
  },
  registerUi: {
    isLoading: false,
    error: {
      msg: {
        name: "",
        username: "",
        email: "",
        password: "",
        server: "",
      },
      show: false,
    },
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

export const loginUi = (loginUiState = defaultState.loginUi, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: { msg: "", show: false } };
    case AUTH_LOGIN_SUCCESS:
      return { isLoading: false, error: { msg: "", show: false } };
    case AUTH_LOGIN_FAILURE:
      return { isLoading: false, error: { msg: action.payload, show: true } };
    case LOGIN_UI_RESET_ERROR:
      return { ...loginUiState, error: { msg: "", show: false } };
    default:
      return loginUiState;
  }
};

export const registerUi = (
  registerUiState = defaultState.registerUi,
  action
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        isLoading: true,
        error: {
          msg: {
            name: "",
            username: "",
            email: "",
            password: "",
          },
          show: false,
        },
      };
    case REGISTER_SUCCESS:
      return {
        isLoading: false,
        error: {
          msg: {
            name: "",
            username: "",
            email: "",
            password: "",
          },
          show: false,
        },
      };
    case REGISTER_FAILURE:
      return { isLoading: false, error: { msg: action.payload, show: true } };
    case REGISTER_UI_RESET_ERROR:
      return {
        ...registerUiState,
        error: {
          msg: {
            name: "",
            username: "",
            email: "",
            password: "",
          },
          show: false,
        },
      };
    default:
      return registerUiState;
  }
};
