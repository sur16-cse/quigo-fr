"use client";
import { useState, useEffect } from "react";
import { getData, putData } from "@/domain/api";
import { useRouter } from "next/navigation";

const DriverHomePage = () => {
    const [rides, setRides] = useState<any>([]);
    const router = useRouter();

    const fetchRides = async () => {
        const data = await getData('/driver/rides', {}, "");
        setRides(data.rides);
    }

    const acceptRide = async (id:string) => {
        const data = await putData('driver/rides',{},id,'accept')
        window.localStorage.setItem('ride', JSON.stringify(data.ride_details));
    }

    useEffect(() => {
        fetchRides();

        const refreshInterval = setInterval(fetchRides, 5000); // Refresh every 5 seconds

        return () => clearInterval(refreshInterval); // Clean up on unmount
    }, []);

    const handleAcceptRide = (ride:any) => {
        console.log(ride)
        acceptRide(ride.id)

        router.push("/driver/ride");
    };

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold mb-6'>List of Available Rides 🚗</h1>
            {rides?.map((ride: any, index: number) => (
                <div
                    key={index}
                    className='bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out'
                >
                    <h2 className='text-xl font-semibold mb-2'>{ride.origin} ➜ {ride.destination}</h2>
                    <div className='text-gray-600'>
                        Duration: {ride.duration} min | Distance: {ride.distance} KM
                    </div>
                    <div className='text-gray-600'>
                        Fare: Rs {ride.price}
                    </div>
                    <button
                        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out'
                        onClick={() => handleAcceptRide(ride)}
                    >
                        Accept Ride
                    </button>
                </div>
            ))}
        </div>
    );
}

export default DriverHomePage;
