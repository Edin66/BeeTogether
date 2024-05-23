import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../store/AuthProvider";
import InputField from "./InputField/InputField";
import Loader from "../Loader/Loader";
import "./Form.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFailMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/register",
        formData
      );
      if (!response.data.success) {
        setFailMessage(response.data.message);
      } else {
        login(response.data.data.token); //Save token
        console.log("Registration successful:", response.data);
        // Reset the form fields
        setFormData({
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
        });
        setSuccessMessage("Registration successful!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("There was an error registering the user:", error);
      setFailMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {failMessage && <p className="fail-message">{failMessage}</p>}
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <button type="submit" className="form-submit-button" disabled={loading}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login Here!</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
