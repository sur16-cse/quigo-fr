"use client";
import FormInput from "@/components/FormInput";
import { validateForm } from "@/utils/validateForm";
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { loadComponents } from "next/dist/server/load-components";
import Map from "@/components/Map";
import { TbCircleDotFilled } from "react-icons/tb";
import { RiderHomePageProps, coordinates } from "@/lib/types";
import dynamic from "next/dynamic";
import { RiderMapBoxProps } from "@/lib/types";
import { distanceToKm, durationToMinutes } from "@/utils/conversion";

const AddressAutofill: any = dynamic(
  () =>
    import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill) as any,
  { ssr: false }
);

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
const defaultFormData: RiderHomePageProps = {
  pickupLocation: "",
  dropLocation: "",
  amount: 0,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
const defaultCoordinates: coordinates = {
  lat: 0,
  lng: 0,
};

const defaultRiderMapBoxProps: RiderMapBoxProps = {
  pickupCoordinates: defaultCoordinates,
  dropoffCoordinates: defaultCoordinates,
  zoom: 9,
  distance: null,
  duration: null,
  location: defaultCoordinates,
};

const SearchPage = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState<
    RiderMapBoxProps["pickupCoordinates"]
  >({ ...defaultCoordinates });
  const [dropoffCoordinates, setDropoffCoordinates] = useState<
    RiderMapBoxProps["dropoffCoordinates"]
  >({ ...defaultCoordinates });
  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const fieldsToValidate = ["pickupLocation", "dropLocation"];
  const [isCreateRide, setIsCreateRide] = useState(false);
  const [isConfirmRide, setIsConfirmRide] = useState(false);
  const [location, setLocation] = useState(defaultRiderMapBoxProps.location);
  const mapRef = useRef<mapboxgl.Map | null>(null); // Create a ref to hold the map instance
  const [zoom, setZoom] = useState(defaultRiderMapBoxProps.zoom);

  const [childDistance, setChildDistance] =
    useState<RiderMapBoxProps["distance"]>(null);
  const [childDuration, setChildDuration] =
    useState<RiderMapBoxProps["duration"]>(null);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    //want to clear everything on the map before adding new stuff
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (location.lng !== 0 && location.lat !== 0) {
      if (!mapRef.current) {
        // If the map is not initialized, create it
        console.log(location);
        const map = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center: [location.lng, location.lat], // starting position [lng, lat]
          zoom: defaultRiderMapBoxProps.zoom, // starting zoom
        });
        mapRef.current = map; // Save the map instance in the ref
      }
    }
    // calculate distance and duration without using
  }, [pickupCoordinates, dropoffCoordinates, location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

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

  const handleConfirmSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleConfirmSubmit");
    if (isCreateRide && formData.amount != 0) {
      setIsConfirmRide(true);
    }
    // setFormData({ ...defaultFormData })
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit");

    getTravelLocationCoordinates(
      formData.pickupLocation,
      formData.dropLocation
    );
    console.log(childDistance, childDuration);
    setIsCreateRide(true);
    // setFormData({ ...defaultFormData })
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = event.target;
    if (name.includes("address-search")) {
      name = name.split(" ")[0];
    }
    console.log(name);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  console.log(isCreateRide);

  return (
    <>
      <div className="flex  flex-row  bg-white justify-center items-center h-[90vh] w-[100vw] -mt-8 space-x-8">
        {isConfirmRide ? (
          <div className="my-3 flex flex-col justify-center">
            <div className="relative mx-auto mt-6 animate-[propel_5s_infinite]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="cornflowerblue"
                className="h-16 w-16"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </div>
            <h1 className="pl-10">Waiting for driver to accept your request</h1>
          </div>
        ) : (
          <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-gray-300 border-2  pl-10 pr-10 pb-6 pt-6 rounded-lg bg-white w-[25vw]">
            <div className=" mb-6">
              <h2 className="text-xl font-semibold">{"Get a Ride"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full  max-w-lg">
              <div className="flex flex-row ">
                {/* <TbCircleDotFilled size={30}/>  */}
                <AddressAutofill
                  accessToken={mapboxgl.accessToken}
                  options={{
                    language: "en",
                    country: "IN",
                  }}
                  theme={{
                    variables: {
                      fontFamily: "sans-serif",
                      unit: "12px",
                      padding: "0.5em",
                      borderRadius: "0.25em",
                      boxShadow: "1px 2px 2px 1px silver",
                    },
                  }}
                >
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
                </AddressAutofill>
              </div>
              <div>
                <AddressAutofill
                  accessToken={mapboxgl.accessToken}
                  options={{
                    language: "en",
                    country: "IN",
                  }}
                  theme={{
                    variables: {
                      fontFamily: "sans-serif",
                      unit: "12px",
                      padding: "0.5em",
                      borderRadius: "0.25em",
                      boxShadow: "1px 2px 2px 1px silver",
                    },
                  }}
                >
                  <FormInput
                    label="Drop Location"
                    name="dropLocation"
                    type="text"
                    value={formData.dropLocation}
                    onChange={handleChange}
                    required
                    error={formErrors.password}
                    autoComplete="street-address"
                    width={72}
                  />
                </AddressAutofill>
              </div>

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
        )}
        {isCreateRide && (
          <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-gray-300 border-2  pl-10 pr-10 pb-6 pt-6 rounded-lg bg-white w-[25vw]">
            <div className=" mb-2">
              <h2 className="text-xl font-semibold">{"Request a Ride"}</h2>
            </div>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="shadow-md p-2">
                Pickup: {formData.pickupLocation}
              </div>
              <div className="shadow-md p-2">
                Dropoff: {formData.dropLocation}
              </div>
              <div className="shadow-md p-2">
                Distance: {distanceToKm(childDistance!)}
              </div>
              <div className="shadow-md p-2">
                Duration: {durationToMinutes(childDuration!)}
              </div>
              <form action="" onSubmit={handleConfirmSubmit}>
                <label
                  htmlFor="visitors"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount Pay:{" "}
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Amount to be Pay"
                  value={formData.amount}
                  onChange={handleChange}
                  name="amount"
                  required
                  // isConfirmRide disabled
                ></input>
                <div className="flex items-center justify-center pt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={() => {
                      // const errors = validateForm(formData, fieldsToValidate);
                      // setFormErrors(errors);
                    }}
                  >
                    Confirm Ride
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
