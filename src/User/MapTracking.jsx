import React from "react";

import {

  MapContainer,
  TileLayer,
  Marker,
  Popup

} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix Marker Icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapTracking() {

  // Example Location
  const latitude = 23.2599;

  const longitude = 77.4126;

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">

        Live Delivery Tracking 🚚

      </h1>

      <div className="rounded-3xl overflow-hidden shadow-2xl">

        <MapContainer

          center={[latitude, longitude]}

          zoom={13}

          style={{

            height: "600px",

            width: "100%"
          }}
        >

          {/* MAP */}
          <TileLayer

            attribution='&copy; OpenStreetMap contributors'

            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* DELIVERY BOY */}
          <Marker

            position={[latitude, longitude]}
          >

            <Popup>

              Delivery Boy 🚚

              <br />

              Arriving in 10 mins

            </Popup>

          </Marker>

        </MapContainer>

      </div>

    </div>
  );
}

export default MapTracking;