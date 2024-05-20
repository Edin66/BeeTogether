import React from "react";
import { Link } from "react-router-dom";

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
          <Link to="/">Best Areas</Link>
        </li>
        <li className="navbar-item">
          <Link to="/medicine">Medicine</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
