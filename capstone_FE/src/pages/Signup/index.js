import React, { useState } from "react";
import Header from "../../components/Header"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await fetch("https://moipzy.shop/moipzy/users/register", {
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

      const textResponse = await response.text(); 
      console.log("회원가입 성공 응답:", textResponse);

      if (textResponse.startsWith("redirect:")) {
        const redirectUrl = textResponse.replace("redirect:", "");
        setMessage("회원가입 성공! 리다이렉션 중...");
        window.location.href = redirectUrl; // /home으로 리다이렉트
      } else {
        setMessage("회원가입 성공!");
      }
    } catch (error) {
      setMessage(`회원가입 실패: ${error.message}`);
      console.error("회원가입 실패:", error.message);
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
              onChange={(e) => setEmail(e.target.value)} 
              required
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="signup-button">Register</button>
          </form>

          {message && <p className="signup-message">{message}</p>}
        </div>
      </Header>
    </div>
  );
};

export default Signup;
