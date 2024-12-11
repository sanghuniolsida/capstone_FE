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
  const [productName, setProductName] = useState(""); 

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

  const getDegreeOptions = () => {
    if (largeCategory === "TOP") {
      if (smallCategory === "T_SHIRT" || smallCategory === "POLO_SHIRT") {
        return ["NORMAL"];
      } else {
        return ["THIN", "NORMAL", "THICK"];
      }
    } else if (largeCategory === "BOTTOM") {
      if (smallCategory === "LINEN_PANTS") {
        return ["THIN"];
      } else {
        return ["THIN", "LTHIN", "NORMAL", "LTHICK", "THICK"];
      }
    } else if (largeCategory === "OUTER") {
      return ["THIN", "NORMAL", "THICK"];
    }
    return [];
  };

  const fetchImageFromLink = async (url) => {
    try {
      const response = await axios.post(
        `https://moipzy.shop/moipzy/crawling/musinsa?url=${encodeURIComponent(url)}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { productName, imageUrl } = response.data;
  
      setProductName(productName);
      setPreview(imageUrl);
  
      const setCategoryByKeywords = (name) => {
        const lowerName = name.toLowerCase(); 
  
        if (
          /맨투맨|스웨트셔츠|sweatshirt|sweat shirt|크루넥/.test(lowerName)
        ) {
          setLargeCategory("TOP");
          setSmallCategory("SWEAT_SHIRT");
        } else if (/반팔/.test(lowerName)) {
          setLargeCategory("TOP");
          setSmallCategory("T_SHIRT");
        } else if (/폴로|피켓/.test(lowerName)) {
          setLargeCategory("TOP");
          setSmallCategory("POLP_SHIRT");
        } else if (/long sleeve|긴팔|롱슬리브/.test(lowerName)) {
          setLargeCategory("TOP");
          setSmallCategory("LONG_SLEEVE");
        } else if (/후드|후드티|hoodie|후디/.test(lowerName)) {
          setLargeCategory("TOP");
          setSmallCategory("HOODIE");
        }
        else if (/cardigan|가디건|카디건/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("CARDIGAN");
        } else if (/블루종/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("BLOUSON");
        } else if (/블레이저/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("BLAZER");
        } else if (/후드집업/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("HOODED");
        } else if (/ma-1/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("MA1");
        } else if (/야구점퍼|스타디움|바시티/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("STADIUM_JACKET");
        } else if (/레더|무스탕|트러커|스웨이드/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("LEATHER_JACKET");
        } else if (/더블코트|싱글코트|코트|발마칸|더플/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("COAT");
        } else if (/파카|padding|패딩|점퍼|숏패딩|롱패딩|푸퍼/.test(lowerName)) {
          setLargeCategory("OUTER");
          setSmallCategory("PADDING");
        }
        else if (/데님팬츠|denim|데님/.test(lowerName)) {
          setLargeCategory("BOTTOM");
          setSmallCategory("JEANS");
        } else if (/트레이닝/.test(lowerName)) {
          setLargeCategory("BOTTOM");
          setSmallCategory("SWEAT_PANTS");
        } else if (/치노|cotton/.test(lowerName)) {
          setLargeCategory("BOTTOM");
          setSmallCategory("COTTON_PANTS");
        } else if (/슬랙스|slacks/.test(lowerName)) {
          setLargeCategory("BOTTOM");
          setSmallCategory("SLACKS");
        } else if (/린넨/.test(lowerName)) {
          setLargeCategory("BOTTOM");
          setSmallCategory("LINEN_PANTS");
        } else if (/쇼츠|써머|7부|반바지/.test(lowerName)) {
          setLargeCategory("BOTTOM");
          setSmallCategory("SHORTS");
        }
      };
  
      setCategoryByKeywords(productName);
  
      const responseBlob = await fetch(imageUrl);
      const blob = await responseBlob.blob();
      const fileName = imageUrl.split("/").pop();
      const file = new File([blob], fileName, { type: blob.type });
      setFile(file);
    } catch (error) {
      console.error("이미지 가져오기 실패:", error.response?.data || error.message);
      alert("이미지를 가져오는 데 실패했습니다. 링크를 확인하세요.");
    }
  };
  
  

  const handleLinkChange = (e) => {
    const inputLink = e.target.value;
    setLink(inputLink);

    if (inputLink) {
      fetchImageFromLink(inputLink);
    }
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
              onChange={handleLinkChange}
            />
          </div>

          <div className="form-group">
            <label>상품명</label>
            <input type="text" value={productName} readOnly />
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
                  setSmallCategory("");
                  setDegree("");
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
                  setDegree("");
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