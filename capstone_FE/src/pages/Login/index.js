// src/pages/Login.js

import React from 'react';
import Header from './components/Header'; // Header.js를 불러옵니다.
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <Header /> {/* 상단의 MOIPZY와 왼쪽 텍스트를 위한 공용 Header */}
      <div className="login-container">
        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <button type="submit" className="login-button">Sign In</button>
        </form>
        <a href="#" className="forgot-password">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;
