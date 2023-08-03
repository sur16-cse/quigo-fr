"use client";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import Select from "@/components/Select";
import { Roles, SignUpData } from "@/lib/types";
import { useAppDispatch } from "@/redux/hooks";
import { setAppState } from "@/redux/slices/appStateReducer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateForm } from "@/utils/validateForm";

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
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fieldsToValidate = [
    "name",
    "email",
    "role",
    "password",
    "confirm_password",
    "phone_number",
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      // Handle form submission here
      dispatch(setAppState({ title: "email", value: formData.email }));
      console.log(formData);
      // Submit the form or navigate to the next page
      router.push("/auth/verifyemail");
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
    <div className="flex pt-8 items-center justify-center flex-col">
      <span className="block text-3xl my-2 font-semibold">
        {"Don't have an account"}
      </span>
      <span className="text-sm my-2 font-light">
        Sign up with your email and password
      </span>
      <form onSubmit={handleSubmit} className="w-full max-w-md ">
        <FormInput
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          error={formErrors.name}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={formErrors.email}
        />
        <Select
          label="Select Role"
          value={formData.role}
          onChange={handleChange}
          error={formErrors.role}
          interfaceType={Roles}
        />
        <FormInput
          label="Phone Number"
          name="phone_number"
          type="text"
          value={formData.phone_number}
          onChange={handleChange}
          required
          error={formErrors.phone_number}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          error={formErrors.password}
        />
        <FormInput
          label="Confirm Password"
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
          error={formErrors.confirm_password}
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
            Sign Up
          </button>
        </div>
      </form>
      <div className="relative mb-10 text-gray-500 mt-3">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-800 focus:text-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
