"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { getDemoLocations } from "@/lib/demo-locations";

function makeMarkerIcon(letter, background) {
  return L.divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border:2px solid white;border-radius:9999px;background:${background};color:white;font-size:14px;font-weight:700;box-shadow:0 1px 5px rgba(0,0,0,.35)">${letter}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

const courierIcon = makeMarkerIcon("C", "#2563eb");
const deliveryIcon = makeMarkerIcon("D", "#e11d48");

function FitMapToMarkers({ courierPosition, deliveryPosition }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([courierPosition, deliveryPosition]);

    map.fitBounds(bounds, {
      padding: [36, 36],
      maxZoom: 15,
    });
  }, [map, courierPosition, deliveryPosition]);

  return null;
}

export default function DeliveryMap({ neighbourhood }) {
  const locations = getDemoLocations(neighbourhood);

  return (
    <MapContainer
      center={locations.deliveryPosition}
      zoom={13}
      style={{ height: "360px", width: "100%" }}
      className="z-0 overflow-hidden rounded-xl shadow-md"
      aria-label="Map showing demonstration courier and delivery locations"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FitMapToMarkers
        courierPosition={locations.courierPosition}
        deliveryPosition={locations.deliveryPosition}
      />

      <Marker
        position={locations.courierPosition}
        icon={courierIcon}
        title="Courier location (demo)"
      >
        <Popup>{locations.courierDescription}</Popup>
      </Marker>

      <Marker
        position={locations.deliveryPosition}
        icon={deliveryIcon}
        title="Delivery location (demo)"
      >
        <Popup>{locations.deliveryDescription}</Popup>
      </Marker>
    </MapContainer>
  );
}
