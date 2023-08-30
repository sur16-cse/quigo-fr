"use client";
import FormInput from "@/components/FormInput";
import { validateForm } from "@/utils/validateForm";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { loadComponents } from "next/dist/server/load-components";
import Map from "@/components/Map";
import { TbCircleDotFilled } from "react-icons/tb";
import {
  AccedptedRideDetails,
  RiderHomePageProps,
  coordinates,
} from "@/lib/types";
import dynamic from "next/dynamic";
import { RiderMapBoxProps } from "@/lib/types";
import { distanceToKm, durationToMinutes } from "@/utils/conversion";
import toast from "react-hot-toast";
import { getData, postData } from "@/domain/api";

const defaultCoordinates: coordinates = {
  lat: 0,
  lng: 0,
};

const defaultAcceptedRideDetails: AccedptedRideDetails = {
  driver_name: "",
  driver_number: "",
  origin: "",
  destination: "",
  duration: "",
  distance: "",
  price: "",
  ride_status: "",
  payment_status: "",
};

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

const HomePage = () => {
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

  const [childDistance, setChildDistance] =
    useState<RiderMapBoxProps["distance"]>(null);
  const [childDuration, setChildDuration] =
    useState<RiderMapBoxProps["duration"]>(null);
  const [isStatus, setIsStatus] = useState(null);
  const [riderId, setRiderId] = useState(null);
  const [rideDetails, setRideDetails] = useState({
    ...defaultAcceptedRideDetails,
  });

  useEffect(() => {
    const id = window.localStorage.getItem("riderId");
    console.log(id);

    let hasFetchedCoordinates = false; // Flag to track whether coordinates have been fetched

    const fetchData = async () => {
      if (id !== null) {
        const res = await getData("/rider/rides/", {}, id);
        console.log(res);
        if (res.rideStatus !== "requested" && res.rideStatus !== null) {
          console.log("accepted");
          setIsConfirmRide(true);
        } else if (res.rideStatus === "requested") {
          console.log("requested");
          setIsCreateRide(true);
          setIsConfirmRide(true);
        }
        setIsStatus(res.rideStatus);
        if (res.rideStatus !== null) {
          setRideDetails(res.ride_details);

          // Call getTravelLocationCoordinates only if not fetched already
          if (!hasFetchedCoordinates) {
            getTravelLocationCoordinates(
              res.ride_details.origin,
              res.ride_details.destination
            );
            hasFetchedCoordinates = true; // Set the flag to true after fetching
          }
        }
        if (res.rideStatus === "rejected") {
          toast(res.message);
          clearInterval(interval);
        }
      }
    };

    fetchData(); // Load data immediately

    const interval = setInterval(fetchData, 15000); // Fetch data every 15 seconds

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [isConfirmRide,isCreateRide]);


console.log(isCreateRide)
console.log(isStatus)
console.log(isConfirmRide)
  console.log(rideDetails);

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

  const handleConfirmSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleConfirmSubmit");
    console.log(isCreateRide)
    if (isCreateRide && formData.amount != 0) {
      const riderRequestData = {
        origin: formData.pickupLocation,
        destination: formData.dropLocation,
        from_lng: pickupCoordinates.lng.toString,
        from_lat: pickupCoordinates.lat.toString,
        to_lng: dropoffCoordinates.lng.toString,
        to_lat: dropoffCoordinates.lat.toString,
        duration: childDuration?.toString(),
        distance: childDistance?.toString(),
        amount: formData.amount.toString(),
      };
      let data = await postData(riderRequestData, "/rider/ride");
      console.log(data);
      if (data.status === "success") {
        setIsConfirmRide(true);
        setRiderId(data.ride_details.ID);
        window.localStorage.setItem("riderId", data.ride_details.ID);
        console.log(data.ride_details.RideStatus);
        setIsStatus(data.ride_details.RideStatus);
        toast.success(data.message);
        // router.push("/auth/verifyemail");
      } else if (data.status === "fail") {
        toast.error(data.message);
      } else if (data.status === "error") {
        toast.error(data.message);
      }
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
  console.log(isStatus);
  console.log(isConfirmRide)

  return (
    <>
      <div className="flex flex-row w-full bg-black h-[90vh] ">
        <div className="flex  flex-col w-[32vw] bg-white pl-8 space-y-3">
          {isConfirmRide ? (
            isStatus === "requested" ? (
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
                <h1 className="pl-10">
                  Waiting for driver to accept your request
                </h1>
              </div>
            ) : (
              <div className="my-3 flex flex-col justify-center">
                <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-gray-300 border-2  pl-10 pr-10 pb-6 pt-6 rounded-lg bg-white w-[25vw]">
                  <div className=" mb-2">
                    <h2 className="text-xl font-semibold">{"Ride Details"}</h2>
                  </div>
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="shadow-md p-2">
                      <b>Driver Name</b>: {rideDetails.driver_name}
                    </div>
                    <div className="shadow-md p-2">
                      <b>Phone Number</b>: {rideDetails.driver_number}
                    </div>
                    <div className="shadow-md p-2">
                      <b>Origin</b>: {rideDetails.origin}
                    </div>
                    <div className="shadow-md p-2">
                      <b>Destination</b>: {rideDetails.destination}
                    </div>
                    <div className="shadow-md p-2">
                      <b>Distance</b>: {rideDetails.distance}
                    </div>
                    <div className="shadow-md p-2">
                      <b>Duration</b>: {rideDetails.duration}
                    </div>
                    <div className="shadow-md p-2">
                      <b>Amount to pay</b>: {rideDetails.price}
                    </div>
                    <div className="shadow-md p-2">
                      <b>Ride status</b>:{" "}
                      <b className="text-green-600">
                        {rideDetails.ride_status}
                      </b>
                    </div>
                    <div className="shadow-md p-2">
                      <b>Payment status</b>: {rideDetails.payment_status}
                    </div>
                  </div>
                </div>
                {rideDetails.ride_status === "rejected" && (
                  <div className="flex items-center justify-center pt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={() => {
                        localStorage.removeItem("riderId");
                        setIsConfirmRide(false);
                        setIsCreateRide(false);
                        setIsStatus(null);
                        setFormData({ ...defaultFormData });
                        setPickupCoordinates({ ...defaultCoordinates });
                        setDropoffCoordinates({ ...defaultCoordinates });
                        setChildDistance(null);
                        setChildDuration(null);
                        setRideDetails({ ...defaultAcceptedRideDetails });
                      }}
                    >
                      create ride again
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-gray-300 border-2  pl-10 pr-10 pb-6 pt-6 rounded-lg bg-white w-[25vw]">
              <div className=" mb-6">
                <h2 className="text-xl font-semibold">{"Get a Ride"}</h2>
              </div>

              <form onSubmit={handleSubmit} className="w-full  max-w-sm">
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
          
          {isCreateRide && (isStatus === "requested" || isStatus === null) && (
            <div className="shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-gray-300 border-2  pl-10 pr-10 pb-6 pt-6 rounded-lg bg-white w-[25vw]">
              <div className=" mb-2">
                <h2 className="text-xl font-semibold">{"Request a Ride"}</h2>
              </div>
              <div className="flex flex-col space-y-2 text-sm">
                <div className="shadow-md p-2">
                  Pickup: {formData.pickupLocation!==""?formData.pickupLocation: rideDetails.origin}
                </div>
                <div className="shadow-md p-2">
                  Dropoff: {formData.dropLocation!==""? formData.dropLocation: rideDetails.destination}
                </div>
                <div className="shadow-md p-2">
                  Distance:{" "}
                  {distanceToKm(childDistance!) ||
                    distanceToKm(parseFloat(rideDetails.distance))}
                </div>
                <div className="shadow-md p-2">
                  Duration:{" "}
                  {durationToMinutes(childDuration!) ||
                    durationToMinutes(parseFloat(rideDetails.duration))}
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
                    value={formData.amount!==0?formData.amount: rideDetails.price}
                    onChange={handleChange}
                    name="amount"
                    required
                    disabled={isConfirmRide}
                  ></input>
                  {isConfirmRide ? null : (
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
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
        <Map
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          setChildDistance={setChildDistance}
          setChildDuration={setChildDuration}
        />
      </div>
    </>
  );
};

export default HomePage;
