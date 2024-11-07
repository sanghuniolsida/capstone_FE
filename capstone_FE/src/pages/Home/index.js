// src/pages/Home/index.js

import React from 'react';
import Header from '../../components/Header'; // 공용 Header 컴포넌트 가져오기

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-content">
        {/* 3번 영역에 들어갈 내용 작성 */}
        {/* 원하는 다른 컴포넌트나 정보를 추가해도 됩니다 */}
      </div>
    </div>
  );
};

export default Home;
