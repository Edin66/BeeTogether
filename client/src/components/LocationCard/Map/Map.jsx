import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import "./Map.css";

const Map = ({ coordinates }) => {
  return (
    <MapContainer center={coordinates} zoom={13} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}></Marker>
    </MapContainer>
  );
};

export default Map;
