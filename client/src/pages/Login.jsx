import React from "react";

import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";
import LoginForm from "../components/Forms/LoginForm";
import "./Pages.css";

const Login = () => {
  return (
    <PageWrapperComponent>
      <section className="form-container">
        <LoginForm />
      </section>
    </PageWrapperComponent>
  );
};

export default Login;
