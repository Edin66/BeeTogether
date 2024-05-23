import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/AuthProvider";
import "./UserInformation.css";

const UserInformation = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="user-profile">
      {user ? (
        <>
          <h1 className="user-profile-title">Your Profile</h1>
          <p className="user-profile-item">
            Full Name: <span>{user.fullName}</span>
          </p>
          <p className="user-profile-item">
            Email: <span>{user.email}</span>
          </p>
          <p className="user-profile-item">
            Phone Number: <span>{user.phoneNumber}</span>
          </p>
          <div className="logout-container">
            <button className="logout-button" onClick={onLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </>
      ) : (
        <p>User information not available.</p>
      )}
    </div>
  );
};

export default UserInformation;
