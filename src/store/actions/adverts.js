import {
  UI_RESET_ERROR,
  LOADING_ADVERTS,
  ADVERTS_LOADED_SUCCESS,
  LOADING_ADVERT,
  ADVERT_LOADED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  CREATE_AD_REQUEST,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAILURE,
  DELETE_AD_REQUEST,
  DELETE_AD_SUCCESS,
  DELETE_AD_FAILURE,
} from "../types";

import { getAdverts, getNeedsUpdate, getAdvertById } from "./../selectors";
import customAlerts from "./../../utils/customAlerts";

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

export const advertsLoadedSuccess = (adverts) => {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
  };
};

export const loadingAdvert = () => {
  return {
    type: LOADING_ADVERT,
  };
};

export const advertLoadedSuccess = (advert) => {
  return {
    type: ADVERT_LOADED_SUCCESS,
    payload: advert,
  };
};

export const advertLoadedFailure = (error) => {
  return {
    type: ADVERT_LOADED_FAILURE,
    payload: error.message,
  };
};

export const createAdRequest = () => {
  return {
    type: CREATE_AD_REQUEST,
  };
};
export const createAdSuccess = (advert) => {
  return {
    type: CREATE_AD_SUCCESS,
    payload: advert,
  };
};
export const createAdFailure = (error) => {
  return {
    type: CREATE_AD_FAILURE,
    payload: error,
  };
};

export const deleteAdRequest = () => {
  return {
    type: DELETE_AD_REQUEST,
  };
};
export const deleteAdSuccess = () => {
  return {
    type: DELETE_AD_SUCCESS,
  };
};
export const deleteAdFailure = (error) => {
  return {
    type: DELETE_AD_FAILURE,
    payload: error,
  };
};

export const getAds = () => {
  return async (dispatch, getState, { api }) => {
    dispatch(loadingAdverts());
    const adverts = getAdverts(getState());
    const needsUpdate = getNeedsUpdate(getState());
    if (adverts.length && !needsUpdate) {
      // Si tenemos anuncios en el estado, no hacemos la peticion al api
      dispatch(advertsLoadedSuccess(adverts));
      return;
    }
    try {
      const ads = await api.adsServices.getAds();
      dispatch(advertsLoadedSuccess(ads));
    } catch (error) {
      //TODO: Manejar errores
      console.error(error);
    }
  };
};

export const getAd = (id) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(loadingAdvert());
    const adverts = getAdverts(getState());
    if (adverts.length) {
      const advert = getAdvertById(getState(), id);
      dispatch(advertLoadedSuccess(advert));
      return;
    }
    try {
      const advert = await api.adsServices.getAd(id);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      console.log(error);
      dispatch(advertLoadedFailure(error));
      if (error.status === 404) {
        history.replace("/404");
      }
    }
  };
};

export const createAd = (data) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(createAdRequest());
    try {
      const ad = await api.adsServices.createAd(data);
      dispatch(createAdSuccess(ad));
      await customAlerts.successNewAdvertCreated();
      history.replace(`/advert/${ad.id}`);
    } catch (error) {
      console.log(error);
      dispatch(createAdFailure());
    }
  };
};

export const deleteAd = (id) => {
  return async (dispatch, getState, { api, history }) => {
    const result = await customAlerts.askDeleteAd();
    if (result.isConfirmed) {
      dispatch(deleteAdRequest());
      try {
        await api.adsServices.deleteAd(id);
        await customAlerts.successDeleteAd();
        dispatch(deleteAdSuccess());
        history.replace("/adverts");
      } catch (error) {
        dispatch(deleteAdFailure());
        console.error(error);
        if (error.status === 404) {
          history.replace("/404");
        }
      }
    }
  };
};
