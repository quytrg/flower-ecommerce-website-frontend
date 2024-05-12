import createApiClient from "../api.service";
import systemConfig from '@/config/system/index.js'

class ProductService {
  constructor(baseUrl=`/${systemConfig.apiPrefix}/${systemConfig.clientPrefix}/checkout`) {
    this.api = createApiClient(baseUrl);
  }
  
  async createOrder(data) {
    return (await this.api.post("/order", data)).data;
  }
}

export default new ProductService();
