import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ pickupCoordinates, dropoffCoordinates }: any) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<mapboxgl.Map | null>(null); // Create a ref to hold the map instance

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location.longitude !== 0 && location.latitude !== 0) {
      if (!mapRef.current) {
        // If the map is not initialized, create it
        const map = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/mapbox/streets-v12", // style URL
          center: [location.longitude, location.latitude], // starting position [lng, lat]
          zoom: 7, // starting zoom
        });
        mapRef.current = map; // Save the map instance in the ref
      }

      const map = mapRef.current; // Get the map instance from the ref

      if (pickupCoordinates.lng && pickupCoordinates.lat) {
        console.log(pickupCoordinates);
        addToMap(map, pickupCoordinates);
      }

      if (dropoffCoordinates.lng && dropoffCoordinates.lat) {
        console.log(dropoffCoordinates);
        addToMap(map, dropoffCoordinates);
      }

      if (
        pickupCoordinates.lng &&
        dropoffCoordinates.lat &&
        pickupCoordinates.lat &&
        dropoffCoordinates.lng
      ) {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([pickupCoordinates.lng, pickupCoordinates.lat]);
        bounds.extend([dropoffCoordinates.lng, dropoffCoordinates.lat]);
        map.fitBounds(bounds, {
          padding: 100,
        });
      }
    }
  }, [
    pickupCoordinates,
    dropoffCoordinates,
    location.longitude,
    location.latitude,
  ]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const addToMap = (map: mapboxgl.Map, coordinates: mapboxgl.LngLatLike) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };

  return (
    <div className="flex justify-center items-center w-[70vw] bg-slate-500">
      {loading ? (
        <div className="text-white text-2xl">Loading...</div>
      ) : (
        <div id="map" className="w-[70vw] h-[90vh]"></div>
      )}
    </div>
  );
};

export default Map;
