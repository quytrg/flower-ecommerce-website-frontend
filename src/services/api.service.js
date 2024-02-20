import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default (baseURL) => {
  axios.defaults.headers = commonConfig
  return axios.create({
    baseURL
  });
};
