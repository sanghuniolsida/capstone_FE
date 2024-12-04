import React, { useEffect, useState } from 'react';
import Sidebar from '../../components2/Sidebar';
import { getLocationAPI, getWeatherAPI, getHistoricalWeatherAPI, getTomorrowWeatherAPI } from '../../api/weather';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Home.css';
import ClothingRecommendation from '../../components/ClothingRecommendation';

const Home = () => {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [historicalWeatherData, setHistoricalWeatherData] = useState(null);
  const [tomorrowWeatherData, setTomorrowWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState('today'); // 'yesterday', 'today', 'tomorrow'

  // 현재 위치 데이터 가져오기
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
                setError('위치 정보를 올바르게 가져올 수 없습니다.');
              }
            })
            .catch(() => {
              setError('위치 정보를 가져올 수 없습니다.');
            });
        },
        () => {
          setError('현재 위치를 찾을 수 없습니다.');
        }
      );
    }
  }, [locationData]);

  // 현재 날씨 데이터 가져오기
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
            setError('날씨 정보를 올바르게 가져올 수 없습니다.');
          }
        })
        .catch(() => {
          setError('날씨 정보를 가져오는 중 오류가 발생했습니다.');
        });
    }
  }, [locationData]);

  useEffect(() => {
    if (locationData) {
      getHistoricalWeatherAPI(locationData.key)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const resData = res.data[0];

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            setHistoricalWeatherData({
              temperature: resData.Temperature.Metric.Value,
              weatherIcon: resData.WeatherIcon,
              weatherText: resData.WeatherText,
              date: yesterday.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              label: '어제',
            });
          } else {
            setError('과거 날씨 정보를 올바르게 가져올 수 없습니다.');
          }
        })
        .catch(() => {
          setError('과거 날씨 정보를 가져오는 중 오류가 발생했습니다.');
        });
    }
  }, [locationData]);

  useEffect(() => {
    if (locationData) {
      getTomorrowWeatherAPI(locationData.key)
        .then((res) => {
          if (res && res.DailyForecasts && res.DailyForecasts.length > 1) {
            const resData = res.DailyForecasts[1];

            const temperatureInCelsius = ((resData.Temperature.Maximum.Value - 32) * 5) / 9;

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            setTomorrowWeatherData({
              temperature: temperatureInCelsius.toFixed(1),
              weatherIcon: resData.Day.Icon,
              weatherText: resData.Day.IconPhrase,
              date: tomorrow.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              label: '내일',
            });
          } else {
            setError('내일 날씨 정보를 올바르게 가져올 수 없습니다.');
          }
        })
        .catch(() => {
          setError('내일 날씨 정보를 가져오는 중 오류가 발생했습니다.');
        });
    }
  }, [locationData]);

  const handleSelectWeather = (type) => {
    setSelectedWeather(type);
  };

  const displayedWeather =
    selectedWeather === 'yesterday'
      ? historicalWeatherData
      : selectedWeather === 'tomorrow'
      ? tomorrowWeatherData
      : weatherData;

  return (
    <Sidebar>
      <div className="home-content">
        {error ? (
          <p>{error}</p>
        ) : displayedWeather ? (
          <div>
            <div className="weather-box">
              <div className="location-box">
                <FaMapMarkerAlt />
                <span className="location-text">{locationData?.localizedName}</span>
              </div>
              <div className="current-date">{displayedWeather.date}</div>
              <div className="temperature-box">
                <div className="current-temp">
                  <p>기온: {displayedWeather?.temperature}°C</p>
                </div>
              </div>

              <div className="weather-condition-box">
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${String(
                    displayedWeather.weatherIcon
                  ).padStart(2, '0')}-s.png`}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <span className="weather-text">{displayedWeather?.weatherText}</span>
              </div>

              <div className="buttons-container">
                <button onClick={() => handleSelectWeather('yesterday')} className="toggle-historical-button">
                  Yesterday
                </button>
                <button onClick={() => handleSelectWeather('today')} className="toggle-today-button">
                  Today
                </button>
                <button onClick={() => handleSelectWeather('tomorrow')} className="toggle-tomorrow-button">
                  Tomorrow
                </button>
              </div>
            </div>

            <ClothingRecommendation temperature={displayedWeather.temperature} />
          </div>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </Sidebar>
  );
};

export default Home;
