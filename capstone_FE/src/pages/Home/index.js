// src/pages/Home/index.js

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header'; // 공용 Header 컴포넌트 가져오기
import { getLocationAPI, getWeatherAPI } from '../../api/weather'; // 위치에 맞게 weatherAPI를 수정하세요.
import { FaSun, FaCloud, FaCloudRain, FaMapMarkerAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 위치 정보를 가져옵니다.
    if (!locationData) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getLocationAPI(position.coords.latitude, position.coords.longitude)
            .then((res) => {
              console.log("API 응답 데이터:", res); // 응답 데이터를 확인하는 로그를 추가합니다.
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
            .catch((error) => {
              //console.error("위치 정보를 가져오는 중 오류 발생: ", error);
              setError("위치 정보를 가져올 수 없습니다.");
            });
        },
        (err) => {
          //console.error("위치 정보를 가져오지 못했습니다:", err);
          setError("현재 위치를 찾을 수 없습니다.");
        }
      );
    }
  }, []);
  
  useEffect(() => {
    // 날씨 정보를 가져옵니다.
    if (locationData) {
      getWeatherAPI(locationData.key)
        .then((res) => {
          console.log("날씨 API 응답 데이터:", res.data);
          if (res.data && res.data.length > 0) {
            const resData = res.data[0];
            setWeatherData({
              temperature: resData.Temperature.Metric.Value,
              weatherIcon: resData.WeatherIcon,
              weatherText: resData.WeatherText,
            });
          } else {
            setError("날씨 정보를 올바르게 가져올 수 없습니다.");
          }
        })
        .catch((error) => {
          console.error("날씨 정보를 가져오는 중 오류 발생: ", error);
          setError("날씨 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }
  }, [locationData]);
  

  return (
    <Header>
      <div className="home-content">
        {error ? (
          <p>{error}</p>
        ) : weatherData ? (
          <div className="weather-box">
            {/* 위치와 날씨 정보 표시 */}
            <div className="location-box">
              <FaMapMarkerAlt />
              <span className="location-text">{locationData?.localizedName}</span>
            </div>

            <div className="temperature-box">
              <div className="current-temp">
                <p>현재 기온: {weatherData?.temperature}°C</p>
              </div>
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
    </Header>
  );
};

export default Home;