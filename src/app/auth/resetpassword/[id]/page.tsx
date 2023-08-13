"use client";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { validateForm } from "@/utils/validateForm";
import { patchData } from "@/domain/api";
import toast from "react-hot-toast";

const defaultFormData = {
  password: "",
  confirm_password: "",
};

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [id, setId] = useState("");
  const fieldsToValidate = ["password", "confirm_password"];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = window.location.pathname.split("/")[3];
    setId(id);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      if (id) {
        let data = await patchData("/resetpassword/", {}, id, formData);
        console.log(data);
        if (data.status === "success") {
          toast.success(data.message);
          router.push("/auth/login");
        } else if (data.status === "fail") {
          toast.error(data.message);
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      } else {
        toast.error("Invalid Link");
      }
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
    <div className="flex flex-col items-center justify-center pt-6">
      <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-6 rounded-lg bg-white w-1/3 gap-y-3">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold"> {"Choose a new password"}</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mb-2"
          autoComplete="off"
        >
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => {
                const errors = validateForm(formData, fieldsToValidate);
                setFormErrors(errors);
              }}
            >
              Save New Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
