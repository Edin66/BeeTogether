import React from "react";
import { useNavigate } from "react-router-dom";

import LocationCard from "../LocationCard/LocationCard";
import "./UserLocations.css";

const UserLocations = ({ user }) => {
  const navigate = useNavigate();

  const handleAddLocation = () => {
    navigate("/add-location");
  };

  return (
    <div className="user-locations">
      <div className="user-locations-header">
        <h2 className="user-locations-title">Locations</h2>
        <button className="add-location-button" onClick={handleAddLocation}>
          Add Location
        </button>
      </div>

      {user.locations ? (
        <div className="location-cards">
          {user.locations.map((location, index) => (
            <LocationCard
              key={index}
              id={location._id}
              title={location.title}
              lat={location.latitude}
              lon={location.longitude}
              dailySurplus={location.dailySurplus}
              className="location-card-item"
            />
          ))}
        </div>
      ) : (
        <p className="no-locations-message">
          No locations found for this user.
        </p>
      )}
    </div>
  );
};

export default UserLocations;
