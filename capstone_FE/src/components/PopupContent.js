import React, { useState } from "react";
import "./PopupContent.css";
import axios from "axios";

const PopupContent = ({ recommendation, onSubmit, onClose }) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async () => {
    try {
      // 피드백 저장 API 호출 (PATCH)
      const feedbackData = {
        styleId: recommendation.styleId,
        outerId: recommendation.outerId,
        topId: recommendation.topId,
        bottomId: recommendation.bottomId,
        feedback: feedback.toUpperCase(), // "더움", "만족", "추움" -> "HOT", "SATISFIED", "COLD"
      };

      await axios.patch("https://moipzy.shop/moipzy/style/feedback", feedbackData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("피드백이 성공적으로 저장되었습니다.");

      // 부모 컴포넌트로 전달 후 팝업 닫기
      onSubmit({ recommendation, feedback });
      onClose();
    } catch (error) {
      console.error("피드백 저장 실패:", error.response || error.message);
      alert("피드백 저장 중 오류가 발생했습니다.");
    }
  };

  const handleTodayMoipzySubmit = async () => {
    try {
      // 오늘 입은 옷차림 저장 API 호출 (POST)
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
      const wearData = {
        userId: localStorage.getItem("userId"),
        outerId: recommendation.outerId,
        topId: recommendation.topId,
        bottomId: recommendation.bottomId,
        highTemp: Math.round(recommendation.highTemp || 0), // 반올림된 최고 온도
        lowTemp: Math.round(recommendation.lowTemp || 0), // 반올림된 최저 온도
        wearAt: today, // 오늘 날짜
      };

      await axios.post("https://moipzy.shop/moipzy/style", wearData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("오늘 입은 옷차림이 성공적으로 저장되었습니다.");

      // 부모 컴포넌트로 전달 후 팝업 닫기
      onClose();
    } catch (error) {
      console.error("오늘 입은 옷차림 저장 실패:", error.response || error.message);
      alert("오늘 입은 옷차림 저장 중 오류가 발생했습니다.");
    }
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
              value="HOT"
              onChange={handleFeedbackChange}
            />
            HOT
          </label>
          <label>
            <input
              type="radio"
              name="feedback"
              value="SATISFIED"
              onChange={handleFeedbackChange}
            />
            SATISFIED
          </label>
          <label>
            <input
              type="radio"
              name="feedback"
              value="COLD"
              onChange={handleFeedbackChange}
            />
            COLD
          </label>
        </div>
        <h5>＊옷을 클릭하여 두께를 수정할 수 있습니다.</h5>
      </div>

      {/* 버튼 섹션 */}
      <div className="button-section">
        <button className="submit-button" onClick={handleFeedbackSubmit}>
          피드백 등록
        </button>
        <button className="submit-button" onClick={handleTodayMoipzySubmit}>
          TODAY MOIPZY
        </button>
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
    </div>
  );
};

export default PopupContent;