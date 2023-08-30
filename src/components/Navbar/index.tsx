"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import ProfileDropdown from "@/components/ProfileDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <nav>
        <div className="flex p-3 items-center justify-between bg-primary-color  text-center flex-row  text-secondary-color font-normal text-base h-[10vh]">
          <div className="flex justify-start items-center  space-x-10 ml-8">
            <Link href="/">
              <Image
                src="/images/QUIGO.svg"
                alt={"quigo"}
                width={100}
                height={100}
              />
            </Link>
            <Link href="/safety">
              <p>Safety</p>
            </Link>
          </div>
          <div className="flex space-x-10 flex-row items-center mr-8">
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
                  <ProfileDropdown />
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
