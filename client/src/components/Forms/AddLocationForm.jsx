import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/AuthProvider";
import InputField from "./InputField";
import "./LoginForm.css";

const AddLocationForm = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    latitude: "",
    longitude: "",
    dailySurplus: "",
    numberOfHives: "",
    pasture: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/add-location",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Location added successfully:", response.data.data);
      if (response.data.success) {
        alert("Location added successfully!");
        navigate("/profile");
      } else {
        alert("Failed to add location. Please try again.");
      }
      // Optionally, you can handle success message or navigation here
    } catch (error) {
      console.error("Error adding location:", error);
      // Optionally, you can handle error message here
    }
  };

  return (
    <form className="add-location-form" onSubmit={handleSubmit}>
      <InputField
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <InputField
        label="Latitude"
        type="text"
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
      />
      <InputField
        label="Longitude"
        type="text"
        name="longitude"
        value={formData.longitude}
        onChange={handleChange}
      />
      <InputField
        label="Daily Surplus"
        type="text"
        name="dailySurplus"
        value={formData.dailySurplus}
        onChange={handleChange}
      />
      <InputField
        label="Number of Hives"
        type="text"
        name="numberOfHives"
        value={formData.numberOfHives}
        onChange={handleChange}
      />
      <InputField
        label="Pasture"
        type="text"
        name="pasture"
        value={formData.pasture}
        onChange={handleChange}
      />
      <InputField
        label="Duration"
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
      />
      <button type="submit">Add Location</button>
    </form>
  );
};

export default AddLocationForm;
