// src/pages/Signup/index.js

import React from 'react';
import Header from '../../components/Header'; // 공용 Header 컴포넌트 불러오기
import './Signup.css';

const Signup = () => {
  return (
    <div>
      <Header>
        <div className="signup-container">
          <h2 className="signup-title">회원가입을 위해 정보를 입력해 주세요.</h2>
          <form className="signup-form">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />

            <button type="submit" className="signup-button">Register</button>
          </form>
        </div>
      </Header>
    </div>
  );
};

export default Signup;
