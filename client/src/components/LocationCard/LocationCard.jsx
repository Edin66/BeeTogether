import React from "react";

import "./LocationCard.css";
import Map from "./Map/Map";

const LocationCard = (props) => {
  const coordinates = [parseFloat(props.lat), parseFloat(props.lon)];
  return (
    <div className="location-card">
      <h1 className="card-title">{props.title}</h1>
      <Map coordinates={coordinates} />
      <h2 className="card-number">
        <span>Daily Surplus: </span>
        {props.dailySurplus}
      </h2>
      <button className="card-btn">See More</button>
    </div>
  );
};

export default LocationCard;
