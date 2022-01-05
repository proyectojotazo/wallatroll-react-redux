import requestServices from "./requestServices";
import customAlerts from "./../utils/customAlerts";

const adsServices = {
  createAd: async (data, history) => {
    try {
      const adCreated = await requestServices.post("api/v1/adverts", data);
      await customAlerts.successNewAdvertCreated();
      const { id } = adCreated;
      history.replace(`/advert/${id}`);
    } catch (error) {
      console.error(error);
    }
  },
  getAds: async () => {
    return await requestServices.get("api/v1/adverts");
  },
  getAd: async (id) => {
    return await requestServices.get(`api/v1/adverts/${id}`);
  },
  deleteAd: async (id, history) => {
    const result = await customAlerts.askDeleteAd();
    if (result.isConfirmed) {
      try {
        await requestServices.delete(`api/v1/adverts/${id}`);
        await customAlerts.successDeleteAd();
        history.replace("/adverts")
      } catch (error) {
        console.error(error)
      }
    }
    return
  },
  getTags: async () => {
    return await requestServices.get("api/v1/adverts/tags");
  },
};

export default adsServices;
