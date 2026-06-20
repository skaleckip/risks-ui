import axios from "axios";
import { makeUseAxios, type UseAxios } from "axios-hooks";
import keycloak from "~/keycloak";

export const useNormanAxios = makeUseNormanAxios();

function makeUseNormanAxios(): UseAxios {
  const baseURL = encodeURI("http://localhost:8080/api");
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

  // Todo, How about default options (retries, cache,...)?
  return makeUseAxios({
    axios: axiosInstance,
  });
}
