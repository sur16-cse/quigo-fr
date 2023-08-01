// Select.tsx
import { FormSelectProps } from '@/lib/types';
import React from 'react';

const Select: React.FC<FormSelectProps> = ({ label, value, onChange, children }) => {
  return (
    <div className="relative mb-10">
      <label
        className={`text-gray-600 text-base absolute pointer-events-none  ${
          value !== ""
            ? "dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 -top-1 z-10 origin-[0]  dark:bg-gray-900"
            : "top-1"
        }`}
      >
        {label}
      </label>
      <select
        className="bg-transparent w-full text-gray-600 text-lg py-1.5 -m-px focus:bg-primary-color border-b-2 border-gray-400 focus:outline-none focus:border-black"
        name="role" // Use a different name here
        value={value}
        onChange={onChange}
        required
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
