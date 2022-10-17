import { HttpException, ServiceUnavailableException } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

const { USER_SERVICE_HOST, USER_SERVICE_PORT, BIBLE_SERVICE_HOST, BIBLE_SERVICE_PORT } = process.env;

const api = (baseUrl: string, token = ""): AxiosInstance => {
  const api = axios.create();
  api.defaults.baseURL = baseUrl;
  if (token) api.defaults.headers.common = { Authorization: `bearer ${token}` };

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.code === "ECONNREFUSED") return Promise.reject(new ServiceUnavailableException());
      return Promise.reject(new HttpException(err.response?.data, err.response?.status));
    }
  );
  return api;
};

export const userServiceConsumer = () => {
  return api(`http://${USER_SERVICE_HOST}:${USER_SERVICE_PORT}`);
};

export const bibleServiceConsumer = () => {
  return api(`http://${BIBLE_SERVICE_HOST}:${BIBLE_SERVICE_PORT}`);
};
