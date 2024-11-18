import React, { useState } from "react";
import Sidebar from "../../components2/Sidebar";
import "./Clothregister.css";

const Clothregister = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(""); 
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [thickness, setThickness] = useState("");
  const [link, setLink] = useState("");

  const subCategoryOptions = {
    상의: ["반팔", "롱슬리브", "후드티", "맨투맨", "니트"],
    하의: ["청바지", "반바지", "슬랙스", "츄리닝"],
    아우터: ["재킷", "패딩", "코트", "가디건"],
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // 이미지 미리보기 URL 
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      file,
      mainCategory,
      subCategory,
      color,
      thickness,
      link,
    });
    alert("등록 성공!");
  };

  return (
    <Sidebar>
      <div className="clothregister-container">
        <div className="left-panel">
          {/* 등록한 파일 미리보기 */}
          <div className="image-preview">
            {preview ? (
              <img src={preview} alt="옷 미리보기" className="preview-image" />
            ) : (
              <p>select image</p>
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
          <div className="right-panel-top">
            <div className="form-group">
              <label>대분류</label>
              <select
                value={mainCategory}
                onChange={(e) => {
                  setMainCategory(e.target.value);
                  setSubCategory("");
                }}
              >
                <option value="">선택</option>
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="아우터">아우터</option>
              </select>
            </div>

            <div className="form-group">
              <label>소분류</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                disabled={!mainCategory} 
              >
                <option value="">선택</option>
                {mainCategory &&
                  subCategoryOptions[mainCategory].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>색상</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">선택</option>
                <option value="검정">검정</option>
                <option value="흰색">흰색</option>
                <option value="파랑">파랑</option>
                <option value="빨강">빨강</option>
                <option value="초록">초록</option>
              </select>
            </div>

            <div className="form-group">
              <label>두께</label>
              <select
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
              >
                <option value="">선택</option>
                <option value="얇음">얇음</option>
                <option value="보통">보통</option>
                <option value="두꺼움">두꺼움</option>
              </select>
            </div>
          </div>

          <div className="right-panel-bottom">
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Clothregister;
