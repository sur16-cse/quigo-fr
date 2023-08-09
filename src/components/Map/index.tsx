import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ pickupCoordinates, dropoffCoordinates }: any) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<mapboxgl.Map | null>(null); // Create a ref to hold the map instance
  const [zoom, setZoom] = useState(9);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

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
          zoom: zoom, // starting zoom
        });
        mapRef.current = map; // Save the map instance in the ref
      }

      const map = mapRef.current; // Get the map instance from the ref
      mapRef.current.on('move', () => {
        
        setZoom(parseInt(mapRef.current!.getZoom().toFixed(2)));
        });

  console.log(zoom)

      if (pickupCoordinates.lng && pickupCoordinates.lat) {
        clearMarkers();
        console.log(pickupCoordinates);
        addToMap(map, pickupCoordinates);
      }

      if (dropoffCoordinates.lng && dropoffCoordinates.lat) {
        clearMarkers();
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
        drawRoute(map, [
          [pickupCoordinates.lng, pickupCoordinates.lat],
          [dropoffCoordinates.lng, dropoffCoordinates.lat],
        ]);

      }
    }
  }, [pickupCoordinates, dropoffCoordinates, location.longitude, location.latitude, zoom]);

  const clearMarkers = () => {
    markers.forEach(marker => marker.remove()); // Remove all existing markers
    setMarkers([]); // Clear the markers array
  };

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
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    setMarkers(prevMarkers => [...prevMarkers, marker]);
  };

 // draw routes on a Maplibre GL (Mapbox GL) map
  // draw routes on a Mapbox GL map
const drawRoute = (map: mapboxgl.Map, route: any) => {
  // Calculate the mid-point of the route
  const midPoint = [
    (route[0][0] + route[1][0]) / 2,
    (route[0][1] + route[1][1]) / 2,
  ];

  // Create a curved path using quadratic bezier curve
  const curvedRoute = [
    route[0],
    midPoint,
    route[1]
  ];

  // check if the route is already loaded
  if (map.getSource("route")) {
    map.removeLayer("route");
    map.removeSource("route");
  } else {
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: curvedRoute,
          },
        },
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#ffc617",
        "line-width": 8,
        "line-opacity": 0.8,
        "line-dasharray": [0.5, 2], // Custom dash pattern to simulate a curve
      },
    });
  }
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
