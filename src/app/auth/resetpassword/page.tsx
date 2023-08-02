"use client"
import React, { useState } from 'react';
import FormInput from '@/components/FormInput';

const defaultFormData = {
  password: '',
  confirmPassword: '',
};

const ResetPassword: React.FC = () => {
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
    <div className="flex pt-32 items-center justify-center w-screen flex-col space-y-2">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{"Choose a new password."}</h1>
      <div className='text-gray-600 text-lg pb-7'>{"It must have at least 8 characters, 1 letter, 1 number and 1 special character."}</div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
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
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
           Save New Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
