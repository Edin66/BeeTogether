import React, { useEffect, useState } from "react";
import axios from "axios";

import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";
import LocationCard from "../components/LocationCard/LocationCard";
import Loader from "../components/Loader/Loader";
import "./Pages.css";

const BestAreas = () => {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:7000/");

        //EXTRACT THE LOCATIONS ARRAY
        const locationsArray = response.data.data.locations;
        setLocations(locationsArray);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false); // Hide loader after request completes
      }
    };

    fetchLocations();
  }, []);
  return (
    <PageWrapperComponent>
      {loading && <Loader />}
      <section id="best-locations">
        {locations &&
          locations.map((location, index) => (
            <LocationCard
              key={index}
              title={location.title}
              lat={location.latitude}
              lon={location.longitude}
              dailySurplus={location.dailySurplus}
            />
          ))}
      </section>
    </PageWrapperComponent>
  );
};

export default BestAreas;
