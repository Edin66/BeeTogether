import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../store/AuthProvider";
import InputField from "./InputField";
import Loader from "../Loader/Loader";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
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
        "http://localhost:7000/login",
        formData
      );
      if (response.data.success) {
        login(response.data.data.token); //Save token
        // Show success message and navigate to home page
        setSuccessMessage("Login successful!");
        setFormData({ email: "", password: "" });
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 2000);
      } else {
        // Show failure message
        setFailMessage(
          "Somethin went wrong! Check your internet connection and try again."
        );
      }
    } catch (error) {
      console.error("There was an error logging in the user:", error);
      setFailMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loader after request completes
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {failMessage && <p className="fail-message">{failMessage}</p>}
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          Login
        </button>
        <p>
          If you don't have an account,{" "}
          <Link to="/register">Register Here!</Link>.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
