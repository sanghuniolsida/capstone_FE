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
          // 백엔드에 code 전달하여 JWT 토큰 요청
          const response = await axios.get(
            `https://moipzy.shop/moipzy/users/google/callback?code=${code}`, // 백엔드 엔드포인트 확인
            { withCredentials: true } // 쿠키 전달 필요 시 추가
          );

          const { token } = response.data; // JWT 토큰 응답

          if (token) {
            // JWT 토큰 저장
            localStorage.setItem("jwtToken", token);

            // 디코드하여 사용자 정보 추출
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            localStorage.setItem("username", decodedToken.username);

            alert(`${decodedToken.username}님, 로그인 성공!`);
            navigate("/loginmypage"); // 로그인 성공 시 리다이렉트
          } else {
            alert("로그인 토큰을 받지 못했습니다.");
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
