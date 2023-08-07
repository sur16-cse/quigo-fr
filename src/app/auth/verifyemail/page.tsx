"use client"
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { useSelector } from "react-redux";


const VerifyEmail = () => {
   const email=useSelector((state: RootState) => state.appState.email)
    console.log(email)

  return (
    <div className="flex items-center justify-center flex-col space-y-2  p-36">
      <CiMail size={100}/>
      <div className="text-xl font-semibold text-blue-500">{"Please verify your email address"}</div>
      <div className="text-lg">
        {
          "Great! You're almost there. Before you can enjoy ride of quigo, you'll need to verify your email address."
        }
      </div>
      <div className="text-base">
        <span>{`We've sent a verification email to`} </span>
        <b>{`${email}`}</b> 
        <span>. Please check your inbox and click the link to continue.</span>
      </div>
    </div>
  );
};

export default VerifyEmail;



