import axios from "axios";
import systemConfig from '@/config/system/index.js'

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const createApiClient = (baseURL) => {
  axios.defaults.headers = commonConfig
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.response.use(async (response) => {
    const config = response.config
    if (config.url.indexOf('/login') >= 0 || config.url.indexOf('/refresh-token') >= 0) {
      return response
    }

    const { code, message } = response.data
    if (code && code === 401) {
      if (message && (message === 'jwt expired' || message === 'jwt required')) {
        try {
          await refreshToken()
          return instance(config)
        }
        catch (err) {
          console.log("An error occured while refreshing token")
          console.log(err)
        }
      }
    }
    return response
  }, err => {
    return Promise.reject(err)
  })

  return instance
};

async function refreshToken() {
  const api = createApiClient(`/${systemConfig.apiPrefix}/${systemConfig.adminPrefix}/auth`)
  return (await api.patch('/refresh-token')).data
}

export default createApiClient
