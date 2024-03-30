import createApiClient from "../api.service";
import systemConfig from '@/config/system/index.js'

class ProductService {
  constructor(baseUrl=`/${systemConfig.apiPrefix}/${systemConfig.adminPrefix}/products`) {
    this.api = createApiClient(baseUrl);
  }
  
  async get(options={}) {
    return (await this.api.get('/', options)).data;
  }

  async changeMulti(data) {
    return (await this.api.patch('/change-multi', data)).data
  }

  async changeStatus(id, data) {
    return (await this.api.patch(`change-status/${id}`, data)).data
  }

  async create(formData) {
    return (await this.api.post('/', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })).data
  }

  async getProductBySlug(slug) {
    return (await this.api.get(`/${slug}`)).data;
  }

  async update(id, formData) {
    return (await this.api.patch(`/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new ProductService();
