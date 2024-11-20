import React, { useEffect, useState } from 'react';
import Sidebar from '../../components2/Sidebar';
import './Loginmypage.css';
import { getLocationAPI, getWeatherAPI } from '../../api/weather';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Loginmypage = () => {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [clothingRecommendations, setClothingRecommendations] = useState(["추천1", "추천2", "추천3"]);

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
  }, []);

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
              date: new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              label: '오늘',
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

  const addClothingRecommendation = () => {
    setClothingRecommendations((prevRecommendations) => [
      ...prevRecommendations,
      `추천${prevRecommendations.length + 1}`,
    ]);
  };

  const removeClothingRecommendation = () => {
    setClothingRecommendations((prevRecommendations) =>
      prevRecommendations.length > 0 ? prevRecommendations.slice(0, -1) : prevRecommendations
    );
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
              <div className="current-date">
                {weatherData.date}
              </div>
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
            <div className="button-group">
              <button className="add-recommendation-button" onClick={addClothingRecommendation}>+</button>
              <button className="remove-recommendation-button" onClick={removeClothingRecommendation}>-</button>
            </div>
          </div>
          <div className="clothing-boxes">
            {clothingRecommendations.map((recommendation, index) => (
              <div className="clothing-box" key={index}>
                <p>{recommendation}</p>
                <div className="clothing-image">[추천 이미지]</div>
              </div>
            ))}
          </div>
        </div>

        <div className="calendar-section">
          <h3>나의 일정</h3>
          <div className="calendar-placeholder">[구글 캘린더 일정]</div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Loginmypage;
