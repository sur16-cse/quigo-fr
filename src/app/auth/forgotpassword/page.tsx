"use client"
import React, { useState } from 'react';
import FormInput from '@/components/FormInput';
import { Roles, SignInData } from '@/lib/types';
import Link from 'next/link';

const defaultFormData = {
  email: '',
};

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
           Submit Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
