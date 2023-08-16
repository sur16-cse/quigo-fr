"use client";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col pl-24 pr-24 pt-8 bg-slate-50 space-y-4">
      <div className="flex flex-row space-x-4">
        <div className="text-3xl font-semibold text-blue-950">QUIGO</div>
        <Image src="/images/QUIGO.svg" alt={"quigo"} width={100} height={100} />
      </div>

      <div className="text-xl font-semibold text-black">About Us</div>
      <div className="flex flex-row width-[100vw] justify-start items-center space-x-28 text-center text-blue-800">
        <h1 className="text-xl line-clamp-2 font-semibold text-black drop-shadow-md">
          Products
        </h1>
        <div>Ride</div>
        <div>Drive</div>
      </div>
      <div className="flex flex-row width-[100vw] justify-start items-center space-x-28 text-center">
        <h1 className="text-xl line-clamp-2 font-semibold text-black drop-shadow-md">
          Travel
        </h1>
        <div>Airports</div>
        <div>Cities</div>
        <div>Outstations</div>
      </div>
      <div className="text-sm font-extrabold text-blue-950">
        © 2023 Quigo, Inc. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
