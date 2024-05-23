import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Pages.css";
import { isTokenExpired } from "../Service/locationService";
import { AuthContext } from "../store/AuthProvider";
import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";
import MedicineForm from "../components/Forms/MedicineForm";

const Medicine = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isTokenExpired(token)) {
      console.log("Token expired");
      navigate("/login");
    }
  }, [token]);
  return (
    <PageWrapperComponent>
      <section className="form-container">
        <MedicineForm />
      </section>
    </PageWrapperComponent>
  );
};

export default Medicine;
