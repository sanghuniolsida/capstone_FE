import React, { useState } from 'react';

const Mycloth = () => {
  // 옷 정보를 위한 샘플 상태
  const [clothes, setClothes] = useState([
    { id: 1, name: '가디건', category: '아우터', color: '검정', thickness: '보통' },
    { id: 2, name: '스웨터', category: '상의', color: '회색', thickness: '두꺼움' },
  ]);

  return (
    <div>
      <h2>내 옷 정보</h2>
      <div className="clothes-list">
        {clothes.map((cloth) => (
          <div key={cloth.id} className="cloth-item">
            <h3>{cloth.name}</h3>
            <p>카테고리: {cloth.category}</p>
            <p>색상: {cloth.color}</p>
            <p>두께: {cloth.thickness}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mycloth;
