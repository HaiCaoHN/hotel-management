import {
  AuthenticationRequest,
  AuthenticationResponse,
  SocialSignUpResponse,
  SocialSignUpRequest,
} from "@/models/dtos";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import Constant from "./constant";

export const httpClient = axios.create({
  baseURL: Constant.BACK_END_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL: Constant.BACK_END_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
