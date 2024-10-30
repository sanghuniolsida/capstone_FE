// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun } from 'react-icons/fa'; // 태양 아이콘 추가
import './Header.css';

const Header = ({ children }) => {
  return (
    <div className="header-layout">
      {/* 1번 영역 - 상단 헤더 */}
      <header className="header-top">
        <h1 className="title">MOIPZY</h1>
        <div className="auth-buttons">
          <Link to="/login" className="header-button">Sign In</Link>
          <Link to="/signup" className="header-button">Sign Up</Link>
        </div>
      </header>

      {/* 2번 영역 - 왼쪽 세로 텍스트 */}
      <aside className="left-sidebar">
        <div className="vertical-text">
          <span className="sun-icon"><FaSun /></span> {/* 태양 아이콘 추가 */}
          <span>날</span>
          <span>씨</span>
          <span>기</span>
          <span>반</span>
          <span>옷</span>
          <span>차</span>
          <span>림</span>
          <span>추</span>
          <span>천</span>
          <span>서</span>
          <span>비</span>
          <span>스</span>
        </div>
      </aside>

      {/* 3번 영역 - 메인 컨텐츠 (children을 사용) */}
      <main className="main-content">
        {children ? children : (
          <div>
            <h2>메인 컨텐츠 영역</h2>
            <p>이곳에 페이지의 주요 컨텐츠가 표시됩니다.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Header;
