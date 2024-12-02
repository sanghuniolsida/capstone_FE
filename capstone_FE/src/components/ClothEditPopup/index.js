import React, { useState } from "react";
import axios from "axios";
import "./ClothEditPopup.css";

const ClothEditPopup = ({ item, onClose }) => {
  const [largeCategory, setLargeCategory] = useState(item.largeCategory || "");
  const [smallCategory, setSmallCategory] = useState(item.smallCategory || "");
  const [color, setColor] = useState(item.color || "");
  const [degree, setDegree] = useState(item.degree || "");
  const [isProcessing, setIsProcessing] = useState(false); 

  const largeCategoryOptions = ["OUTER", "TOP", "BOTTOM"];
  const smallCategoryOptions = {
    OUTER: ["CARDIGAN", "DENIM_JACKET", "BLOUSON", "BLAZER", "HOODED", "MA1", "STADIUM_JACKET", "LEATHER_JACKET", "JACKET", "COAT", "PADDING"],
    TOP: ["T_SHIRT", "POLO_SHIRT", "LONG_SLEEVE", "D_SHIRT", "HOODIE", "SWEAT_SHIRT", "KNIT"],
    BOTTOM: ["JEANS", "SWEAT_PANTS", "COTTON_PANTS", "SLACKS", "LINEN_PANTS", "SHORTS"],
  };
  const colorOptions = ["CHARCOAL", "LIGHTGREY", "BLUE", "NAVY", "GREEN", "BLACK", "WHITE", "BEIGE", "RED", "BROWN", "OLIVE", "LIGHTBLUE", "DEEPBLUE", "KHAKI", "CREAM"];
  const degreeOptions = ["THIN", "LTHIN", "NORMAL", "LTHICK", "THICK"];

  const handleUpdateClick = async () => {
    if (!item.clothId) {
      alert("수정할 아이템의 ID가 없습니다.");
      return;
    }

    const updatedData = { largeCategory, smallCategory, color, degree };

    try {
      setIsProcessing(true);
      await axios.patch(`https://moipzy.shop/moipzy/clothes/${item.clothId}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("선택한 옷 정보가 성공적으로 수정되었습니다.");
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("수정 실패:", error.response || error.message);
      alert("선택한 옷 정보 수정 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!item.clothId) {
      alert("삭제할 아이템의 ID가 없습니다.");
      return;
    }

    const confirmDelete = window.confirm("정말로 이 옷을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      setIsProcessing(true);
      await axios.delete(`https://moipzy.shop/moipzy/clothes/${item.clothId}`);
      alert("선택한 옷이 성공적으로 삭제되었습니다.");
      window.location.reload(); 
    } catch (error) {
      console.error("삭제 실패:", error.response || error.message);
      alert("선택한 옷 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cloth-edit-popup-overlay">
      <div className="cloth-edit-popup">
        <div className="popup-header">
          <h3>옷 정보 수정/삭제</h3>
          <button onClick={onClose} className="close-button" disabled={isProcessing}>
            X
          </button>
        </div>
        <div className="popup-content">
          <div className="image-preview">
            <img src={`https://moipzy.shop${item.imgUrl}`} alt="옷 이미지" onError={(e) => (e.target.src = "/images/placeholder.png")} />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>대분류</label>
              <select value={largeCategory} onChange={(e) => { setLargeCategory(e.target.value); setSmallCategory(""); }}>
                <option value="">선택</option>
                {largeCategoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>소분류</label>
              <select value={smallCategory} onChange={(e) => setSmallCategory(e.target.value)} disabled={!largeCategory}>
                <option value="">선택</option>
                {largeCategory && smallCategoryOptions[largeCategory].map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>색상</label>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">선택</option>
                {colorOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>두께</label>
              <select value={degree} onChange={(e) => setDegree(e.target.value)}>
                <option value="">선택</option>
                {degreeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="popup-actions">
          <button onClick={handleDeleteClick} className="delete-button" disabled={isProcessing}>
            삭제
          </button>
          <button onClick={handleUpdateClick} className="update-button" disabled={isProcessing}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClothEditPopup;
