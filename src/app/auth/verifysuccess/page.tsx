"use client"
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";


const VerifySuccess = () => {
   const email=useSelector((state: RootState) => state.appState.email)
    console.log(email)

    useEffect(() => {
      get
    }, []);

  return (
    <div className="flex items-center justify-center flex-col space-y-3 text-gray-600 text-lg p-28">
      <div className="text-black font-bold text-4xl">{"Welcome to QUIGO"}</div>
      <div className="font-semibold">
        {
          "Congratulations, sur1611 has been verified!,"
        }
      </div>
      <div className="text-sm">
        {`Riding into the future with Quigo: Where every journey is not just a ride, but a secure and seamless experience powered by blockchain technology.`}
      </div>
      <Link className="bg-blue-500 text-white p-2 rounded" href="/auth/login">Get started with Quigo</Link>
    </div>
  );
};

export default VerifySuccess;



