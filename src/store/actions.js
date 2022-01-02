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
  ADVERTS_LOADED,
} from "./types";

import handleError from "../utils/errorHandler";

export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
};

export const authLoginSuccess = () => {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
};

export const authLoginFailure = (error) => {
  return {
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error.message,
  };
};
export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    error: true,
    payload: error.message,
  };
};

export const authLogoutRequest = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const loginUiResetError = () => {
  return {
    type: LOGIN_UI_RESET_ERROR,
  };
};

export const registerUiResetError = () => {
  return {
    type: REGISTER_UI_RESET_ERROR,
  };
};

export const advertsLoaded = (adverts) => {
  return {
    type: ADVERTS_LOADED,
    payload: adverts,
  };
};

export const authLogin = (credentials) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(authLoginRequest());
    try {
      await api.userServices.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(handleError(error)));
    }
  };
};

export const authLogout = () => {
  return async (dispatch, getState, { api }) => {
    dispatch(authLogoutRequest());
    try {
      await api.userServices.logout();
    } catch (error) {
      console.error(error);
    }
  };
};

export const register = (credentials) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(registerRequest());
    try {
      await api.userServices.register(credentials);
      dispatch(registerSuccess());
      history.replace("/login");
    } catch (error) {
      dispatch(registerFailure(handleError(error)));
    }
  };
};
