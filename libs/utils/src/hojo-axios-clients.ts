import { HttpException, RequestTimeoutException, ServiceUnavailableException } from "@nestjs/common";

import * as dotenvConf from "dotenv";
import axios, { AxiosInstance } from "axios";

dotenvConf.config();

const {
  USER_SERVICE_HOST,
  USER_SERVICE_PORT,
  BIBLE_SERVICE_HOST,
  BIBLE_SERVICE_PORT,
  GAME_SERVICE_HOST,
  GAME_SERVICE_PORT,
} = process.env;

const api = (baseUrl: string, token = ""): AxiosInstance => {
  const api = axios.create();
  api.defaults.baseURL = baseUrl;
  if (token) api.defaults.headers.common = { Authorization: `bearer ${token}` };

  api.interceptors.response.use(
    (res) => {
      Object.assign(res, { ...res.data });
      return res.data;
    },
    (err) => {
      const { message, code, response: rawResponse = {} } = err;
      const response = { status: rawResponse.status, data: rawResponse.data, headers: rawResponse.headers };

      if (err.code === "ETIMEDOUT") return Promise.reject(new RequestTimeoutException());
      if (err.code === "ECONNABORTED") return Promise.reject(new RequestTimeoutException());
      if (err.code === "ECONNREFUSED") return Promise.reject(new ServiceUnavailableException());

      return Promise.reject(new HttpException(err.response?.data, err.response?.status));
    }
  );
  return api;
};

export const genericHttpConsumer = () => {
  return api("");
};

export const userServiceConsumer = () => {
  return api(`http://${USER_SERVICE_HOST}:${USER_SERVICE_PORT}`);
};

export const bibleServiceConsumer = () => {
  return api(`http://${BIBLE_SERVICE_HOST}:${BIBLE_SERVICE_PORT}`);
};

export const gameServiceConsumer = () => {
  return api(`http://${GAME_SERVICE_HOST}:${GAME_SERVICE_PORT}`);
};
