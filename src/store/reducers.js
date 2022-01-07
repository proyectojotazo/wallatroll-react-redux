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

const defaultState = {
  auth: true,
  ads: [],
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
      return { isLoading: false, error: { msg: action.payload, show: true } };
    case REGISTER_REQUEST:
      return { isLoading: true, error: { msg: "", show: false } };
    case REGISTER_SUCCESS:
      return { isLoading: false, error: { msg: "", show: false } };
    case REGISTER_FAILURE:
      return { isLoading: false, error: { msg: action.payload, show: true } };
    case LOADING_ADVERTS:
      return { isLoading: true, error: { msg: "", show: false } };
    case ADVERTS_LOADED:
      return { isLoading: false, error: { msg: "", show: false } };
    // Caso errores al cargar anuncios
    case UI_RESET_ERROR:
      return { ...uiState, error: { msg: "", show: false } };
    default:
      return uiState;
  }
};

export const adverts = (advertsState = defaultState.ads, action) => {
  switch (action.type) {
    case ADVERTS_LOADED:
      return { ads: action.payload };
    default:
      return advertsState;
  }
};
