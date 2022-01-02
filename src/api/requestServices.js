import client from './client'

const requestServices = {
  post: async (path, data) => {
    return await client.post(path, data)
  },
  get: async (path) => {
    return await client.get(path)
  },
  delete: async (path) => {
    return await client.delete(path)
  }
}

export default requestServices