import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../../components2/Sidebar";
import "./Mycloth.css";

const Mycloth = () => {
  const [clothesData, setClothesData] = useState([]); // 전체 옷 데이터
  const [errorMessage, setErrorMessage] = useState(null);

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const outerRef = useRef(null);

  // 옷 데이터를 가져오는 함수
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const userId = 2; // 실제 userId
        const response = await axios.get(
          `https://moipzy.shop/moipzy/clothes/${userId}`
        );
        console.log("옷 데이터:", response.data);
        setClothesData(response.data); // 옷 데이터 설정
      } catch (err) {
        console.error("오류 발생:", err);
        setErrorMessage("옷 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchClothes();
  }, []);

  // 이미지 경로를 전체 URL로 변환
  const getFullImageUrl = (url) => {
    if (!url) return "";
    return `https://moipzy.shop${url}`;
  };

  // 슬라이드 기능
  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Sidebar>
      <div className="mycloth-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* 상의 */}
        <div className="clothing-section">
          <h3>● 상의</h3>
          <div className="arrow left" onClick={() => scrollLeft(topRef)}>
            ◀
          </div>
          <div className="clothing-box" ref={topRef}>
            {clothesData
              .filter((item) => item.largeCategory === "TOP")
              .map((item, index) => (
                <div className="clothing-item" key={index}>
                  <img
                    src={getFullImageUrl(item.imgUrl)} // imgUrl을 사용
                    alt={`상의 ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png"; // 기본 이미지로 대체
                      console.error(
                        `이미지 로드 실패: ${getFullImageUrl(item.imgUrl)}`
                      );
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="arrow right" onClick={() => scrollRight(topRef)}>
            ▶
          </div>
        </div>

        {/* 하의 */}
        <div className="clothing-section">
          <h3>● 하의</h3>
          <div className="arrow left" onClick={() => scrollLeft(bottomRef)}>
            ◀
          </div>
          <div className="clothing-box" ref={bottomRef}>
            {clothesData
              .filter((item) => item.largeCategory === "BOTTOM")
              .map((item, index) => (
                <div className="clothing-item" key={index}>
                  <img
                    src={getFullImageUrl(item.imgUrl)} // imgUrl을 사용
                    alt={`하의 ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png"; // 기본 이미지로 대체
                      console.error(
                        `이미지 로드 실패: ${getFullImageUrl(item.imgUrl)}`
                      );
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="arrow right" onClick={() => scrollRight(bottomRef)}>
            ▶
          </div>
        </div>

        {/* 아우터 */}
        <div className="clothing-section">
          <h3>● 아우터</h3>
          <div className="arrow left" onClick={() => scrollLeft(outerRef)}>
            ◀
          </div>
          <div className="clothing-box" ref={outerRef}>
            {clothesData
              .filter((item) => item.largeCategory === "OUTER")
              .map((item, index) => (
                <div className="clothing-item" key={index}>
                  <img
                    src={getFullImageUrl(item.imgUrl)} // imgUrl을 사용
                    alt={`아우터 ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png"; // 기본 이미지로 대체
                      console.error(
                        `이미지 로드 실패: ${getFullImageUrl(item.imgUrl)}`
                      );
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="arrow right" onClick={() => scrollRight(outerRef)}>
            ▶
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Mycloth;
