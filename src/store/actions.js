import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  UI_RESET_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_LOGOUT,
  LOADING_ADVERTS,
  ADVERTS_LOADED,
} from "./types";

import handleError from "../utils/errorHandler";
import customAlerts from "./../utils/customAlerts";

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

export const uiResetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};

export const loadingAdverts = () => {
  return {
    type: LOADING_ADVERTS,
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
  return async (dispatch, getState, { api, history }) => {
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

export const register = (credentials) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(registerRequest());
    try {
      await api.userServices.register(credentials);
      dispatch(registerSuccess());
      await customAlerts.successRegister();
      history.replace("/login");
    } catch (error) {
      dispatch(registerFailure(handleError(error)));
    }
  };
};

export const getAds = () => {
  return async (dispatch, getState, { api }) => {
    dispatch(loadingAdverts());
    try {
      const ads = await api.adsServices.getAds();
      dispatch(advertsLoaded(ads));
    } catch (error) {
      //TODO: Manejar errores
      console.error(error);
    }
  };
};
