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
      {/* 옷 상세 정보 */}
      <div className="clothing-info-section">
        <h4>★ 옷 상세 정보</h4>
        <ul>
          <li>※ 아우터: {recommendation.outerSmallCategory || "정보 없음"} (색상: {recommendation.outerColor || "정보 없음"})</li>
          <li>※ 상의: {recommendation.topSmallCategory || "정보 없음"} (색상: {recommendation.topColor || "정보 없음"})</li>
          <li>※ 하의: {recommendation.bottomSmallCategory || "정보 없음"} (색상: {recommendation.bottomColor || "정보 없음"})</li>
        </ul>
      </div>

      {/* 옷차림 피드백 */}
      <div className="feedback-section">
        <h4>★ 옷차림 피드백</h4>
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
        <h5>＊옷을 클릭하여 두께를 수정할 수 있습니다.</h5>
      </div>

      {/* 옷 이미지 섹션 */}
      <div className="clothing-image-section">
        <img
          src={recommendation.outerImgPath || "/images/placeholder_outer.png"}
          alt="Outerwear"
          className="clothing-item"
        />
        <img
          src={recommendation.topImgPath || "/images/placeholder_top.png"}
          alt="Top"
          className="clothing-item"
        />
        <img
          src={recommendation.bottomImgPath || "/images/placeholder_bottom.png"}
          alt="Bottom"
          className="clothing-item"
        />
      </div>

      {/* 완료 버튼 */}
      <button className="submit-button" onClick={handleSubmit}>
        완료
      </button>
    </div>
  );
};

export default PopupContent;
