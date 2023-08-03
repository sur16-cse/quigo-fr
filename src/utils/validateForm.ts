
import { SignUpData, SignInData } from "@/lib/types";

type FormData = SignUpData | SignInData | any;

export const validateForm = (formData: FormData, fieldsToValidate: string[]) => {
    console.log("formData", formData);
    // Function body
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const phonePattern = /^[0-9]{10}$/;
    const errors: { [key: string]: string } = {};
  
    fieldsToValidate.forEach((field) => {
      if ("name" in formData && field === "name") {
        if (!formData.name.trim()) {
          errors.name = "Name is required";
        }
      } else if ("email" in formData && field === "email") {
        if (!formData.email.trim()) {
          errors.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
          errors.email = "Invalid email format";
        }
      } else if ("role" in formData && field === "role") {
        if (!formData.role.trim()) {
          errors.role = "Role is required";
        }
      } else if ("password" in formData && field === "password") {
        if (!formData.password.trim()) {
          errors.password = "Password is required";
        } else if (!passwordPattern.test(formData.password)) {
          errors.password =
            "Password must have at least 8 characters, 1 letter, 1 number, and 1 special character";
        }
      } else if ("confirm_password" in formData && field === "confirm_password") {
        if (!formData.confirm_password.trim()) {
          errors.confirm_password = "Confirm password is required";
        } else if (formData.confirm_password !== formData.password) {
          errors.confirm_password = "Passwords do not match";
        }
      } else if ("phone_number" in formData && field === "phone_number") {
        if (!formData.phone_number.trim()) {
          errors.phone_number = "Phone number is required";
        } else if (!phonePattern.test(formData.phone_number)) {
          errors.phone_number = "Invalid phone number format";
        }
      }
    });
  
    return errors;
  };
  

  