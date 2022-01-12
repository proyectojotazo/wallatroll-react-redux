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
  LOADING_ADVERT,
  ADVERT_LOADED_SUCCESS,
  CREATE_AD_REQUEST,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAILURE,
} from "./types";

const defaultState = {
  auth: true,
  adverts: [],
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
    case REGISTER_REQUEST:
    case LOADING_ADVERTS:
    case LOADING_ADVERT:
    case CREATE_AD_REQUEST:
      return { isLoading: true, error: { msg: "", show: false } };
    case AUTH_LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case ADVERTS_LOADED:
    case ADVERT_LOADED_SUCCESS:
    case CREATE_AD_SUCCESS:
      return { isLoading: false, error: { msg: "", show: false } };
    // TODO: Caso errores al cargar anuncios
    case AUTH_LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case CREATE_AD_FAILURE:
      return { isLoading: false, error: { msg: action.payload, show: true } };
    case UI_RESET_ERROR:
      return { ...uiState, error: { msg: "", show: false } };
    default:
      return uiState;
  }
};

export const adverts = (advertsState = defaultState.adverts, action) => {
  switch (action.type) {
    case ADVERTS_LOADED:
      return action.payload;
    default:
      return advertsState;
  }
};
