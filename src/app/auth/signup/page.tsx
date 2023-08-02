"use client";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import Select from "@/components/Select";
import { Roles, SignUpData } from "@/lib/types";
import { useAppDispatch } from "@/redux/hooks";
import { setAppState } from "@/redux/slices/appStateReducer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const defaultFormData: SignUpData = {
  name: "",
  email: "",
  role: Roles.GUEST,
  phone_number: "",
  password: "",
  confirm_password: "",
};

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    dispatch(setAppState({ title: "email", value: formData.email }))
    console.log(formData);
  };
  const dispatch = useAppDispatch()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex pt-14 items-center justify-center  w-screen flex-col">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <FormInput
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Select
          label="Select Role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="" disabled hidden></option>
          {Object.values(Roles).map((role) =>
            role !== "" ? (
              <option key={role} value={role}>
                {role}
              </option>
            ) : null
          )}
        </Select>
        <FormInput
          label="Phone Number"
          name="phone_number"
          type="text"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Confirm Password"
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => router.push("/auth/verifyemail")}
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="relative mb-10 text-gray-500 mt-3">
        Already have an account?{" "}
        <Link href="/auth/login" className="focus:text-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
