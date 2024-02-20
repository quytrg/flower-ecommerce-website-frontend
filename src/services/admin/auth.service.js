import createApiClient from "../api.service";
import systemConfig from '@/config/system/index.js'

class AuthService {
  constructor(baseUrl=`/${systemConfig.apiPrefix}/${systemConfig.adminPrefix}/auth`) {
    this.api = createApiClient(baseUrl);
  }
  
  async login(account) {
    return (await this.api.post("/login", account)).data;
  }

}

export default new AuthService();
