import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
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
    payload: error.message
  };
};

export const authLogoutRequest = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const uiResetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};

export const authLogin = (credentials) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(authLoginRequest())
    try {
      await api.userServices.login(credentials)
      dispatch(authLoginSuccess())
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(handleError(error)))
    }
  }
}

export const authLogout = () => {
  return async (dispatch, getState, { api }) => {
    dispatch(authLogoutRequest())
    try {
      await api.userServices.logout()
    } catch(error){
      console.error(error)
    }
  }
}
