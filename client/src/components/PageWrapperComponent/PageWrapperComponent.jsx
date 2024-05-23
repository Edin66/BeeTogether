import React from "react";

import "./PageWrapperComponents.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const PageWrapperComponent = ({ children }) => {
  return (
    <React.Fragment>
      <section className="page-body">
        <Navbar />
        {children}
        <Footer />
      </section>
    </React.Fragment>
  );
};

export default PageWrapperComponent;
