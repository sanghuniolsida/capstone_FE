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

    //일일 예보 날씨
    export const getTodaywWeatherAPI = async (locationKey) => {
      try {
        const response = await axios.get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&language=ko-kr`
        );
        return response.data;
      } catch (error) {
        console.error("내일 날씨 정보를 가져오는 중 오류 발생:", error);
        throw error;
      }
    };

  //내일~ 날씨
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

// LocationKey 가져오기
export const getLocationKeyAPI = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}&language=ko-kr`
    );
    return response.data.Key; // LocationKey 반환
  } catch (error) {
    console.error("LocationKey를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 5일치 날씨 정보 가져오기
export const get5DayWeatherAPI = async (locationKey) => {
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&language=ko-kr`
    );
    return response.data;
  } catch (error) {
    console.error("5일치 날씨 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
};