import createApiClient from "../api.service";
import systemConfig from '@/config/system/index.js'

class CategoryService {
  constructor(baseUrl=`/${systemConfig.apiPrefix}/${systemConfig.adminPrefix}/categories`) {
    this.api = createApiClient(baseUrl);
  }
  
  async getAll(options={}) {
    return (await this.api.get("/", options)).data;
  }

  async getCategoriesOfProduct(id) {
    return (await this.api.get(`/product/${id}`)).data;
  }

  // async getCategoryBySlug(slug) {
  //   return (await this.api.get(`/${slug}`)).data;
  // }
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

export default new CategoryService();
