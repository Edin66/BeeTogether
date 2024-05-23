import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import {
  fetchLocation,
  fetchBeekeeper,
  checkOwnership,
} from "../../Service/locationService";

import Map from "../LocationCard/Map/Map";
import Loader from "../Loader/Loader";
import LocationInfo from "./LocationInfo";
import LocationBeekeeper from "./LocationBeekeeper";
import DeleteButton from "./DeleteButton";
import "./Location.css";

const Location = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [beekeeper, setBeekeeper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        const locationData = await fetchLocation(id);
        setLocation(locationData);
        if (locationData && locationData.beekeeper) {
          const beekeeperData = await fetchBeekeeper(locationData.beekeeper);
          setBeekeeper(beekeeperData);
          if (checkOwnership(locationData.beekeeper)) {
            setShowDelete(true);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching location:", error);
        setLoading(false);
      }
    };

    loadLocationData();
  }, [id]);

  return (
    <div className="location-container">
      {loading && <Loader />}
      {location && (
        <>
          <h2 className="location-title">{location.title}</h2>
          <div className="location-info-container">
            <div className="location-map">
              <Map lat={location.latitude} lon={location.longitude} />
            </div>
            <div className="location-info-component">
              <LocationInfo
                dailySurplus={location.dailySurplus}
                numberOfHives={location.numberOfHives}
                pasture={location.pasture}
                duration={location.duration}
                lat={location.latitude}
                lon={location.longitude}
              />
            </div>
          </div>
        </>
      )}
      {beekeeper && <LocationBeekeeper user={beekeeper} />}
      {showDelete && <DeleteButton locationId={location._id} />}
    </div>
  );
};

export default Location;
