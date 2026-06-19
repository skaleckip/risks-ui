import { useEffect, useState } from "react";
import { useAxios } from "~/hooks/axios";
import type { PageDto } from "~/models/shared";
import type { RiskDto } from "~/models/risks";

export const useApiGetRisks = () => {
  const startPage = { items: [], pageNumber: 0, pageSize: 10, pageCount: 0 } as PageDto<RiskDto>
  const [risksPage, setRisksPage] = useState<PageDto<RiskDto>>(startPage)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const axiosInstance = useAxios("http://localhost:8080/api")

  useEffect(() => {
    if (axiosInstance && axiosInstance.current) {
      const path = encodeURI(`/risks?pageNumber=${risksPage.pageNumber}&pageSize=${risksPage.pageSize}&name=%`);
      axiosInstance.current
        .get<PageDto<RiskDto>>(path, {
          validateStatus: (status) => (status >= 200 && status < 300)
        })
        .then(({ data }) => {
          setRisksPage(data);
          setLoading(false);
          setError(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        });
    }
    return () => setRisksPage(startPage)
  }, [axiosInstance]);

  return {
    risksPage,
    loading,
    error
  }
}