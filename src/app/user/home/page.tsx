"use client";
import FormInput from "@/components/FormInput";
import { validateForm } from "@/utils/validateForm";
import React from "react";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { loadComponents } from "next/dist/server/load-components";
import Map from "@/components/Map";
import { TbCircleDotFilled } from "react-icons/tb";
import { RiderHomePageProps } from "@/lib/types";
import dynamic from "next/dynamic";

const AddressAutofill: any = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill) as any,
  { ssr: false }
);

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
const defaultFormData: RiderHomePageProps = {
  pickupLocation: "",
  dropLocation: "",
};

const HomePage = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [dropoffCoordinates, setDropoffCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const fieldsToValidate = ["pickupLocation", "dropLocation"];

  const getCordinates = async (location: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      console.log(data.features[0].center);

      return {
        lat: data.features[0].center[1],
        lng: data.features[0].center[0],
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getTravelLocationCoordinates = async (
    pickup: string,
    dropoff: string
  ) => {
    try {
      const pickUpData = await getCordinates(pickup);
      const dropOffData = await getCordinates(dropoff);
      setPickupCoordinates(pickUpData!);
      setDropoffCoordinates(dropOffData!);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit");

    getTravelLocationCoordinates(
      formData.pickupLocation,
      formData.dropLocation
    );
    // setFormData({ ...defaultFormData })
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <>
      <div className="flex flex-row w-full bg-black h-[90vh] ">
        <div className="flex  flex-col w-[30vw] bg-white pl-10 ">
          <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-gray-300 border-2  p-10 rounded-lg bg-white w-[25vw]">
            <div className=" mb-6">
              <h2 className="text-3xl font-semibold">{"Get a Ride"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full  max-w-sm">
              <div className="flex flex-row " >
                {/* <TbCircleDotFilled size={30}/>  */}
                <AddressAutofill accessToken={mapboxgl.accessToken} options={{
                  language: 'en',
                  country: 'IN',
                }}
                theme={{
                  variables: {
                    fontFamily: 'Avenir, sans-serif',
                    unit: '12px',
                    padding: '0.5em',
                    borderRadius: '0',
                    boxShadow: '0 0 0 1px silver',
                   minWidth: '300px',
                    colorBackground: 'purple',
                  }
                  }} 
                >
                   <div className="flex flex-row " >
                  <FormInput
                    label="Pickup Location"
                    name="pickupLocation"
                    type="text"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                    error={formErrors.email}
                    autoComplete="street-address"
                    width={72}
                  />
                  </div>
                </AddressAutofill>
              </div>

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
                    // const errors = validateForm(formData, fieldsToValidate);
                    // setFormErrors(errors);
                  }}
                >
                  Create Ride
                </button>
              </div>
            </form>
          </div>
        </div>
        <Map
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
      </div>
    </>
  );
};

export default HomePage;
