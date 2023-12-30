"use client";

import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { httpClient } from "@/libs/httpClient";
import Constant from "@/libs/constant";
import { SocialSignUpRequest, SocialSignUpResponse } from "@/models/dtos";
import { useCookies } from "next-client-cookies";

const defaultFromData = {
  password: "",
  rePassword: "",
  email: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFromData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const cookie = useCookies();
  const inputStyle =
    "border border-gray-300 sm:text-sm text-black rounded-lg w-full p-2.5 focus:outline-none";

  useEffect(() => {
    const emailParams = searchParams.get("email");
    if (emailParams) setEmail(emailParams);
  }, [email, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setFormData({ ...formData, email: email ? email : "" });
    console.log(formData);
    const request: SocialSignUpRequest = {
      email: formData.email,
      password: formData.password,
      accessToken: "",
    };
    try {
      const res = await httpClient.post<SocialSignUpResponse>(
        "/api/auth/social/signup",
        request,
      );

      //register success
      cookie.set(Constant.ACCESS_TOKEN, res.data.accessToken);
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
      setFormData(defaultFromData);
      toast.success("Register success!");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="container mx-auto w-[70%]">
      <div className="mx-auto w-80 space-y-4 p-6 sm:p-8 md:w-[70%] md:space-y-6">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Set your account password
          </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            className={inputStyle}
            name="email"
            placeholder="name@company.com"
            value={email ? email : ""}
            readOnly
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
            type="password"
            className={inputStyle}
            name="rePassword"
            placeholder="confirm password"
            onChange={handleInputChange}
            value={formData.rePassword}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-tertiary-dark px-5 py-2 text-center text-sm font-medium focus:outline-none"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
