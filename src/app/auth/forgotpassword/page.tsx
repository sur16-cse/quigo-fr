"use client"
import React, { useState } from 'react';
import FormInput from '@/components/FormInput';
import { Roles, SignInData } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { validateForm } from '@/utils/validateForm';
import { toast } from 'react-hot-toast';

const defaultFormData = {
  email: '',
};

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const fieldsToValidate = [
    "email"
  ];
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      // Handle form submission here
      // dispatch(setAppState({ title: "email", value: formData.email }));
      console.log(formData);
      toast.success("Email sent!");
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
    <div className="flex pt-32 items-center justify-center w-screen flex-col space-x-10">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-24">{"What's your email? Check your inbox for a link to create a new password."}</h1>
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
    </div>
  );
};

export default ForgotPassword;
