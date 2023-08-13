"use client";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { Roles, SignInData } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { validateForm } from "@/utils/validateForm";
import { toast } from "react-hot-toast";
import { postData } from "@/domain/api";
import { data } from "autoprefixer";

const defaultFormData = {
  email: "",
};

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState<any>({});
  const fieldsToValidate = ["email"];
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      console.log(formData);
      let data = await postData(formData, "/forgotpassword");
      console.log(data);
      if (data.status === "success") {
        toast.success(
          "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
        );
        setData(data);
      } else if (data.status === "fail") {
        console.log(data.message);
        toast.error(data.message);
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, form: "Invalid form" }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <div className="shadow-md p-6 rounded-lg bg-white w-1/3 gap-y-3">
        <div className="text-center mb-9">
          {" "}
          <h2 className="text-3xl font-semibold">{"What's your email? "}</h2>
          <p className="text-sm font-light">
            Check your inbox for a link to create a new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={formErrors.email}
          />
       
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => {
                const errors = validateForm(formData, fieldsToValidate);
                setFormErrors(errors);
              }}
            >
              Submit Email
            </button>
          </div>
        </form>
        <div className="mt-5 text-center text-sm text-gray-500 font-semibold">{data.message}</div>
      </div>
    </div>
  );
};

export default ForgotPassword;
