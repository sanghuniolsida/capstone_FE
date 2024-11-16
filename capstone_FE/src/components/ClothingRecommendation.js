import React from 'react';
import './ClothingRecommendation.css';
import { PiTShirtDuotone, PiPants } from "react-icons/pi";


const ClothingRecommendation = ({ temperature }) => {
  let recommendation1 = "";
  let recommendation2 = "";

  // 기온에 따른 추천 옷차림
  if (temperature >= 28) {
    recommendation1 = "반팔 + 반바지";
    recommendation2 = "피케셔츠 + 반바지";
  } else if (temperature >= 24 && temperature < 28) {
    recommendation1 = "반팔 + 얇은 셔츠 + 반바지";
    recommendation2 = "얇은 롱슬리브 + 반바지";
  } else if (temperature >= 20 && temperature < 24) {
    recommendation1 = "반팔 + 얇은 아우터 + 반바지 또는 긴바지";
    recommendation2 = "보통 긴팔 + 반바지 또는 긴바지";
  } else if (temperature >= 17 && temperature < 20) {
    recommendation1 = "롱슬리브 + 얇은 아우터 + 긴바지";
    recommendation2 = "얇은 스웨터 + 긴바지";
  } else if (temperature >= 14 && temperature < 17) {
    recommendation1 = "롱슬리브 + 보통 아우터 + 긴바지";
    recommendation2 = "보통 스웨터 + 긴바지";
  } else if (temperature >= 11 && temperature < 14) {
    recommendation1 = "보통 셔츠 + 보통 아우터 + 긴바지";
    recommendation2 = "두꺼운 스웨터 + 긴바지";
  } else if (temperature >= 8 && temperature < 11) {
    recommendation1 = "보통 셔츠 + 얇은 코트 + 긴바지";
    recommendation2 = "보통 스웨터 + 보통 아우터 + 긴바지";
  } else if (temperature >= 5 && temperature < 8) {
    recommendation1 = "보통 스웨터 + 두꺼운 아우터 + 긴바지";
    recommendation2 = "두꺼운 스웨터 + 보통 아우터 + 긴바지";
  } else if (temperature < 5) {
    recommendation1 = "두꺼운 스웨터 + 패딩 + 긴바지";
    recommendation2 = "두꺼운 스웨터 + 코트 + 긴바지";
  }

  return (
    <div className="clothing-recommendation">
      <h2>Today's Clothing Recommendation</h2>
      <div className="recommendations">
        <div className="recommendation1">
          <p><PiTShirtDuotone className="icon" />추천 1: {recommendation1}</p>
        </div>
        <div className="recommendation2">
          <p><PiPants className="icon" />추천 2: {recommendation2}</p>
        </div>
      </div>
    </div>
  );  
};

export default ClothingRecommendation;
