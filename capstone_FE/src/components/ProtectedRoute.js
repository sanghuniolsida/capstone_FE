//src/components/ProjectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(jwtToken);
    if (decoded.exp * 1000 < Date.now()) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("JWT 디코드 오류:", error);
    alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
