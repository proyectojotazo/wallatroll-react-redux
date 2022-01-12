import requestServices from "./requestServices";
import customAlerts from "./../utils/customAlerts";

const DEFAULT_URI = "api/v1/adverts";

const adsServices = {
  createAd: async (data) => {
    try {
      const adCreated = await requestServices.post(DEFAULT_URI, data);
      await customAlerts.successNewAdvertCreated();
      return adCreated.id;
    } catch (error) {
      console.error(error);
    }
  },
  getAds: async () => {
    return await requestServices.get(DEFAULT_URI);
  },
  getAd: async (id) => {
    return await requestServices.get(`${DEFAULT_URI}/${id}`);
  },
  deleteAd: async (id) => {
    const result = await customAlerts.askDeleteAd();
    if (result.isConfirmed) {
      try {
        await requestServices.delete(`${DEFAULT_URI}/${id}`);
        await customAlerts.successDeleteAd();
      } catch (error) {
        console.error(error);
      }
    }
    return;
  },
  getTags: async () => {
    return await requestServices.get(`${DEFAULT_URI}/tags`);
  },
};

export default adsServices;
