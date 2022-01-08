import { useEffect } from "react";
import { useState } from "react";
import adsServices from "./../api/adsServices";

const getTags = async () => {
  return await adsServices.getTags();
};

export const useTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return tags;
};
