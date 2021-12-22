import requestServices from "./requestServices";

import { setAuthorizationHeader, removeAuthorizationHeader } from "./client";

import storage from "../utils/storage";

const userServices = {
  login: async (data) => {

    const { remember } = data

    const { accessToken } = await requestServices.post('/api/auth/login', data)

    setAuthorizationHeader(accessToken)

    if (remember){
      storage.set('token', accessToken)
    }
  },
  logout: async () => {
    await Promise.resolve()
    removeAuthorizationHeader()
    storage.remove('token')
  }
}

export default userServices