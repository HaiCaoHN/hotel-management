"use client";
import { useEffect, useState } from "react";
import { axiosAuth } from "../httpClient";
import Constant from "../constant";
import { User } from "@/models/user";

const defaultUser: User = {
  fullName: "",
  email: "",
  isActive: false,
  avatar: "",
};
function useUser() {
  const userSession = localStorage.getItem("user");
  const [user, setUser] = useState<User>(defaultUser);
  useEffect(() => {
    if (!userSession) {
      return;
    }
    setUser(JSON.parse(userSession));
  }, [userSession]);
  return user;
}

export default useUser;
