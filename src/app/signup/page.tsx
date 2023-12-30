"use client";

import { FormEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { httpClient } from "@/libs/httpClient";
import Constant from "@/libs/constant";
import {
  AuthenticationRequest,
  AuthenticationResponse,
  SocialSignUpRequest,
  SocialSignUpResponse,
} from "@/models/dtos";
import { useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "next-client-cookies";

const defaultFromData = {
  name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFromData);
  const cookie = useCookies();
  const router = useRouter();
  const inputStyle =
    "border border-gray-300 sm:text-sm text-black rounded-lg w-full p-2.5 focus:outline-none";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authReq: AuthenticationRequest = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      type: Constant.LOCAL,
      accessToken: "",
    };
    const res = await httpClient.post<AuthenticationResponse>(
      "/api/auth/signup",
      authReq,
    );
    try {
      //register success
      if (!res.data.userExisted) {
        cookie.set(Constant.ACCESS_TOKEN, res.data.token);
        localStorage.setItem(Constant.REFRESH_TOKEN, res.data.refreshToken);
        setFormData(defaultFromData);
        toast.success("Register success!");
        router.push("/login");
      }
      //user existed
      else toast.error("User existed");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSocialRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const signUpRequest: SocialSignUpRequest = {
        accessToken: tokenResponse.access_token,
        password: "",
        email: "",
      };

      try {
        const userInfo = await httpClient.post<SocialSignUpResponse>(
          "/api/auth/social/signup",
          signUpRequest,
        );
        //if social user already exists
        if (userInfo.data.isExisted) {
          cookie.set(Constant.ACCESS_TOKEN, userInfo.data.accessToken);
          localStorage.setItem(
            Constant.REFRESH_TOKEN,
            userInfo.data.refreshToken,
          );
          setFormData(defaultFromData);
          router.push("/");
          return;
        }
        //if social user not exists -> set password and sign up
        router.push("/signup/social?email=" + userInfo.data.email);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <section className="container mx-auto w-[70%]">
      <div className="mx-auto w-80 space-y-4 p-6 sm:p-8 md:w-[70%] md:space-y-6">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={() => toast.error("Feature not available yet!")}
              className="mr-3 cursor-pointer text-4xl text-black dark:text-white"
            />
            |
            <FcGoogle
              onClick={() => handleSocialRegister()}
              className="ml-3 cursor-pointer text-4xl"
            />
          </span>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            className={inputStyle}
            name="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            className={inputStyle}
            name="password"
            placeholder="password"
            required
            minLength={6}
            onChange={handleInputChange}
            value={formData.password}
          />
          <input
            type="text"
            className={inputStyle}
            name="name"
            placeholder="Hai Cao"
            onChange={handleInputChange}
            value={formData.name}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-tertiary-dark px-5 py-2 text-center text-sm font-medium focus:outline-none"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-700 underline"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
