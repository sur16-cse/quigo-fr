import { Interface } from "readline";

export enum Roles {
  RIDER = "rider",
  DRIVER = "driver",
  GUEST = "",
}

export interface SignUpData {
  name: string;
  email: string;
  role: Roles;
  phone_number: string;
  password: string;
  confirm_password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  error: string;
}

export interface FormSelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  interfaceType: Object
  error: string;
}

export interface RiderHomePageProps {
  pickupLocation: string,
    dropLocation: string,
}
