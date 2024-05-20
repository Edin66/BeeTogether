import React from "react";

import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";
import RegisterForm from "../components/Forms/RegisterForm";
import "./Pages.css";

const Register = () => {
  return (
    <PageWrapperComponent>
      <section className="form-container">
        <RegisterForm />
      </section>
    </PageWrapperComponent>
  );
};

export default Register;
