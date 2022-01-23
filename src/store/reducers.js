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
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  LOADING_ADVERT,
  ADVERT_LOADED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  CREATE_AD_REQUEST,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAILURE,
  DELETE_AD_REQUEST,
  DELETE_AD_SUCCESS,
  DELETE_AD_FAILURE,
} from "./types";

export const defaultState = {
  auth: true,
  adverts: {
    advertLoaded: null,
    needsUpdate: false,
    isDeleting: false,
    loaded: false,
    data: [],
  },
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
    case DELETE_AD_REQUEST:
      return { isLoading: true, error: { msg: "", show: false } };
    case AUTH_LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
    case ADVERT_LOADED_SUCCESS:
    case CREATE_AD_SUCCESS:
    case DELETE_AD_SUCCESS:
      return { isLoading: false, error: { msg: "", show: false } };
    // TODO: Caso errores al cargar anuncios
    case AUTH_LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case ADVERTS_LOADED_FAILURE:
    case ADVERT_LOADED_FAILURE:
    case CREATE_AD_FAILURE:
    case DELETE_AD_FAILURE:
      return { isLoading: false, error: { msg: action.payload, show: true } };
    case UI_RESET_ERROR:
      return { ...uiState, error: { msg: "", show: false } };
    default:
      return uiState;
  }
};

export const adverts = (advertsState = defaultState.adverts, action) => {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return {
        advertLoaded: null,
        isDeleting: false,
        needsUpdate: false,
        loaded: true,
        data: action.payload,
      };
    case ADVERT_LOADED_SUCCESS:
      return {
        ...advertsState,
        advertLoaded: action.payload,
      };
    case CREATE_AD_SUCCESS:
      return {
        ...advertsState,
        needsUpdate: true,
        data: [...advertsState.data, action.payload],
      };
    case DELETE_AD_REQUEST:
      return {
        ...advertsState,
        needsUpdate: true,
        isDeleting: true,
      };
    case DELETE_AD_SUCCESS:
      return { ...advertsState, isDeleting: false, needsUpdate: true };
    default:
      return advertsState;
  }
};
