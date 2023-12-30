"use client";

import { useEffect } from "react";
import { axiosAuth } from "../httpClient";
import Constant from "../constant";
import { useCookies } from "next-client-cookies";
import useRefreshToken from "./useRefreshToken";

function useAxiosAuth() {
  const cookie = useCookies();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] =
          "Bearer " + cookie.get(Constant.ACCESS_TOKEN);
      }
      return config;
    });

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] =
            "Bearer " + cookie.get(Constant.ACCESS_TOKEN);
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [cookie, refreshToken]);
}

export default useAxiosAuth;
