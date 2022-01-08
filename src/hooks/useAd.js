import { useState, useEffect } from "react";
import adsServices from "./../api/adsServices";
import { useDispatch } from 'react-redux';
import { loadingAdvert, advertLoaded } from './../store/actions';

export const useAd = (id) => {
  const [ad, setAd] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadingAdvert())
    adsServices
      .getAd(id)
      .then(ad => {
        dispatch(advertLoaded())
        setAd(ad)
      })
      .catch((err) => console.error(err));
  }, [id, dispatch]);

  return ad;
};
