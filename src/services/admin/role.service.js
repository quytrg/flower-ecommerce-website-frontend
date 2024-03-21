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

  async create(data) {
    return (await this.api.post(`/`, data)).data;
  }

  async update(id, data) {
    return (await this.api.patch(`/${id}`, data)).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new RoleService();
