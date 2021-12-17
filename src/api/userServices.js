import requestServices from "./requestServices";

import { setAuthorizationHeader } from "./client";

import storage from "../utils/storage";

const userServices = {
  login: async (data, saveUser) => {

    const { accessToken } = await requestServices.post('/api/auth/login', data)

    setAuthorizationHeader(accessToken)

    if (saveUser){
      storage.set('token', accessToken)
    }
  }
}

export default userServices