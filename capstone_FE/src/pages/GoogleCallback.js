import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getGoogleToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          // 백엔드로 code 전달하여 JWT 토큰 요청
          const response = await axios.get(
            `https://moipzy.shop/moipzy/users/google/callback?code=${code}`
          );

          const { token, userId, username } = response.data; // 응답에서 토큰 및 사용자 정보 추출

          if (token && username && userId) {
            // JWT 토큰 및 사용자 정보 localStorage에 저장
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("username", username);
            localStorage.setItem("userId", userId.toString());

            alert(`${username}님, 로그인 성공!`);
            navigate("/loginmypage"); // 로그인 성공 후 리다이렉트
          } else {
            alert("로그인 토큰 또는 사용자 정보를 받지 못했습니다.");
            navigate("/login");
          }
        } catch (error) {
          console.error("구글 로그인 처리 실패:", error.response || error.message);
          alert("로그인 처리 중 오류가 발생했습니다.");
          navigate("/login");
        }
      } else {
        alert("구글 로그인 코드가 없습니다.");
        navigate("/login");
      }
    };

    getGoogleToken();
  }, [navigate]);

  return <div>구글 로그인 처리 중...</div>;
};

export default GoogleCallback;
