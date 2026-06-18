import { useEffect, useRef } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios, { type AxiosInstance } from "axios";

export const useAxios = (baseURL: string) => {
  const axiosInstance = useRef<AxiosInstance>(undefined);
  const { keycloak, initialized } = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  useEffect(() => {
    axiosInstance.current = axios.create({
      baseURL,
      headers: {
        Authorization: initialized ? `Bearer ${kcToken}` : undefined,
      },
    });

    return () => {
      axiosInstance.current = undefined;
    };
  }, [baseURL, initialized, kcToken]);

  return axiosInstance;
};