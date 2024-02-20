import createApiClient from "../api.service";
import systemConfig from '@/config/system/index.js'

class AccountService {
  constructor(baseUrl=`/${systemConfig.apiPrefix}/${systemConfig.adminPrefix}/accounts`) {
    this.api = createApiClient(baseUrl);
  }
  
  async get(options={}) {
    return (await this.api.get('/', options)).data;
  }

  async changeStatus(id, data) {
    return (await this.api.patch(`/change-status/${id}`, data)).data
  }

  // async changeMulti(data) {
  //   return (await this.api.patch('/change-multi', data)).data
  // }

  async create(data) {
    return (await this.api.post('/create', data)).data
  }

  async getAccountById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/update/${id}`, data)).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // async create(data) {
  //   return (await this.api.post("/", data)).data;
  // }
  // async deleteAll() {
  //   return (await this.api.delete("/")).data;
  // }
  // async get(id) {
  //   return (await this.api.get(`/${id}`)).data;
  // }
  // async update(id, data) {
  //   return (await this.api.put(`/${id}`, data)).data;
  // }
  // async delete(id) {
  //   return (await this.api.delete(`/${id}`)).data;
  // }
}

export default new AccountService();
