import React from "react";
import "./PopupContent.css";
import axios from "axios";

const PopupContent = ({ recommendation, onClose }) => {
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
      alert("오늘 입은 옷차림으로 등록 됐습니다!");

      // 팝업 닫기
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
        {/* 추가 문구 */}
        <p className="recommendation-text">👍 이너는 흰색or검정색 반팔 추천!</p>
        <p className="recommendation-text">👍 신발은 하의 색상과 비슷한 계열로 추천!</p>
      </div>

      <div className="button-section">
        <button className="submit-button" onClick={handleTodayMoipzySubmit}>
          TODAY MOIPZY
        </button>
      </div>

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