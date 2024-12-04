import React, { useEffect, useState } from "react";
import Sidebar from "../../components2/Sidebar";
import Popup from "../../components/Popup";
import PopupContent from "../../components/PopupContent";
import "./Loginmypage.css";
import { getLocationAPI, getWeatherAPI } from "../../api/weather";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Loginmypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [clothingRecommendations] = useState([
    "추천1",
    "추천2",
    "추천3",
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState("");
  const [username, setUsername] = useState("");

  // 토큰 및 사용자 정보 처리
  useEffect(() => {
    const processTokenAndUsername = () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const usernameParam = params.get("username");

      if (token) {
        // JWT 토큰 저장
        localStorage.setItem("jwtToken", token);

        try {
          const decodedToken = jwtDecode(token); // 토큰 디코드
          const extractedUsername = usernameParam || decodedToken.username || "사용자";
          localStorage.setItem("username", extractedUsername);
          setUsername(extractedUsername);
        } catch (error) {
          console.error("JWT 디코딩 오류:", error);
          alert("로그인 정보를 처리하는 데 문제가 발생했습니다.");
        }

        // URL 정리
        if (location.search.includes("token")) {
          navigate("/loginmypage", { replace: true });
        }
      } else if (!localStorage.getItem("jwtToken")) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        navigate("/login");
      } else {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername || "사용자");
      }
    };

    processTokenAndUsername();
  }, [location, navigate]);

  // 위치 정보 가져오기
  useEffect(() => {
    if (!locationData) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getLocationAPI(position.coords.latitude, position.coords.longitude)
            .then((res) => {
              const resData = res.ParentCity ? res.ParentCity : res;

              if (resData.Key && resData.LocalizedName) {
                setLocationData({
                  key: resData.Key,
                  localizedName: resData.LocalizedName,
                });
              } else {
                setError("위치 정보를 올바르게 가져올 수 없습니다.");
              }
            })
            .catch(() => {
              setError("위치 정보를 가져올 수 없습니다.");
            });
        },
        () => {
          setError("현재 위치를 찾을 수 없습니다.");
        }
      );
    }
  }, [locationData]);

  // 날씨 정보 가져오기
  useEffect(() => {
    if (locationData) {
      getWeatherAPI(locationData.key)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const resData = res.data[0];
            setWeatherData({
              temperature: resData.Temperature.Metric.Value,
              weatherIcon: resData.WeatherIcon,
              weatherText: resData.WeatherText,
              date: new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              label: "오늘",
            });
          } else {
            setError("날씨 정보를 올바르게 가져올 수 없습니다.");
          }
        })
        .catch(() => {
          setError("날씨 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }
  }, [locationData]);

  const handleRecommendationClick = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRecommendation("");
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log("피드백 데이터:", feedbackData);
    closePopup(); 
  };

  return (
    <Sidebar>
      <div className="loginmypage-content">
        <div className="weather-section">
          {error ? (
            <p>{error}</p>
          ) : weatherData ? (
            <div className="weather-box">
              <div className="location-box">
                <FaMapMarkerAlt />
                <span className="location-text">{locationData?.localizedName}</span>
              </div>
              <div className="current-date">{weatherData.date}</div>
              <div className="temperature-box">
                <p>기온: {weatherData?.temperature}°C</p>
              </div>
              <div className="weather-condition-box">
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${String(
                    weatherData.weatherIcon
                  ).padStart(2, "0")}-s.png`}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <span className="weather-text">{weatherData?.weatherText}</span>
              </div>
            </div>
          ) : (
            <p>로딩 중...</p>
          )}
        </div>

        <div className="clothing-recommendation-section">
          <div className="recommendation-header">
            <h3>Today's Clothing Recommendation</h3>
          </div>
          <div className="clothing-boxes">
            {clothingRecommendations.map((recommendation, index) => (
              <div
                className="clothing-box"
                key={index}
                onClick={() => handleRecommendationClick(recommendation)}
              >
                <p>{recommendation}</p>
                <div className="clothing-image">[추천 이미지]</div>
              </div>
            ))}
          </div>
        </div>

        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          content={
            <PopupContent
              recommendation={selectedRecommendation}
              onSubmit={handleFeedbackSubmit}
              onClose={closePopup}
            />
          }
        />
      </div>
    </Sidebar>
  );
};

export default Loginmypage;
