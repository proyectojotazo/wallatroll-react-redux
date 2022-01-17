import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../types";

import handleError from "../../utils/errorHandler";
import customAlerts from "../../utils/customAlerts";

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
    payload: error.message,
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
