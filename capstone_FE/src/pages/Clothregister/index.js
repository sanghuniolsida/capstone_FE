import React, { useState } from "react";
import Sidebar from "../../components2/Sidebar";
import axios from "axios";
import "./Clothregister.css";

const Clothregister = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [largeCategory, setLargeCategory] = useState("");
  const [smallCategory, setSmallCategory] = useState("");
  const [color, setColor] = useState("");
  const [degree, setDegree] = useState("");
  const [link, setLink] = useState("");

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
      "T_SHIRT", // 반팔
      "POLO_SHIRT", // 폴로셔츠
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
      "LINEN_PANTS", // 얇은 바지
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

  // 두께 선택 옵션 동적 설정
  const getDegreeOptions = () => {
    if (largeCategory === "TOP") {
      if (smallCategory === "T_SHIRT" || smallCategory === "POLO_SHIRT") {
        return ["NORMAL"]; // 반팔, 폴로셔츠는 NORMAL만
      } else {
        return ["THIN", "NORMAL", "THICK"]; // 나머지 상의
      }
    } else if (largeCategory === "BOTTOM") {
      if (smallCategory === "LINEN_PANTS") {
        return ["THIN"]; // 얇은 바지는 THIN만
      } else {
        return ["THIN", "LTHIN", "NORMAL", "LTHICK", "THICK"]; // 나머지 하의
      }
    } else if (largeCategory === "OUTER") {
      return ["THIN", "NORMAL", "THICK"]; // 아우터는 3가지
    }
    return []; // 기본값
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !largeCategory || !smallCategory || !color || !degree) {
      alert("모든 필드를 입력하세요!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();
    const clothData = {
      userId: parseInt(userId, 10),
      largeCategory,
      smallCategory,
      color,
      degree,
    };

    formData.append(
      "clothData",
      new Blob([JSON.stringify(clothData)], { type: "application/json" })
    );
    formData.append("clothImg", file);

    try {
      const response = await axios.post(
        "https://moipzy.shop/moipzy/clothes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("옷 등록 성공!");
      console.log("등록 성공:", response.data);
    } catch (error) {
      console.error("등록 실패:", error.response?.data || error.message);
      alert("옷 등록 실패! 다시 시도하세요.");
    }
  };

  return (
    <Sidebar>
      <div className="clothregister-container">
        <div className="left-panel">
          <div className="image-preview">
            {preview ? (
              <img src={preview} alt="옷 미리보기" className="preview-image" />
            ) : (
              <p>이미지를 선택하세요</p>
            )}
          </div>

          <div className="form-group">
            <label>File</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label>Link 입력</label>
            <input
              type="text"
              placeholder="링크를 입력하세요"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>

        <div className="right-panel">
          <div className="grid-container">
            <div className="form-group">
              <label>대분류</label>
              <select
                value={largeCategory}
                onChange={(e) => {
                  setLargeCategory(e.target.value);
                  setSmallCategory(""); // 대분류 변경 시 소분류 초기화
                  setDegree(""); // 두께 초기화
                }}
              >
                <option value="">선택</option>
                <option value="OUTER">아우터</option>
                <option value="TOP">상의</option>
                <option value="BOTTOM">하의</option>
              </select>
            </div>

            <div className="form-group">
              <label>소분류</label>
              <select
                value={smallCategory}
                onChange={(e) => {
                  setSmallCategory(e.target.value);
                  setDegree(""); // 소분류 변경 시 두께 초기화
                }}
                disabled={!largeCategory}
              >
                <option value="">선택</option>
                {largeCategory &&
                  smallCategoryOptions[largeCategory].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>색상</label>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">선택</option>
                {colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>두께</label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                disabled={getDegreeOptions().length === 0}
              >
                <option value="">선택</option>
                {getDegreeOptions().map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default Clothregister;
