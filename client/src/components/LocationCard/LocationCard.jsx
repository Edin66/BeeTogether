import React from "react";
import { Link } from "react-router-dom";

import "./LocationCard.css";
import Map from "./Map/Map";

const LocationCard = (props) => {
  return (
    <div className="location-card">
      <h1 className="card-title">{props.title}</h1>
      <Map lat={props.lat} lon={props.lon} />
      <h2 className="card-number">
        <span>Daily Surplus: </span>
        {props.dailySurplus}kg
      </h2>
      <Link to={`/location/${props.id}`} className="card-btn">
        View Location
      </Link>
    </div>
  );
};

export default LocationCard;
