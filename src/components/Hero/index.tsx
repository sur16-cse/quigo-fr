import Image from "next/image";
import React from "react";
import { RiTimeLine } from "react-icons/ri";
import { GrMap } from "react-icons/gr";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { BsFillSquareFill } from "react-icons/bs";
import Footer from "@/components/footer";

const Hero = () => {
  return (
    <>
      <div className="flex flex-row pl-24 pr-24 pt-8">
        <div className="w-[40vw] flex justify-center flex-col">
          <h1 className="text-7xl line-clamp-2 font-bold text-gray-500 drop-shadow-md">
            <span className="text-blue-950">{"Ride"} </span>
            <span className="text-gray-700">{"Now"}</span>
          </h1>
          <p className="text-2xl text-black pt-3">
            {
              "Get a ride in minutes. Track your driver's arrival, share your trip details, and pay cashless in select cities."
            }
          </p>
        </div>

        <div className="w-[60vw] flex justify-center items-center">
          <Image
            src="/images/hero2.avif"
            alt="hero"
            width={700}
            height={900}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col pl-20 pr-20 pt-8 w-[100vw]">
        <h3 className="text-4xl line-clamp-2 font-bold text-blue-950 drop-shadow-md ">
          Why use the Quigo
        </h3>
        <div className="flex justify-center items-center pt-6">
          <Image
            src="/images/hero3.avif"
            alt="hero"
            width={900}
            height={300}
            className="rounded"
          />
        </div>
        <div className="flex flex-row justify-center mt-8 pt-6 pl-20 pr-8 pb-4  space-x-8">
          <div className="flex flex-col w-[25vw]">
            <div className="h-[5vh]">
              <RiTimeLine size={35} />
            </div>
            <h3 className="text-xl text-gray-600 font-medium">
              Rides on demand
            </h3>
            <p className="text-sm text-black pt-1">
              Request a ride at any time and any location and on any day of the
              year.
            </p>
          </div>
          <div className="flex flex-col w-[25vw]">
            <div className="h-[5vh]">
              <LiaMoneyCheckAltSolid size={35} />
            </div>
            <h3 className="text-xl text-gray-600 font-medium">
              Budget-friendly options
            </h3>
            <p className="text-sm text-black pt-1">
              Your pick of rides at low prices and compare prices on every kind
              of ride, from daily commutes to special evenings out.
            </p>
          </div>
          <div className="flex flex-col w-[25vw]">
            <div className="h-[5vh]">
              <GrMap size={30} />
            </div>
            <h3 className="text-xl text-gray-600 font-medium">
              Scroll, click, tap and go!
            </h3>
            <p className="text-sm text-black pt-1">
              Booking a ride has never been easier! Tap and let your driver take
              you where you want to go.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-20 pr-20 pt-8 pb-4 w-[100vw]">
        <h3 className="text-4xl mb-4 line-clamp-2 font-bold text-blue-950 drop-shadow-md ">
          How to use the Quigo
        </h3>
        <div className="flex pl-36 pr-20">
          <div className="w-[50vw] flex flex-col space-y-8">
            <Image
              src="/images/createAccount.png"
              alt="hero"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <Image
              src="/images/destination.png"
              alt="hero"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <Image
              src="/images/meetDriver.jpeg"
              alt="hero"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <Image
              src="/images/checkRide.png"
              alt="hero"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <Image
              src="/images/relax.png"
              alt="hero"
              width={100}
              height={100}
              className="rounded-lg pt-6"
            />
          </div>
          <div className="w-50vw">
            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-900">
              <li className="mb-28 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <BsFillSquareFill />
                </span>
                <h3 className="font-medium leading-tight">Create an account</h3>
              </li>
              <li className="mb-28 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <BsFillSquareFill />
                </span>
                <h3 className="font-medium leading-tight">
                  Enter your destination
                </h3>
              </li>
              <li className="mb-28 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <BsFillSquareFill />
                </span>
                <h3 className="font-medium leading-tight">Meet your driver</h3>
              </li>
              <li className="mb-28 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <BsFillSquareFill />
                </span>
                <h3 className="font-medium leading-tight">Check your ride</h3>
              </li>
              <li className="mb-28 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <BsFillSquareFill />
                </span>
                <h3 className="font-medium leading-tight">
                  Sit back and relax
                </h3>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
