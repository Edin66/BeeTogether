import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../Logo/Logo";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" activeclassname="active">
            Best Areas
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/medicine" activeclassname="active">
            Medicine
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/profile" activeclassname="active">
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
