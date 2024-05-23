import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AlertModal from "../Modals/AlertModal";
import { AuthContext } from "../../store/AuthProvider";
import InputField from "./InputField/InputField";
import "./Form.css";

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
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      if (response.data.success) {
        setAlertMessage("Location added successfully!");
        setShowModal(true);
      } else {
        setAlertMessage("Failed to add location. Please try again.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (alertMessage === "Location added successfully!") {
      navigate("/profile");
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
        type="number"
        name="latitude"
        min="-180"
        max="180"
        value={formData.latitude}
        onChange={handleChange}
      />
      <InputField
        label="Longitude"
        type="number"
        name="longitude"
        min="-180"
        max="180"
        value={formData.longitude}
        onChange={handleChange}
      />
      <InputField
        label="Daily Surplus"
        type="number"
        name="dailySurplus"
        min="0"
        value={formData.dailySurplus}
        onChange={handleChange}
      />
      <InputField
        label="Number of Hives"
        type="number"
        name="numberOfHives"
        min="0"
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
      <button type="submit" className="form-submit-button">
        Add Location
      </button>
      <AlertModal
        isOpen={showModal}
        onRequestClose={handleModalClose}
        message={alertMessage}
      />
    </form>
  );
};

export default AddLocationForm;
