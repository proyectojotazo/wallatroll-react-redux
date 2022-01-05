import { useState, useEffect } from "react"
import adsServices from './../api/adsServices';

export const useAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Dispatch Async?
    adsServices
      .getAds()
      .then(setAds)
      .catch((err) => console.error(err));
  }, []);

  return ads
}