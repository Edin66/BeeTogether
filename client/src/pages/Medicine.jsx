import React from "react";

import "./Pages.css";
import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";
import MedicineForm from "../components/Forms/MedicineForm";

const Medicine = () => {
  return (
    <PageWrapperComponent>
      <section className="form-container">
        <MedicineForm />
      </section>
    </PageWrapperComponent>
  );
};

export default Medicine;
