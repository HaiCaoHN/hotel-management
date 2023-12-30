"use client";

import { FormEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthenticationRequest, AuthenticationResponse } from "@/models/dtos";
import Constant from "@/libs/constant";
import { useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "next-client-cookies";
import { httpClient } from "@/libs/httpClient";
const loginFormData = {
  email: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(loginFormData);
  const router = useRouter();
  const cookie = useCookies();
  const inputStyle =
    "border border-gray-300 sm:text-sm text-black rounded-lg w-full p-2.5 focus:outline-none";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const authenticate = async (request: AuthenticationRequest) => {
    // let res = await login(request).catch((err) => {
    //   toast.error("Wrong user name or password");
    // });
    try {
      const res = await httpClient.post<AuthenticationResponse>(
        "/api/auth/login",
        request,
      );

      if (res.data.userExisted === false) {
        router.push("/signup/social?email=" + res.data.email);
        return;
      }
      //check user active
      if (res.data.isActive === true) {
        toast.error("Your account is suspended!");
        return;
      }
      //save token
      cookie.set(Constant.ACCESS_TOKEN, res.data.token);
      localStorage.setItem(Constant.REFRESH_TOKEN, res.data.refreshToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: res.data.name,
          avatar: res.data.image,
          email: res.data.email,
          isActive: true,
        }),
      );

      toast.success("Login success!");
      router.push("/");
    } catch (error) {
      toast.error("Wrong user name or password!");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //get user information
    const authReq: AuthenticationRequest = {
      email: formData.email,
      name: "",
      password: formData.password,
      type: Constant.LOCAL,
      accessToken: "",
    };
    authenticate(authReq);
  };

  const handleSocialLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      const authReq: AuthenticationRequest = {
        email: "",
        name: "",
        password: "",
        type: Constant.GOOGLE,
        accessToken: tokenResponse.access_token,
      };
      //get user information
      authenticate(authReq);
    },
  });

  return (
    <section className="container mx-auto w-[70%]">
      <div className="mx-auto w-80 space-y-4 p-6 sm:p-8 md:w-[70%] md:space-y-6">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Sign In
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={() => handleSocialLogin()}
              className="mr-3 cursor-pointer text-4xl text-black dark:text-white"
            />
            |
            <FcGoogle
              onClick={() => handleSocialLogin()}
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
          <button
            type="submit"
            className="w-full rounded-lg bg-tertiary-dark px-5 py-2 text-center text-sm font-medium focus:outline-none"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-blue-700 underline"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
