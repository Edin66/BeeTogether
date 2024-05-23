import React from "react";
import Modal from "react-modal";

import "./AlertModal.css";

Modal.setAppElement("#root");

const AlertModal = ({ isOpen, onRequestClose, message }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="alert-modal"
    overlayClassName="alert-modal-overlay"
  >
    <h2>Alert</h2>
    <div className="alert-message">{message}</div>

    <button onClick={onRequestClose}>Continue</button>
  </Modal>
);

export default AlertModal;
