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
  autoComplete?: string;
  width?: number;
}

export interface FormSelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  interfaceType: Object;
  error: string;
}

export interface coordinates {
  lat: number;
  lng: number;
}
export interface RiderHomePageProps {
  pickupLocation: string;
  dropLocation: string;
  amount: number;
}

export interface DriverHomePageProps {}

export interface RiderMapBoxProps {
  pickupCoordinates: coordinates;
  dropoffCoordinates: coordinates;
  zoom: number;
  distance: number | null;
  duration: number | null;
  location: coordinates;
}

export interface AccedptedRideDetails {
  driver_name: string;
  driver_number: string;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  price: string;
  ride_status: string;
  payment_status: string;
}
