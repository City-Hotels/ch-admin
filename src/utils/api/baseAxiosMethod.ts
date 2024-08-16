import axios from "axios";

import { baseURL } from "../constants";

const baseAxiosMethod = axios.create({
  baseURL
});

baseAxiosMethod.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      return config;
    }
    const token = localStorage ? localStorage.getItem("CHID") : "";
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default baseAxiosMethod;
