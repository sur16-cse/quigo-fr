"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLogged = useSelector((state: RootState) => state.appState.isLogged);
  console.log(isLogged);
  return (
    <header>
      <nav>
        <div className="flex p-3 items-center justify-between bg-primary-color  text-center flex-row  text-secondary-color font-normal text-base h-[10vh]">
          <div className="flex justify-start items-center  space-x-6 ml-8">
            <Link href="/">
              <Image
                src="/images/QUIGO.svg"
                alt={"quigo"}
                width={100}
                height={100}
              />
            </Link>
            {/* <Link href="/safety">
              <p>Safety</p>
            </Link> */}
          </div>
          <div className="flex space-x-7 flex-row items-center mr-8">
            {/* <Link href="/search" className="flex space-x-2 items-center">
              <BsSearch />
              <span>Search</span>
            </Link> */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex space-x-2 items-center"
            >
              <Image
                src="/images/sign-in-up-logo.svg"
                alt={"logo-profile"}
                width={50}
                height={50}
              />
              {isMenuOpen ? (
                <>
                  <MdOutlineKeyboardArrowUp />
                  {isLogged ? (
                    <div className="absolute right-10 top-16 w-60 mt-1 bg-white rounded-md border-0 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] z-20 p-1">
                      <Link
                        className="px-4 py-2 flex space-x-9 items-center justify-between"
                        href="/auth/login"
                      >
                        Profile
                        <MdOutlineKeyboardArrowRight />
                      </Link>
                      <div className="border-t border-gray-300"></div>
                      <Link
                        className="px-4 py-2px-4 py-2 flex space-x-9 items-center justify-between"
                        href="/auth/signup"
                      >
                        Logout
                        <MdOutlineKeyboardArrowRight />
                      </Link>
                      <div className="border-t border-gray-300"></div>
                    </div>
                  ) : (
                    <div className="absolute right-10 top-16 w-60 mt-1 bg-white rounded-md border-0 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] z-20 p-1">
                      <Link
                        className="px-4 py-2 flex space-x-9 items-center justify-between"
                        href="/auth/login"
                      >
                        Log In
                        <MdOutlineKeyboardArrowRight />
                      </Link>
                      <div className="border-t border-gray-300"></div>
                      <Link
                        className="px-4 py-2px-4 py-2 flex space-x-9 items-center justify-between"
                        href="/auth/signup"
                      >
                        Sign Up
                        <MdOutlineKeyboardArrowRight />
                      </Link>
                      <div className="border-t border-gray-300"></div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <MdOutlineKeyboardArrowDown />
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
