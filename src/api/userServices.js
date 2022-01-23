import { setAuthorizationHeader, removeAuthorizationHeader } from "./client";
import requestServices from "./requestServices";

import storage from "../utils/storage";

const DEFAULT_URI = "/api/auth";

const userServices = {
  login: async (data) => {
    const { checkbox: remember } = data;

    const { accessToken } = await requestServices.post(
      `${DEFAULT_URI}/login`,
      data
    );

    setAuthorizationHeader(accessToken);

    if (remember) {
      storage.set("token", accessToken);
    }
  },

  logout: async () => {
    await Promise.resolve();
    removeAuthorizationHeader();
    storage.remove("token");
  },

  register: async (data) =>
    await requestServices.post(`${DEFAULT_URI}/signup`, data),
};

export default userServices;
