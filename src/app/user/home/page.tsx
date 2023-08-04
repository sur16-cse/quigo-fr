'use client';
import FormInput from '@/components/FormInput';
import { validateForm } from '@/utils/validateForm';
import React from 'react'
import { useState } from 'react';

const HomePage = () => {

  const defaultFormData = {
    pickupLocation: '',
    dropLocation: '',
  };


  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const fieldsToValidate = [
    "pickupLocation",
    "dropLocation",
  ];


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

  };

  return (
    <>
      <div className='flex flex-row w-full bg-black h-[90vh] '>
        <div className='flex flex-col w-[30vw] bg-white pl-8 pt-10'>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <FormInput
              label="Pickup Location"
              name="pickupLocation"
              type="text"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              error={formErrors.email}
            />
            <FormInput
              label="Drop Location"
              name="dropLocation"
              type="text"
              value={formData.dropLocation}
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
                Create Ride
              </button>
            </div>
          </form>

        </div>
        <div className='flex justify-center items-center w-[70vw] bg-slate-500'>

        </div>
      </div>
    </>
  )
}

export default HomePage
