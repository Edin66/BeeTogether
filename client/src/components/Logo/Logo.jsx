import React from "react";

import logoImage from "../../images/Logo-dark.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" className="logo" />
    </div>
  );
};

export default Logo;
