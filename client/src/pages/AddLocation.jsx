import React from "react";

import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";
import AddLocationForm from "../components/Forms/AddLocationForm";
import "./Pages.css";

const AddLocation = () => {
  return (
    <PageWrapperComponent>
      <section className="form-container">
        <AddLocationForm />
      </section>
    </PageWrapperComponent>
  );
};

export default AddLocation;
