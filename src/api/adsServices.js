import requestServices from "./requestServices";

const adsServices = {
  createAd: async (data, history) => {
    const adCreated = await requestServices.post("api/v1/adverts", data);
    const { id } = adCreated
    history.replace(`/advert/${id}`)
  },
};

export default adsServices;
