// src/components2/Sidebar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaPlane, FaTshirt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ children }) => {
  const [isFlying, setIsFlying] = useState(false);
  const navigate = useNavigate();

  const handleCountryClick = () => {
    setIsFlying(true); // 애니메이션 시작
  };

  useEffect(() => {
    if (isFlying) {
      const timer = setTimeout(() => {
        navigate('/country'); // 애니메이션 후 페이지 이동
      }, 1000); // 애니메이션 시간과 맞춤

      return () => clearTimeout(timer); // cleanup
    }
  }, [isFlying, navigate]);

  return (
    <div className="header-layout">
      <header className="header-top">
        <h1 className="title">MOIPZY</h1>
      </header>

      <aside className="sidebar">
        <Link to="/" className="sidebar-item">
          <FaHome className="sidebar-icon" /> 홈
        </Link>
        <Link to="/Loginmypage" className="sidebar-item">
          <FaUser className="sidebar-icon" /> 마이 페이지
        </Link>
        <div className="sidebar-item" onClick={handleCountryClick}>
          <FaPlane className={`sidebar-icon ${isFlying ? 'flying' : ''}`} /> 국가
        </div>
        <div className="sidebar-item dropdown">
          <FaTshirt className="sidebar-icon" /> 옷장
          <div className="dropdown-content">
            <Link to="/mycloth" className="dropdown-item">내 옷</Link>
            <Link to="/clothregister" className="dropdown-item">옷 등록</Link>
          </div>
        </div>
      </aside>

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

export default Sidebar;
