import React, { useEffect, useState } from "react";
import Sidebar from "../../components2/Sidebar";
import Popup from "../../components/Popup";
import PopupContent from "../../components/PopupContent";
import Feedback from "../../pages/Feedback";
import "./Loginmypage.css";
import { getLocationAPI, getWeatherAPI, getTodaywWeatherAPI } from "../../api/weather";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Loginmypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [loginType, setLoginType] = useState(""); 
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeatherData, setDailyWeatherData] = useState(null); 
  const [calendarEvents, setCalendarEvents] = useState([]); 
  const [clothingRecommendations, setClothingRecommendations] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState("");
  const [isMoipzyPopupOpen, setIsMoipzyPopupOpen] = useState(false);
  const [error, setError] = useState(null);

  // 화씨->섭씨 변환 함수
  const fahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  useEffect(() => {
    const processTokenAndUserDetails = () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const usernameParam = params.get("username");

      if (token) {
        try {
          localStorage.setItem("jwtToken", token);

          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const loginTypeDecoded = decodedToken.loginType; 
          const usernameDecoded = usernameParam || decodedToken.username || "사용자";

          localStorage.setItem("userId", userId);
          localStorage.setItem("username", decodeURIComponent(usernameDecoded));
          localStorage.setItem("loginType", loginTypeDecoded); 

          setUsername(decodeURIComponent(usernameDecoded));
          setLoginType(loginTypeDecoded); 

          //alert(`${decodeURIComponent(usernameDecoded)}님, 로그인 되었습니다.`);

          // URL에서 쿼리 파라미터 제거
          navigate("/loginmypage", { replace: true });
        } catch (error) {
          console.error("JWT 디코딩 오류:", error);
          alert("로그인 정보를 처리하는 데 문제가 발생했습니다.");
          navigate("/login");
        }
      } else {
        const storedToken = localStorage.getItem("jwtToken");
        const storedUsername = localStorage.getItem("username");
        const storedLoginType = localStorage.getItem("loginType");

        if (storedToken && storedUsername) {
          setUsername(storedUsername);
          setLoginType(storedLoginType || "");
        } else {
          alert("로그인이 필요합니다.");
          navigate("/login");
        }
      }
    };

    processTokenAndUserDetails();
  }, [location, navigate]);

  useEffect(() => {
    if (loginType === "google") {
      const fetchCalendarEvents = async () => {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userId");
        const todayDate = new Date().toISOString().split("T")[0];
  
        if (token && userId) {
          try {
            const response = await axios.get(
              `https://moipzy.shop/moipzy/calendar/calendar/${userId}?date=${todayDate}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            console.log("캘린더 응답 데이터:", response.data);
  
            if (typeof response.data === "string") {
              const eventsArray = response.data
                .split("\n") 
                .filter((event) => event.trim() !== "") 
                .map((event) => {
                  const cleanEvent = event.trim().replace(/^-/, "").trim();
                  const [title, timeRange] = cleanEvent.split(" (");
                  return {
                    title: title.trim(),
                    time: timeRange?.replace(")", "").trim() || "",
                  };
                });
  
              setCalendarEvents(eventsArray);
            } else if (Array.isArray(response.data.events)) {
              setCalendarEvents(
                response.data.events.map((event) => ({
                  title: event.title.replace(/^-/, "").trim(), 
                  time: event.time || "",
                }))
              );
            } else {
              setCalendarEvents([]);
            }
          } catch (error) {
            setCalendarEvents([]);
          }
        }
      };
  
      fetchCalendarEvents();
    }
  }, [loginType]);
  

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

  // 현재 날씨 정보 가져오기
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

      // 일일 예보(최고/최저 기온) 가져오기
      getTodaywWeatherAPI(locationData.key)
        .then((res) => {
          if (res.DailyForecasts && res.DailyForecasts.length > 0) {
            const forecast = res.DailyForecasts[0];
            setDailyWeatherData({
              maxTemp: fahrenheitToCelsius(forecast.Temperature.Maximum.Value).toFixed(1), 
              minTemp: fahrenheitToCelsius(forecast.Temperature.Minimum.Value).toFixed(1), 
            });
          }
        })
        .catch(() => {
          setError("최고/최저 기온 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }
  }, [locationData]);

  //옷차림 추천API
  useEffect(() => {
    const fetchClothingRecommendations = async () => {
      const userId = localStorage.getItem("userId");
      const highTemp = Math.round(dailyWeatherData?.maxTemp || 0); 
      const lowTemp = Math.round(dailyWeatherData?.minTemp || 0); 
      const baseUrl = "https://moipzy.shop/moipzy/style/recommend";

      if (userId && highTemp && lowTemp) {
        try {
          const eventParam = loginType === "google" && calendarEvents.length > 0
            ? calendarEvents[0]?.title || ""
            : "일반";
          const url = `${baseUrl}?userId=${userId}&highTemp=${highTemp}&lowTemp=${lowTemp}&event=${eventParam}`;

          const response = await axios.get(url);
          setClothingRecommendations(response.data || []);
        } catch (error) {
          console.error("옷 추천 데이터 요청 실패:", error);
          alert("옷 추천 데이터를 가져오는 중 문제가 발생했습니다.");
          setClothingRecommendations([]);
        }
      }
    };

    fetchClothingRecommendations();
  }, [dailyWeatherData, loginType, calendarEvents]);


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

  const openMoipzyPopup = () => {
    setIsMoipzyPopupOpen(true);
  };
  
  const closeMoipzyPopup = () => {
    setIsMoipzyPopupOpen(false);
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
                {dailyWeatherData && (
                  <p>
                    최고: {dailyWeatherData.maxTemp}°C / 최저: {dailyWeatherData.minTemp}°C
                  </p>
                )}
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

        {/* 캘린더 폼 (구글 로그인일 경우에만 표시) */}
        {loginType === "google" && (
          <div className="calendar-section">
            <h3>Google calendar</h3>
            {calendarEvents.length > 0 ? (
              <ul>
                {calendarEvents.map((event, index) => (
                  <li key={index}>
                    <strong>{event.title}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>표시한 일정이 없습니다.</p>
            )}
          </div>
        )}

          <div className="clothing-recommendation-section">
            <div className="recommendation-header">
              <h3>Today's Clothing Recommendation</h3>
            </div>
            <div className="clothing-boxes">
              {clothingRecommendations.map((recommendation, index) => (
                <div
                  className="clothingBox"
                  key={index}
                  onClick={() => handleRecommendationClick(recommendation)} // 클릭 시 추천 데이터를 팝업으로 전달
                >
                  <h4>추천 {index + 1}</h4>
                  {/* 상의 */}
                  <div className="clothingItem">
                    <div className="clothing-image-container">
                      <img
                        src={recommendation.topImgPath || "placeholder_top.png"}
                        alt="상의 이미지"
                        className="clothing-image"
                      />
                    </div>
                  </div>
                  {/* 하의 */}
                  <div className="clothingItem">
                    <div className="clothing-image-container">
                      <img
                        src={recommendation.bottomImgPath || "placeholder_bottom.png"}
                        alt="하의 이미지"
                        className="clothing-image"
                      />
                    </div>
                  </div>
                  {/* 아우터 */}
                  <div className="clothingItem">
                    <div className="clothing-image-container">
                      <img
                        src={recommendation.outerImgPath || "placeholder_outer.png"}
                        alt="아우터 이미지"
                        className="clothing-image"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Popup
            isOpen={isPopupOpen}
            onClose={closePopup}
            content={
              selectedRecommendation && (
                <PopupContent
                  recommendation={selectedRecommendation} 
                  onSubmit={handleFeedbackSubmit}
                  onClose={closePopup}
                />
              )
            }
          />

          <Popup
            isOpen={isMoipzyPopupOpen}
            onClose={closeMoipzyPopup}
            content={<Feedback onClose={closeMoipzyPopup} />}
          />

        <button className="floating-button" onClick={openMoipzyPopup}>
          TODAY MOIPZY
        </button>
      </div>
    </Sidebar>
  );
};

export default Loginmypage;
