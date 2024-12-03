import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 일반 로그인
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://moipzy.shop/moipzy/users/login", {
        email,
        password,
      });

      console.log("로그인 응답 데이터:", response.data); 
      const redirectUrl = response.data; 
      const queryString = redirectUrl.split("?")[1]; 
      const params = new URLSearchParams(queryString);

      const token = params.get("token");
      const username = params.get("username");

      if (token && username) {
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("username", username);

        alert(`${username}님, 로그인 성공!`);
        navigate("/loginmypage"); 
      } else {
        alert("로그인 응답에서 사용자 정보를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error.response || error.message);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  // 구글 로그인
  const handleGoogleLogin = () => {
    try {
      window.location.href = "https://moipzy.shop/moipzy/users/google";
    } catch (error) {
      console.error("구글 로그인 실패:", error.message);
      alert("구글 로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Header>
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="button-container">
              <button type="submit" className="login-button">
                로그인
              </button>
              <button
                type="button"
                className="google-login-button"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="google-icon" /> 구글 로그인
              </button>
            </div>
          </form>
        </div>
      </Header>
    </div>
  );
};

export default Login;
