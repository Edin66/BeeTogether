import React from "react";
import Modal from "react-modal";

import "./ConfirmModal.css";

Modal.setAppElement("#root");

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, question }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="confirm-modal"
    overlayClassName="confirm-modal-overlay"
  >
    <h2>Confirm Action</h2>
    <div>{question}?</div>
    <div className="modal-buttons">
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </div>
  </Modal>
);

export default ConfirmModal;
