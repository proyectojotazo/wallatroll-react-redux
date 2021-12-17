import client from './client'

const requestServices = {
  post: async (path, data) => {
    return await client.post(path, data)
  }
}

export default requestServices