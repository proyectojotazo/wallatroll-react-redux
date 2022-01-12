import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
} from "./../types";

import handleError from "../../utils/errorHandler";
import customAlerts from "../../utils/customAlerts";

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

export const authLogoutRequest = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const authLogin = (credentials) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(authLoginRequest());
    try {
      await api.userServices.login(credentials);
      await customAlerts.successLogin();
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
    const result = await customAlerts.askLogout();
    if (result.isConfirmed) {
      await customAlerts.successLogout();
      dispatch(authLogoutRequest());
      try {
        await api.userServices.logout();
      } catch (error) {
        console.error(error);
      }
    }
  };
};
