import { FormInputProps } from '@/lib/types';
import React from 'react';


const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  error,
}) => {
  const hasValue = value && value.toString().length > 0;
  console.log(error);

  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={name}
        id={`floating_${name}`}
        value={value}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required={required}
      />
      <label
        htmlFor={`floating_${name}`}
        className={`peer-focus:font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] ${
          hasValue ? 'peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500' : ''
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
      >
        {label}
      </label>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>} 
    </div>
  );
};

export default FormInput;
