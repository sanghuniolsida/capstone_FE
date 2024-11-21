import React from "react";
import ReactDOM from "react-dom";
import "./Popup.css";

const Popup = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close-button" onClick={onClose}>
          닫기
        </button>
        {content}
      </div>
    </div>,
    document.getElementById("popup-root")
  );
};

export default Popup;
