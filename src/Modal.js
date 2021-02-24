import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const {
    isModalOpen,
    closeModal,
    numberCorrect,
    questions,
  } = useGlobalContext();

  const winLossDivide = 60;
  const percent = ((numberCorrect / questions.length) * 100).toFixed(0);

  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h2>{percent > winLossDivide ? "Congratulations" : "So Sorry"}!</h2>
        <p>
          You answered {percent}
          {"% "}
          of the questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          try again
        </button>
      </div>
    </div>
  );
};

export default Modal;
