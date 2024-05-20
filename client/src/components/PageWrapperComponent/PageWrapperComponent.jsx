import React from "react";

import "./PageWrapperComponents.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const PageWrapperComponent = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <section className="page-body">{children}</section>

      <Footer />
    </React.Fragment>
  );
};

export default PageWrapperComponent;
