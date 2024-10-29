// src/components/Header.js

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="container">
      <div className="left-vertical-text">
        <span>날</span><span>씨</span><span>기</span><span>반</span><span>옷</span><span>차</span><span>림</span><span>추</span><span>천</span><span>서</span><span>비</span><span>스</span>
      </div>
      <header className="header">
        <div className="top-bar">
          <h1 className="center-title">MOIPZY</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
