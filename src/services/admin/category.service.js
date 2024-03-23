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

  async create(formData) {
    return (await this.api.post('/', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })).data
  }

  async getOne(id) {
    return (await this.api.get(`/${id}`)).data;
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

export default new CategoryService();
