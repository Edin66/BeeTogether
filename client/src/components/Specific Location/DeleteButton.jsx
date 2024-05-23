import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ConfirmModal from "../Modals/ConfirmModal";
import "./DeleteButton.css";

const DeleteButton = ({ locationId }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setShowModal(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:7000/delete-location/${locationId}`);
      navigate("/profile");
    } catch (error) {
      console.error("Error deleting location:", error);
    }
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
      <ConfirmModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        question="Are you sure you want to delete this location"
      />
    </>
  );
};

export default DeleteButton;
