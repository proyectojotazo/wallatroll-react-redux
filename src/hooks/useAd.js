import { useState, useEffect } from "react";
import adsServices from "./../api/adsServices";
import { useDispatch } from "react-redux";
import { loadingAdvert, advertLoaded } from "./../store/actions";

export const useAd = (id) => {
  const [ad, setAd] = useState([]);
  const [adErr, setAdErr] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingAdvert());
    adsServices
      .getAd(id)
      .then(setAd)
      .catch((err) => setAdErr(err.status))
      .finally(() => dispatch(advertLoaded()));
  }, [id, dispatch]);

  return [ad, adErr];
};
