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
    <div className="flex items-center justify-center flex-col space-y-2 text-gray-600 text-lg p-28">
      <CiMail size={100}/>
      <div>{"Please verify your email address"}</div>
      <div>
        {
          "Great! You're almost there. Before you can enjoy ride of quigo, you'll need to verify your email address."
        }
      </div>
      <div>
        {`We've sent a verification email to ${email}. Please check your inbox and click the link to continue.`}
      </div>
    </div>
  );
};

export default VerifyEmail;



