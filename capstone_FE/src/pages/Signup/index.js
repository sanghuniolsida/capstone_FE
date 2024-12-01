import React, { useState } from "react";
import Header from "../../components/Header"; // 공용 Header 컴포넌트
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await fetch("/moipzy/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(`회원가입 성공: ${data.message}`);
    } catch (error) {
      setMessage(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <div>
      <Header>
        <div className="signup-container">
          <h2 className="signup-title">회원가입을 위해 정보를 입력해 주세요.</h2>
          <form className="signup-form" onSubmit={handleSignup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
              required
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // 상태 업데이트
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
              required
            />

            <button type="submit" className="signup-button">Register</button>
          </form>

          {/* 성공 또는 실패 메시지 출력 */}
          {message && <p className="signup-message">{message}</p>}
        </div>
      </Header>
    </div>
  );
};

export default Signup;
