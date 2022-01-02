import requestServices from "./requestServices";

const adsServices = {
  createAd: async (data, history) => {
    const adCreated = await requestServices.post("api/v1/adverts", data);
    const { id } = adCreated
    history.replace(`/advert/${id}`)
  },
  getAds: async () => {
    return await requestServices.get("api/v1/adverts")
  }, 
  getAd: async (id) => {
    return await requestServices.get(`api/v1/adverts/${id}`)
  },
  deleteAd: async (id) => {
    return await requestServices.delete(`api/v1/adverts/${id}`)
  }
};

export default adsServices;
