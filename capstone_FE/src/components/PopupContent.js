import React, { useState } from "react";
import "./PopupContent.css";

const PopupContent = ({ recommendation, onSubmit, onClose }) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ recommendation, feedback });
  };

  return (
    <div className="popup-layout">
      <div className="clothing-info-section">
        <h4>● 옷 상세 정보</h4>
        <ul>
          <li>아우터: 데님자켓 (두께: 보통)</li>
          <li>상의: 반팔</li>
          <li>하의: 슬랙스 (두께: 약간 얇음)</li>
        </ul>
      </div>

      <div className="feedback-section">
        <h4>● 옷차림 피드백</h4>
        <div className="feedback-options">
          <label>
            <input
              type="radio"
              name="feedback"
              value="더움"
              onChange={handleFeedbackChange}
            />
            더움
          </label>
          <label>
            <input
              type="radio"
              name="feedback"
              value="만족"
              onChange={handleFeedbackChange}
            />
            만족
          </label>
          <label>
            <input
              type="radio"
              name="feedback"
              value="추움"
              onChange={handleFeedbackChange}
            />
            추움
          </label>
        </div>
        <p>옷을 클릭하여 두께를 수정할 수 있습니다.</p>
      </div>

      <div className="clothing-image-section">
        <img src="/images/outerwear.png" alt="Outerwear" className="clothing-item" />
        <img src="/images/top.png" alt="Top" className="clothing-item" />
        <img src="/images/bottom.png" alt="Bottom" className="clothing-item" />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        완료
      </button>
    </div>
  );
};

export default PopupContent;
