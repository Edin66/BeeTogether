import React from "react";

import "./Pages.css";
import Location from "../components/Specific Location/Location";
import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";

const LocationPage = () => {
  return (
    <PageWrapperComponent>
      <Location />
    </PageWrapperComponent>
  );
};

export default LocationPage;
