import React, { useState } from "react";

import "./LocationInfo.css";

const LocationInfo = ({
  dailySurplus,
  numberOfHives,
  pasture,
  duration,
  lat,
  lon,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const handleCoordinatesCopy = () => {
    const coordinatesString = `${lat}, ${lon}`;
    navigator.clipboard
      .writeText(coordinatesString)
      .then(() => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      })
      .catch((error) => {
        console.error("Error copying coordinates:", error);
        // Handle any errors (e.g., permissions denied).
      });
  };
  return (
    <div className="location-info">
      <p>
        <strong>Daily Surplus:</strong> {dailySurplus}
      </p>
      <p>
        <strong>Number of Hives:</strong> {numberOfHives}
      </p>
      <p>
        <strong>Pasture:</strong> {pasture}
      </p>
      <p>
        <strong>Duration:</strong> {duration} days
      </p>
      <p className="clipboard-container">
        <strong>Coordinates:</strong>{" "}
        <span className="copy-coordinates" onClick={handleCoordinatesCopy}>
          {lat}, {lon}
        </span>
        {showMessage && (
          <span className="clipboard-message">Copied to clipboard</span>
        )}
      </p>
    </div>
  );
};

export default LocationInfo;
