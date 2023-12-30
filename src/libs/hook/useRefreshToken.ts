"use client";

import { axiosAuth, httpClient } from "../httpClient";
import Constant from "../constant";
import { RefreshTokenResponse } from "@/models/dtos";
import { useCookies } from "next-client-cookies";

function useRefreshToken() {
  const cookie = useCookies();
  const refreshToken = async () => {
    const res = await httpClient.post<RefreshTokenResponse>(
      "/api/auth/refresh",
      {
        refreshToken: localStorage.getItem(Constant.REFRESH_TOKEN),
      },
    );
    if (res.status !== 200) {
      return;
    }
    if (res.data.refreshToken) {
      localStorage.setItem(Constant.REFRESH_TOKEN, res.data.refreshToken);
    }
    if (res.data.accessToken) {
      cookie.set(Constant.ACCESS_TOKEN, res.data.accessToken);
    }
  };
  return refreshToken;
}

export default useRefreshToken;
