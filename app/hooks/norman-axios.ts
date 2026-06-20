import axios from "axios";
import { makeUseAxios, type UseAxios } from "axios-hooks";
import keycloak from "~/keycloak";

export const useNormanAxios = makeUseNormanAxios();

function makeUseNormanAxios(): UseAxios {
  const defaultURL = "http://localhost:8080/api";
  const baseURL = encodeURI(import.meta.env.API_BASE_URL ?? defaultURL);
  const axiosInstance = axios.create({ baseURL });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.authorization =
        keycloak.didInitialize
          ? `Bearer ${keycloak.token ?? ''}`
          : undefined
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  return makeUseAxios({
    axios: axiosInstance,
    defaultOptions: {
      ssr: false,
    }
  });
}
