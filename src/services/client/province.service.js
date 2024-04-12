import axios from "axios";

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
  });
  return instance
}

class ProvinceService {
  constructor(baseUrl=`/api`) {
    this.api = createApiClient(baseUrl);
  }
  
  async getProvinces() {
    return (await this.api.get(`/province`)).data;
  }

  async getDistricts(province_id) {
    return (await this.api.get(`/province/district/${province_id}`)).data;
  }

  async getWards(district_id) {
    return (await this.api.get(`/province/ward/${district_id}`)).data;
  }
}

export default new ProvinceService();
