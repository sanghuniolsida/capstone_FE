import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaPlane, FaTshirt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ children }) => {
  const [isFlying, setIsFlying] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const syncUsername = () => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  };

  useEffect(() => {
    syncUsername();

    const handleStorageChange = (event) => {
      if (event.key === 'username') {
        syncUsername();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert('로그아웃 되었습니다.');
    setUsername(null);
    navigate('/');
  };

  const handleCountryClick = () => {
    if (!username) {
      alert('로그인 상태가 아닙니다.');
      return;
    }
    setIsFlying(true);
  };

  const handleProtectedNavigation = (path) => {
    if (!username) {
      alert('로그인 상태가 아닙니다.');
      return;
    }
    navigate(path);
  };

  useEffect(() => {
    if (isFlying) {
      const timer = setTimeout(() => {
        setIsFlying(false);
        navigate('/country');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isFlying, navigate]);

  return (
    <div className="header-layout">
      {/* 상단 헤더 */}
      <header className="header-top">
        <h1 className="title">MOIPZY</h1>
        <div className="auth-buttons">
          {username ? (
            <div className="logged-in">
              <span>{username}님 반갑습니다!</span>
              <button onClick={handleLogout} className="logout-button">
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="header-button">Sign In</Link>
              <Link to="/signup" className="header-button">Sign Up</Link>
            </>
          )}
        </div>
      </header>

      {/* 사이드바 */}
      <aside className="sidebar">
        <Link to="/" className="sidebar-item">
          <FaHome className="sidebar-icon" /> 홈
        </Link>
        <div className="sidebar-item" onClick={() => handleProtectedNavigation('/Loginmypage')}>
          <FaUser className="sidebar-icon" /> 마이 페이지
        </div>
        <div className="sidebar-item" onClick={handleCountryClick}>
          <FaPlane className={`sidebar-icon ${isFlying ? 'flying' : ''}`} /> 여행
        </div>
        <div className="sidebar-item dropdown">
          <FaTshirt className="sidebar-icon" /> 옷장
          <div className="dropdown-content">
            <div onClick={() => handleProtectedNavigation('/mycloth')} className="dropdown-item">
              내 옷
            </div>
            <div onClick={() => handleProtectedNavigation('/clothregister')} className="dropdown-item">
              옷 등록
            </div>
          </div>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
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