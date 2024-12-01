import React, { useState } from "react";
import "./ClothEditPopup.css";

const ClothEditPopup = ({ item, onClose, onUpdate, onDelete }) => {
  const [largeCategory, setLargeCategory] = useState(item.largeCategory || "");
  const [smallCategory, setSmallCategory] = useState(item.smallCategory || "");
  const [color, setColor] = useState(item.color || "");
  const [degree, setDegree] = useState(item.degree || "");

  const largeCategoryOptions = ["OUTER", "TOP", "BOTTOM"];
  const smallCategoryOptions = {
    OUTER: [
      "CARDIGAN",
      "DENIM_JACKET",
      "BLOUSON",
      "BLAZER",
      "HOODED",
      "MA1",
      "STADIUM_JACKET",
      "LEATHER_JACKET",
      "JACKET",
      "COAT",
      "PADDING",
    ],
    TOP: [
      "T_SHIRT",
      "POLO_SHIRT",
      "LONG_SLEEVE",
      "D_SHIRT",
      "HOODIE",
      "SWEAT_SHIRT",
      "KNIT",
    ],
    BOTTOM: [
      "JEANS",
      "SWEAT_PANTS",
      "COTTON_PANTS",
      "SLACKS",
      "LINEN_PANTS",
      "SHORTS",
    ],
  };
  const colorOptions = [
    "CHARCOAL",
    "LIGHTGREY",
    "BLUE",
    "NAVY",
    "GREEN",
    "BLACK",
    "WHITE",
    "BEIGE",
    "RED",
    "BROWN",
    "OLIVE",
    "LIGHTBLUE",
    "DEEPBLUE",
    "KHAKI",
    "CREAM",
  ];
  const degreeOptions = ["THIN", "LTHIN", "NORMAL", "LTHICK", "THICK"];

  const handleUpdateClick = () => {
    const updatedData = { largeCategory, smallCategory, color, degree };
    onUpdate(item.id, updatedData);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <div className="cloth-edit-popup-overlay">
      <div className="cloth-edit-popup">
        <div className="popup-header">
          <h3>옷 정보 수정/삭제</h3>
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>
        <div className="popup-content">
          <div className="image-preview">
            <img
              src={`https://moipzy.shop${item.imgUrl}`}
              alt="옷 이미지"
              onError={(e) => (e.target.src = "/images/placeholder.png")}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>대분류</label>
              <select
                value={largeCategory}
                onChange={(e) => {
                  setLargeCategory(e.target.value);
                  setSmallCategory(""); 
                }}
              >
                <option value="">선택</option>
                {largeCategoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>소분류</label>
              <select
                value={smallCategory}
                onChange={(e) => setSmallCategory(e.target.value)}
                disabled={!largeCategory}
              >
                <option value="">선택</option>
                {largeCategory &&
                  smallCategoryOptions[largeCategory].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>색상</label>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">선택</option>
                {colorOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>두께</label>
              <select value={degree} onChange={(e) => setDegree(e.target.value)}>
                <option value="">선택</option>
                {degreeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="popup-actions">
          <button onClick={handleDeleteClick} className="delete-button">
            삭제
          </button>
          <button onClick={handleUpdateClick} className="update-button">
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClothEditPopup;
