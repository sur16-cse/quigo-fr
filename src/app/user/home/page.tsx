'use client';
import FormInput from '@/components/FormInput';
import { validateForm } from '@/utils/validateForm';
import React from 'react'
import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { loadComponents } from 'next/dist/server/load-components';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const HomePage = () => {

  const defaultFormData = {
    pickupLocation: '',
    dropLocation: '',
  };

  const [location, setLocation] = useState({ latitude: 12.971599, longitude: 77.594566 });
  const [pickupCoordinates, setPickupCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [dropoffCoordinates, setDropoffCoordinates] = useState({ latitude: 0, longitude: 0 });
  

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [location.longitude, location.latitude], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

  const getPickupCoordinates = (pickup: String) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=${mapboxgl.accessToken}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.features[0].center);
        setPickupCoordinates({
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0]
        })
      })
  }

  const getDropoffCoordinates = (dropoff: String) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=${mapboxgl.accessToken}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.features[0].center);
        setDropoffCoordinates({
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0]
        })
      })
  }

  const getTravelLocationCoordinates = (pickup: string, dropoff: string) => {
    getPickupCoordinates(pickup)
    getDropoffCoordinates(dropoff)
  }



  useEffect(() => {
    getLocation();
  }, [location.latitude]);


  const [formData, setFormData] = useState({ ...defaultFormData });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const fieldsToValidate = [
    "pickupLocation",
    "dropLocation",
  ];


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit");

    getTravelLocationCoordinates(formData.pickupLocation, formData.dropLocation);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });

  };

  return (
    <>
      <div className='flex flex-row w-full bg-black h-[90vh] '>
        <div className='flex flex-col w-[30vw] bg-white pl-8 pt-10'>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <FormInput
              label="Pickup Location"
              name="pickupLocation"
              type="text"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              error={formErrors.email}
            />
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
        <div className='flex justify-center items-center w-[70vw] bg-slate-500'>
          <div id="map" className='w-[70vw] h-[90vh]'></div>
        </div>
      </div>
    </>
  )
}

export default HomePage
