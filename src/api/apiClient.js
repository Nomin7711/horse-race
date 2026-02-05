import { generateXAPISignature } from "api/signature";
import axios from "axios";
import { config } from "config";

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 65000,
});

export const setToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Token ${token}`;
  }
};

export const getAccessToken = () => {
  return apiClient.defaults.headers.common.Authorization?.split(" ")[1];
};

export const setInterceptor = (fn = function () {}, efn = function () {}) => {
  apiClient.interceptors.response.use(fn, efn);
};
