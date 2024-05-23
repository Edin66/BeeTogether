import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmModal from "../Modals/ConfirmModal";
import "./MedicineForm.css";

const MedicineForm = () => {
  const [medicine, setMedicine] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const medicines = [
    "Oxalic Acid",
    "Formic Acid",
    "Amitraz",
    "Fluvalinate",
    "Tau-fluvalinate",
    "Sucrose",
    "Terramycin",
    "Oxytetracycline",
    "Thymol",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };
  const handleConfirm = () => {
    setOrderMessage(`You have ordered ${quantity} units of ${medicine}.`);
    setMedicine("");
    setQuantity("");
    setTimeout(() => {
      setOrderMessage("");
      navigate("/profile");
    }, 2000);
    setIsConfirmOpen(false);
  };

  return (
    <div className="medicine-form">
      <h2>Order Medicine</h2>
      {orderMessage && <p className="order-message">{orderMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="medicine">Choose Medicine:</label>
        <select
          id="medicine"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a medicine
          </option>
          {medicines.map((med, index) => (
            <option key={index} value={med}>
              {med}
            </option>
          ))}
        </select>

        <label htmlFor="quantity">Number of Units:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max="10"
          required
        />
        <button type="submit">Order Medicine</button>
      </form>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onRequestClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        question={`You are about to order \n${quantity} units of ${medicine}`}
      />
    </div>
  );
};

export default MedicineForm;
