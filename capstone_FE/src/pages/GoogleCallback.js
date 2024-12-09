import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getGoogleToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.get(
            `https://moipzy.shop/moipzy/users/google/callback?code=${code}`
          );

          const { token } = response.data; 

          if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token: ", decodedToken);

            const userId = decodedToken.userId; 
            const username = decodedToken.username; 

            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userId", userId); 
            localStorage.setItem("username", username);

            //alert(`${username}님, 로그인 성공!`);
            navigate("/loginmypage"); // 로그인 성공 후 리다이렉트
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
