// Select.tsx
import { FormSelectProps } from "@/lib/types";
import Link from "next/link";
import React from "react";

const Select: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  interfaceType,
  error
}) => {
  return (
      <div className="relative mb-10">
        <label
          className={`peer-focus:font-semibold text-sm text-gray-500 dark:text-gray-400 absolute pointer-events-none  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
            value !== ""
              ? "dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 -top-1 z-10 origin-[0]  dark:bg-gray-900"
              : "top-1"
          }`}
        >
          {label}
        </label>
        <select
          className=" w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300   py-1.5 -m-px focus:bg-primary-color  focus:outline-none  dark:focus:border-blue-500 focus:border-blue-600 peer"
          name="role" // Use a different name here
          value={value}
          onChange={onChange}
          required
        >
         <option value="" disabled hidden></option>
        {Object.values(interfaceType).map((role) =>
          role !== "" ? (
            <option key={role} value={role}>
              {role}
            </option>
          ) : null
        )}
        </select>
        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
  );
};

export default Select;
