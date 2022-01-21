import { useEffect } from "react";
import { useState } from "react";
import adsServices from "./../api/adsServices";

const getTags = async () => {
  return await adsServices.getTags();
};

export const useTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Solo se llama a getTags si el componente está montado
    let mounted = true;

    getTags().then((tags) => {
      if (mounted) {
        setTags(tags);
      }
    });

    return () => (mounted = false);
  }, []);

  return tags;
};
