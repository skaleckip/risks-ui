import { useEffect, useRef } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios, { type AxiosInstance } from "axios";

export const useAxios = (baseURL: string) => {
  const { keycloak, initialized } = useKeycloak();
  const axiosInstance = useRef<AxiosInstance>(undefined);
  const keycloakToken = keycloak?.token ?? '';

  useEffect(() => {
    axiosInstance.current = axios.create({
      baseURL,
      headers: {
        Authorization: initialized
          ? `Bearer ${keycloakToken}`
          : undefined,
      },
    });

    return () => {
      axiosInstance.current = undefined;
    };
  }, [baseURL, initialized, keycloakToken]);

  return axiosInstance;
};