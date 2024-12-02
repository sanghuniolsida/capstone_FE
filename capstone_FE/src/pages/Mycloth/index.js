import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../../components2/Sidebar";
import ClothEditPopup from "../../components/ClothEditPopup"; 
import "./Mycloth.css";

const Mycloth = () => {
  const [clothesData, setClothesData] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null); 

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const outerRef = useRef(null);

  // 옷 데이터 가져오기
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const userId = 2; // 실제 userId-> 여기서 하드코딩 됐으므로 동적으로 바꾸면 됨.
        const response = await axios.get(
          `https://moipzy.shop/moipzy/clothes/${userId}`
        );
        setClothesData(response.data);
      } catch (err) {
        console.error("오류 발생:", err);
        setErrorMessage("옷 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchClothes();
  }, []);

  const getFullImageUrl = (url) => {
    if (!url) return "";
    return `https://moipzy.shop${url}`;
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleClothClick = (item) => {
    setSelectedCloth(item);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.patch(`https://moipzy.shop/moipzy/clothes/${id}`, updatedData);
      alert("수정 성공!");
      setSelectedCloth(null);
      setClothesData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      );
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 실패!");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("정말 이 옷을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`https://moipzy.shop/moipzy/clothes/${id}`);
      if (response.status === 200 || response.status === 204) {
        alert("삭제 성공!");
        setSelectedCloth(null); 
        setClothesData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        console.error("삭제 실패: 예상치 못한 응답 상태 코드", response.status);
        alert("삭제 요청이 서버에서 실패했습니다. 다시 시도하세요.");
      }
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 요청 중 오류가 발생했습니다. 인터넷 연결을 확인하세요.");
    }
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
                <div
                  className="clothing-item"
                  key={index}
                  onClick={() => handleClothClick(item)} 
                >
                  <img
                    src={getFullImageUrl(item.imgUrl)}
                    alt={`상의 ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png";
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
                <div
                  className="clothing-item"
                  key={index}
                  onClick={() => handleClothClick(item)} 
                >
                  <img
                    src={getFullImageUrl(item.imgUrl)}
                    alt={`하의 ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png";
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
                <div
                  className="clothing-item"
                  key={index}
                  onClick={() => handleClothClick(item)}
                >
                  <img
                    src={getFullImageUrl(item.imgUrl)}
                    alt={`아우터 ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="arrow right" onClick={() => scrollRight(outerRef)}>
            ▶
          </div>
        </div>

        {selectedCloth && (
          <ClothEditPopup
            item={selectedCloth}
            onClose={() => setSelectedCloth(null)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default Mycloth;
