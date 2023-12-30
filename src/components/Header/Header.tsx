"use client";

import ThemeContext from "@/context/themeContext";
import useUser from "@/libs/hook/useUser";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const user = useUser();
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  return (
    <header className="container mx-auto flex flex-wrap items-center justify-between px-4 py-10 text-xl md:flex-nowrap">
      <div className="md:2/3 flex w-full items-center">
        <Link href="/" className="font-black text-tertiary-light">
          HotelZZ
        </Link>
        <ul className="ml-5 flex items-center">
          <li className="flex items-center">
            {user ? (
              <Link href={`/user/${user.email}`}>
                {user.avatar ? (
                  <div className="h-10 w-10 overflow-hidden rounded-full ">
                    <Image
                      src={user.avatar}
                      alt={user.fullName}
                      width={40}
                      height={40}
                      className="scale-animation img"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            ) : (
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>
          <li className="ml-2">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>
      <ul className="mt-4 flex w-full items-center justify-between md:w-1/3">
        <li className="transition-all duration-500 hover:-translate-y-2">
          <Link href="/">Home</Link>
        </li>
        <li className="transition-all duration-500 hover:-translate-y-2">
          <Link href="/rooms">Room</Link>
        </li>
        <li className="transition-all duration-500 hover:-translate-y-2">
          <Link href="/">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
