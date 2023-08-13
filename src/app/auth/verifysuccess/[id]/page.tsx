"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getData } from "@/domain/api";
import { toast } from "react-hot-toast";

const VerifySuccess = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState<any>({});
  useEffect(() => {
    const id = window.location.pathname.split("/")[3];
    setId(id);
  }, []);

  useEffect(() => {
    if (id) {
      getData(`/verifysuccess/`, {}, id).then((data) => {
        console.log(data);
        console.log(data === undefined);
        setData(data);
      });
    }
  }, [id]);

  useEffect(() => {
      if (data.status === "success") {
        toast.success(data.message);
      }
     else if(data.status === "fail") {
      toast.error(data.message);
    }
}, [data]);

  return (
    <div className="flex items-center justify-center flex-col space-y-3 text-gray-600 text-lg p-36">
      <div className="text-black font-bold text-4xl mb-4">{"Welcome to QUIGO"}</div>
      {data !== undefined &&
      data.message !== "Invalid verification code or user doesn't exists" ? (
        data.status === "success" ? (
          <div className="font-bold text-green-500">
            {`Congratulations, ${data.data}  has been verified!,`}
          </div>
        ) : (
          data.message === "User already verified" &&
          data.status === "fail" &&
          data.data === undefined && (
            <div className="font-semibold text-blue-400">{`User already verified`}</div>
          )
        )
      ) : (
        <div className="font-semibold text-red-500">
          {"Invalid verification link or or user doesn't exists"}
        </div>
      )}
      <div className="text-sm text-black">
        {`Riding into the future with Quigo: Where every journey is not just a ride, but a secure and seamless experience powered by blockchain technology.`}
      </div>
      <Link className="bg-blue-500 text-white p-2 rounded" href="/auth/login">
        Get started with Quigo
      </Link>
    </div>
  );
};

export default VerifySuccess;
