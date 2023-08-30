"use client"
import { useState, useEffect } from "react";
import { getData, putData } from "@/domain/api";
import { useRouter } from "next/navigation";

const DriverRidePage = () => {
    const [ride, setRide] = useState<any>();
    const router = useRouter();

    const fetchRide = async () => {
        try {
            if (ride?.ID) { // Check if ride.ID is defined
                const data = await getData('/driver/rides/', {}, ride.ID);
                setRide(data.ride_details);
            }
        } catch (error) {
            console.error("Error fetching ride:", error);
        }
    }

    const startRide = async () => {
        try {
            await putData(`driver/rides/${ride.id}`, {}, 'start' );
            fetchRide(); // Refresh the ride details
        } catch (error) {
            console.error("Error starting ride:", error);
        }
    }

    const cancelRide = async () => {
        try {
            await putData(`driver/rides/${ride.id}`, {}, 'cancel' );
            fetchRide(); // Refresh the ride details
        } catch (error) {
            console.error("Error cancelling ride:", error);
        }
    }

    const completeRide = async () => {
        try {
            await putData(`driver/rides/${ride.id}`, {}, 'complete' );
            fetchRide(); // Refresh the ride details
        } catch (error) {
            console.error("Error completing ride:", error);
        }
    }


    useEffect(() => {
        const storedRide = window.localStorage.getItem('ride');
        if (storedRide) {
            setRide(JSON.parse(storedRide));
        }
    }, []);

    useEffect(() => {
        if (ride) {
            fetchRide();
        }
    }, [ride]);

    {console.log(ride)}

    return (
            ride?<div className='bg-white shadow-md rounded-lg p-6 border border-gray-300'>
                <h1 className='text-3xl font-bold mb-4'>Ride Details</h1>
                
                <div>
                    <p>Origin: {ride.origin}</p>
                    <p>Destination: {ride.destination}</p>
                    <p>Duration: {ride.duration} min</p>
                    <p>Distance: {ride.distance} KM</p>
                    <p>Fare: Rs {ride.price}</p>
                    <p>Payment : {ride.payment_status}</p>
                </div>
                <div className='mt-4'>
                    {ride.ride_status === 'accepted' && (
                        <>
                            <button
                                className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out'
                                onClick={startRide}
                            >
                                Start Ride
                            </button>
                            <button
                                className='ml-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300 ease-in-out'
                                onClick={cancelRide}
                            >
                                Cancel Ride
                            </button>
                        </>
                    )}
                    {
                        ride.ride_status === 'started' && (
                            <button
                                className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out'
                                onClick={completeRide}
                            >
                                Complete
                            </button>
                        )
                    }
                </div>
            </div>:<div className='bg-white shadow-md rounded-lg p-6 border border-gray-300'>
                <h1 className='text-3xl font-bold mb-4'>No Ride</h1>
            </div>
    );
}

export default DriverRidePage;
