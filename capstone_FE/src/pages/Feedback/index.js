import React, { useState, useEffect } from "react";
import "./Feedback.css";
import axios from "axios";

const Feedback = ({ onClose }) => {
  const [registeredStyle, setRegisteredStyle] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchStyleData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const todayDate = new Date().toISOString().split("T")[0];
        if (!userId) {
          throw new Error("로그인 정보가 없습니다.");
        }

        const response = await axios.get(
          `https://moipzy.shop/moipzy/style/${userId}?date=${todayDate}`
        );
        setRegisteredStyle(response.data);
      } catch (error) {
        console.error("옷차림 데이터 불러오기 실패:", error.response || error.message);
        alert("옷차림 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchStyleData();
  }, []);

  const handleFeedbackSubmit = async () => {
    try {
      const feedbackData = {
        styleId: registeredStyle.styleId,
        outerId: registeredStyle.outerId,
        topId: registeredStyle.topId,
        bottomId: registeredStyle.bottomId,
        feedback: feedback.toUpperCase(),
      };
      console.log("보낼 데이터:", feedbackData);

      await axios.patch("https://moipzy.shop/moipzy/style/feedback", feedbackData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("피드백 저장 완료!");
      onClose(); 
    } catch (error) {
      console.error("피드백 저장 실패:", error.response || error.message);
      alert("피드백 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="popup-layout1">
      {registeredStyle ? (
        <>
          <div className="clothing-images1">
            <img
              src={`https://moipzy.shop${registeredStyle.outerImgPath}`}
              alt="아우터"
              className="clothing-image1"
            />
            <img
              src={`https://moipzy.shop${registeredStyle.topImgPath}`}
              alt="상의"
              className="clothing-image1"
            />
            <img
              src={`https://moipzy.shop${registeredStyle.bottomImgPath}`}
              alt="하의"
              className="clothing-image1"
            />
          </div>

          <div className="right-section1">
            <div className="feedback-section1">
              <h4>★ 옷차림 피드백</h4>
              <p className="feedback-instruction1">
                오늘의 옷차림은 어땠나요? 다음번 추천은 피드백을 반영하여 추천합니다.
              </p>
              <div className="feedback-options1">
                <label>
                  <input
                    type="radio"
                    name="feedback"
                    value="HOT"
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  HOT
                </label>
                <label>
                  <input
                    type="radio"
                    name="feedback"
                    value="GOOD"
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  GOOD
                </label>
                <label>
                  <input
                    type="radio"
                    name="feedback"
                    value="COLD"
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  COLD
                </label>
              </div>
            </div>
            <div className="button-section1">
              <button className="submit-button1" onClick={handleFeedbackSubmit}>
                피드백 등록
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Feedback;