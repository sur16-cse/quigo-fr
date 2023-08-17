import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import mapboxgl from "mapbox-gl";
import { TbCircleDotFilled } from "react-icons/tb";
import { RiderMapBoxProps, coordinates } from "@/lib/types";
import { toast } from "react-hot-toast";

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

interface MapProps {
  pickupCoordinates: RiderMapBoxProps["pickupCoordinates"];
  dropoffCoordinates: RiderMapBoxProps["dropoffCoordinates"];
  setChildDistance: React.Dispatch<React.SetStateAction<number | null>>;
  setChildDuration: React.Dispatch<React.SetStateAction<number | null>>;
}

const Map = ({
  pickupCoordinates,
  dropoffCoordinates,
  setChildDistance,
  setChildDuration,
}: MapProps): JSX.Element => {
  const [location, setLocation] = useState(defaultRiderMapBoxProps.location);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<mapboxgl.Map | null>(null); // Create a ref to hold the map instance
  const [zoom, setZoom] = useState(defaultRiderMapBoxProps.zoom);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
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

      const map = mapRef.current; // Get the map instance from the ref
      map.on("load", () => {
        setLoading(false);
      });

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
        drawRoute(map, [pickupCoordinates, dropoffCoordinates]);
      }
    }
  }, [pickupCoordinates, dropoffCoordinates, location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
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

  // draw routes on a Mapbox GL map
  const drawRoute = (map: mapboxgl.Map, route: any) => {
    const existingLayer = map.getLayer("route");

    if (existingLayer) {
      // Remove the existing "route" layer
      map.removeLayer("route");
      map.removeSource("route");
    }

    const query = fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${route[0].lng},${route[0].lat};${route[1].lng},${route[1].lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((response) => {
        // throw error
        if (response.code === "InvalidInput") {
          toast.error(response.message);
          return;
        }
        else if(response.code === "NoRoute"){
          toast.error(response.message);
          return;
        }
        console.log(response);
        const data = response.routes[0];
        const distance = data.distance;
        const duration = data.duration;
        setChildDistance(distance);
        setChildDuration(duration);
        const route = data.geometry.coordinates;

        const geojson: any = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        // Add the new "route" layer
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      })
     
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
