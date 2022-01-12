
import {
  UI_RESET_ERROR,
  LOADING_ADVERTS,
  ADVERTS_LOADED,
  LOADING_ADVERT,
  ADVERT_LOADED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  CREATE_AD_REQUEST,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAILURE,
} from "../types";

import { getAdverts } from './../selectors';

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

export const loadingAdvert = () => {
  return {
    type: LOADING_ADVERT,
  };
};

export const advertLoaded = () => {
  return {
    type: ADVERT_LOADED_SUCCESS,
  };
};

export const createAdRequest = () => {
  return {
    type: CREATE_AD_REQUEST,
  };
};
export const createAdSuccess = () => {
  return {
    type: CREATE_AD_SUCCESS,
  };
};
export const createAdFailure = () => {
  return {
    type: CREATE_AD_FAILURE,
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

export const getAd = (id) => {
  return async (dispatch, getState, { api }) => {
    // dispatch loadingAdvert
    const adverts = getAdverts(getState())
    console.log(adverts)
    try {
      
    } catch (error) {}
  };
};

export const createAd = (data) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(createAdRequest());
    try {
      const id = await api.adsServices.createAd(data);
      dispatch(createAdSuccess());
      history.replace(`/advert/${id}`);
    } catch (error) {
      dispatch(createAdFailure());
    }
  };
};
