import React, { useEffect, useState } from "react";
import "./Feedback.css";
import axios from "axios";

const Feedback = ({ userId, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    // 등록했던 옷차림 불러오기 API 호출
    const fetchClothingStyle = async () => {
      try {
        const response = await axios.get(`https://moipzy.shop/moipzy/style/${userId}`);
        setRecommendation(response.data); // 옷차림 데이터 저장
      } catch (error) {
        console.error("옷차림 데이터 요청 실패:", error.response || error.message);
        alert("옷차림 데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchClothingStyle();
  }, [userId]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async () => {
    if (!recommendation) {
      alert("옷차림 데이터가 없습니다. 다시 시도해 주세요.");
      return;
    }

    try {
      // 피드백 저장 API 호출 (PATCH)
      const feedbackData = {
        styleId: recommendation.styleId,
        outerId: recommendation.outerId,
        topId: recommendation.topId,
        bottomId: recommendation.bottomId,
        feedback: feedback.toUpperCase(), // "HOT", "SATISFIED", "COLD"
      };

      await axios.patch("https://moipzy.shop/moipzy/style/feedback", feedbackData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("피드백 저장 완료!");
      onClose(); // 팝업 닫기
    } catch (error) {
      console.error("피드백 저장 실패:", error.response || error.message);
      alert("피드백 저장 중 오류가 발생했습니다.");
    }
  };

  if (!recommendation) {
    return <div className="feedback-layout">로딩 중...</div>;
  }

  return (
    <div className="feedback-layout">
      {/* 옷 상세 정보 */}
      <div className="clothing-info-section">
        <h4>★ 옷 상세 정보</h4>
        <ul>
          <li>※ 아우터: {recommendation.outerId ? "등록됨" : "정보 없음"}</li>
          <li>※ 상의: {recommendation.topId ? "등록됨" : "정보 없음"}</li>
          <li>※ 하의: {recommendation.bottomId ? "등록됨" : "정보 없음"}</li>
          <li>※ 최고 온도: {recommendation.highTemp || "정보 없음"}°C</li>
          <li>※ 최저 온도: {recommendation.lowTemp || "정보 없음"}°C</li>
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
      </div>

      <div className="button-section">
        <button className="submit-button" onClick={handleFeedbackSubmit}>
          피드백 등록
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

export default Feedback;
