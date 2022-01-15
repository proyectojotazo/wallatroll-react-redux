import requestServices from "./requestServices";

const DEFAULT_URI = "api/v1/adverts";

const adsServices = {
  createAd: async (data) => {
    return await requestServices.post(DEFAULT_URI, data);
  },
  getAds: async () => {
    return await requestServices.get(DEFAULT_URI);
  },
  getAd: async (id) => {
    return await requestServices.get(`${DEFAULT_URI}/${id}`);
  },
  deleteAd: async (id) => {
    await requestServices.delete(`${DEFAULT_URI}/${id}`);
  },
  getTags: async () => {
    return await requestServices.get(`${DEFAULT_URI}/tags`);
  },
};

export default adsServices;
