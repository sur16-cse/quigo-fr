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
    <div className="flex flex-col items-center justify-center pt-15">
      <div className="shadow-md p-6 rounded-lg bg-white w-1/3 space-y-3">
        <div className="text-center"> <h2 className="text-3xl font-semibold">{"Don't have an account?"}</h2>
        <p className="text-sm font-light">Sign up with your email and password</p></div>
       
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div className="text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-800 focus:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
