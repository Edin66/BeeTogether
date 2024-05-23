import React from "react";
import { useNavigate } from "react-router-dom";

import logoImage from "../../images/Logo-dark.png";
import "./Logo.css";

const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" className="logo" onClick={handleClick} />
    </div>
  );
};

export default Logo;
