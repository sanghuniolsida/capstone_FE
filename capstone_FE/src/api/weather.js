//src/api/weather.js

import axios from "axios";

const apiKey = process.env.REACT_APP_ACCUWEATHER_KEY;

export const getLocationAPI = async (lat, lng) => {
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lng}&language=ko-kr`
    );
    return response.data;
  } catch (error) {
    console.error("AccuWeather API 요청 중 오류 발생:", error);
    throw error;
  }
};
// 사용자의 위도,경도를 이용해 아큐웨더API를 호출하고, 해당 위치 정보를 받아오기.

// locationKey를 이용해 날씨 정보를 가져오는 API 호출 함수
export const getWeatherAPI = async (locationKey) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=ko-kr`
      );
      return response;
    } catch (error) {
      console.error("날씨 정보를 가져오는 중 오류 발생: ", error);
      throw error;
    }
  };
//하루 전 날씨
  export const getHistoricalWeatherAPI = async (locationKey) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}/historical/24?apikey=${apiKey}&language=ko-kr`
      );
      return response;
    } catch (error) {
      console.error("과거 날씨 정보를 가져오는 중 오류 발생:", error);
      throw error;
    }
  };

  //내일 날씨
  export const getTomorrowWeatherAPI = async (locationKey) => {
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&language=ko-kr`
    );
    return response.data;
  } catch (error) {
    console.error("내일 날씨 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
};