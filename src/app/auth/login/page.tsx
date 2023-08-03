"use client"
import React, { useState } from 'react';
import FormInput from '@/components/FormInput';
import { Roles, SignInData } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setAppState } from '@/redux/slices/appStateReducer';
import { validateForm } from '@/utils/validateForm';

const defaultFormData: SignInData = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const fieldsToValidate = [
    "email",
    "password",
  ];
  const dispatch = useAppDispatch();


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      // Handle form submission here
      // dispatch(setAppState({ title: "email", value: formData.email }));
      console.log(formData);
      // Submit the form or navigate to the next page
      router.push("/user/home");
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, form: "Invalid form" }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <div className="flex pt-32 items-center justify-center w-screen flex-col">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={formErrors.email}
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
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => {
              const errors = validateForm(formData, fieldsToValidate);
              setFormErrors(errors);
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div className="relative mt-5 text-sm">
        <div className="inline-flex justify-start items-center max-w-sm">
          <span className="mr-2">Not have an account yet?</span>
          <Link href="/auth/signup" className="text-blue-600 focus:text-blue-800">
            Signup
          </Link>
        </div>
        <span className="mx-2">|</span>
        <div className="inline-flex justify-center mt-2 max-w-sm">
          <span className="mr-2">
            <Link href="/auth/forgotpassword" className="text-blue-600 focus:text-blue-800">
              Forgot Password
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
