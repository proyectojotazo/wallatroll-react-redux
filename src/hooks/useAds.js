import { useState, useEffect } from "react";
import adsServices from "./../api/adsServices";
import { useDispatch } from "react-redux";
import { loadingAdverts, advertsLoaded } from "./../store/actions";

export const useAds = () => {
  const [ads, setAds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingAdverts());
    adsServices
      .getAds()
      .then((ads) => {
        dispatch(advertsLoaded());
        setAds(ads);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return ads;
};
