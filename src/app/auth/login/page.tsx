"use client"
import React, { useState } from 'react';
import FormInput from '@/components/FormInput';
import { Roles, SignInData } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setAppState } from '@/redux/slices/appStateReducer';
import { validateForm } from '@/utils/validateForm';
import { postData } from '@/domain/auth/api';
import toast from 'react-hot-toast';

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


  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      // Handle form submission here
      // dispatch(setAppState({ title: "email", value: formData.email }));
      console.log(formData);
      let data = await postData(formData,"/login");
      console.log(data);
      if(data.status === "success"){
        router.push("/user/home");
      }
        else if(data.status === "fail"){  
        toast.error(data.message)
        }
        else if(data.status === "error"){  
          toast.error(data.message)
          }
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
    <div className="flex flex-col items-center justify-center pt-16">
      <div className="shadow-md p-6 rounded-lg bg-white w-1/3 gap-y-3">
        <div className="text-center mb-9"> <h2 className="text-3xl font-semibold">{"Already have an account"}</h2>
        <p className="text-sm font-light">Sign in with your email and password</p></div>
       
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
      <div className="relative mt-5 text-sm text-center">
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
    </div>
  );
};

export default LoginForm;
