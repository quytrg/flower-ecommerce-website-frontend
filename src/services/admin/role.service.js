import createApiClient from "../api.service";
import systemConfig from '@/config/system/index.js'

class RoleService {
  constructor(baseUrl=`/${systemConfig.apiPrefix}/${systemConfig.adminPrefix}/roles`) {
    this.api = createApiClient(baseUrl);
  }
  
  async getAll(options={}) {
    return (await this.api.get("/", options)).data;
  }

  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}

export default new RoleService();
