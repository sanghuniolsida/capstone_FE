// src/pages/Login/index.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../../components/Header';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = (event) => {
    event.preventDefault(); // 기본 폼 동작 막기
    navigate('/loginmypage'); // 로그인 성공 시 Loginmypage로 이동
  };

  return (
    <div>
      <Header>
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />

            <div className="button-container">
              <button type="submit" className="login-button">로그인</button>
              <button type="button" className="google-login-button">
                <FcGoogle className="google-icon" /> 구글 로그인
              </button>
            </div>
          </form>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </Header>
    </div>
  );
};

export default Login;
