import React from "react";

import "./LocationBeekeeper.css";

const LocationBeekeeper = ({ user }) => {
  return (
    <div className="beekeeper-profile">
      <h1 className="beekeeper-profile-title">Contact Beekeeper</h1>
      <p className="beekeeper-profile-item">
        Full Name: <span>{user.fullName}</span>
      </p>
      <p className="beekeeper-profile-item">
        Email: <span>{user.email}</span>
      </p>
      <p className="beekeeper-profile-item">
        Phone Number: <span>{user.phoneNumber}</span>
      </p>
    </div>
  );
};

export default LocationBeekeeper;
