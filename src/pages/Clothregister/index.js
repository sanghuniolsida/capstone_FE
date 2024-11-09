import React, { useState } from 'react';

const Clothregister = () => {
  // 폼 데이터 저장을 위한 상태
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [color, setColor] = useState('');
  const [thickness, setThickness] = useState('');

  // 폼 입력을 위한 핸들러 함수들
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSubCategoryChange = (e) => setSubCategory(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);
  const handleThicknessChange = (e) => setThickness(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터를 제출하는 로직 작성
    console.log({ file, category, subCategory, color, thickness });
  };

  return (
    <div>
      <h2>옷 등록하기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>파일</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        
        <div>
          <label>카테고리</label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="outer">아우터</option>
            <option value="top">상의</option>
            <option value="bottom">하의</option>
          </select>
        </div>

        <div>
          <label>세부 카테고리</label>
          <select value={subCategory} onChange={handleSubCategoryChange}>
            {/* 카테고리에 따라 옵션을 동적으로 추가 가능 */}
            <option value="cardigan">가디건</option>
            <option value="jacket">재킷</option>
          </select>
        </div>

        <div>
          <label>색상</label>
          <select value={color} onChange={handleColorChange}>
            <option value="black">검정</option>
            <option value="white">흰색</option>
          </select>
        </div>

        <div>
          <label>두께</label>
          <select value={thickness} onChange={handleThicknessChange}>
            <option value="normal">보통</option>
            <option value="thick">두꺼움</option>
          </select>
        </div>

        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default Clothregister;
