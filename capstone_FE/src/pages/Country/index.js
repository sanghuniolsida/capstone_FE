// src/pages/country/index.js

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components2/Sidebar';
import './Country.css';
import { getLocationKeyAPI, get5DayWeatherAPI } from '../../api/weather';
import { GiWorld } from "react-icons/gi";
import { motion } from "framer-motion";


const Country = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [locationKey, setLocationKey] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const clothesCategories = {
    상의: ['상의 이미지1 URL', '상의 이미지2 URL'],
    하의: ['하의 이미지1 URL', '하의 이미지2 URL'],
    아우터: ['아우터 이미지1 URL', '아우터 이미지2 URL'],
  };

  const countryCityMap = {
    '일본': ['도쿄', '오사카', '후쿠오카', '삿포로', '교토'],
    '중국': ['베이징', '상하이', '광저우', '시안', '청두'],
    '몽골': ['울란바토르', '테를지 국립공원', '홉스골 호수', '고비 사막', '달란자드가드'],
    '대만': ['타이베이', '타이중', '가오슝', '화롄', '지우펀'],
    '카자흐스탄': ['알마티', '아스타나', '카라간다', '아티라우', '악토베'],
    '기르기스스탄': ['비슈케크', '이식쿨 호수', '카라콜', '오쉬', '잘랄아바트'],
    '우즈베키스탄': ['타슈켄트', '사마르칸트', '부하라', '히바', '누쿠스'],
    '말레이시아': ['쿠알라룸푸르', '조호르바루', '코타키나발루', '페낭', '랑카위'],
    '라오스': ['비엔티안', '루앙프라방', '방비엥', '팍세', '시판돈'],
    '태국': ['방콕', '치앙마이', '푸켓', '파타야', '아유타야'],
    '베트남': ['하노이', '호치민시', '다낭', '하롱베이', '호이안'],
    '필리핀': ['마닐라', '세부', '보라카이', '다바오', '바기오'],
    '싱가포르': ['싱가포르시티'],
    '인도': ['뉴델리', '뭄바이', '자이푸르', '콜카타', '방갈로르'],
    '네팔': ['카트만두', '포카라', '룸비니', '나가르코트', '파르샤'],
    '이탈리아': ['로마', '베네치아', '피렌체', '밀라노', '나폴리'],
    '독일': ['베를린', '뮌헨', '프랑크푸르트', '함부르크', '쾰른'],
    '영국': ['런던', '맨체스터', '에든버러', '리버풀', '브라이튼'],
    '프랑스': ['파리', '니스', '리옹', '마르세유', '스트라스부르'],
    '네덜란드': ['암스테르담', '로테르담', '헤이그', '위트레흐트', '에인트호번'],
    '스위스': ['취리히', '제네바', '루체른', '베른', '인터라켄'],
    '그리스': ['아테네', '산토리니', '미코노스', '테살로니키', '크레타'],
    '폴란드': ['바르샤바', '크라쿠프', '그단스크', '브로츠와프', '포즈난'],
    '우크라이나': ['키이우', '리비우', '오데사', '하르키우', '드니프로'],
    '스웨덴': ['스톡홀름', '예테보리', '말뫼', '웁살라', '룰레오'],
    '미국': ['뉴욕', '로스앤젤레스', '라스베이거스', '마이애미', '시카고'],
    '멕시코': ['멕시코시티', '칸쿤', '과달라하라', '푸에르토 바야르타', '메리다'],
    '브라질': ['리우데자네이루', '상파울루', '브라질리아', '사우바도르', '마나우스'],
    '아르헨티나': ['부에노스아이레스', '멘도사', '코르도바', '우수아이아', '로사리오'],
    '칠레': ['산티아고', '발파라이소', '푼타 아레나스', '발디비아', '칠로에 섬'],
  };

  // 국가 선택 시 도시 목록 초기화
  const handleSelectCountry = (selectedCountry) => {
    setCountry(selectedCountry);
    setCity(''); // 도시 선택 초기화
  };

  // 도시 선택 시 locationKey를 가져옴
  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    let latitude = 0;
    let longitude = 0;

    if (country === '중국' && selectedCity === '베이징') {
      latitude = 39.9042;
      longitude = 116.4074;
    } else if (country === '중국' && selectedCity === '상하이') {
      latitude = 31.2304;
      longitude = 121.4737;
    } else if (country === '중국' && selectedCity === '광저우') {
      latitude = 23.1291;
      longitude = 113.2644;
    } else if (country === '중국' && selectedCity === '시안') {
      latitude = 34.3416;
      longitude = 108.9398;
    } else if (country === '중국' && selectedCity === '청두') {
      latitude = 30.5728;
      longitude = 104.0668;
    } else if (country === '일본' && selectedCity === '도쿄') {
      latitude = 35.6762;
      longitude = 139.6503;
    } else if (country === '일본' && selectedCity === '오사카') {
      latitude = 34.6937;
      longitude = 135.5023;
    } else if (country === '일본' && selectedCity === '후쿠오카') {
      latitude = 33.5904;
      longitude = 130.4017;
    } else if (country === '일본' && selectedCity === '삿포로') {
      latitude = 43.0618;
      longitude = 141.3545;
    } else if (country === '일본' && selectedCity === '교토') {
      latitude = 35.0116;
      longitude = 135.7681;
    } else if (country === '몽골' && selectedCity === '울란바토르') {
      latitude = 47.8864;
      longitude = 106.9057;
    } else if (country === '몽골' && selectedCity === '테를지 국립공원') {
      latitude = 48.0369;
      longitude = 107.3827;
    } else if (country === '몽골' && selectedCity === '홉스골 호수') {
      latitude = 51.0923;
      longitude = 100.4083;
    } else if (country === '몽골' && selectedCity === '고비 사막') {
      latitude = 42.7634;
      longitude = 103.0919;
    } else if (country === '몽골' && selectedCity === '달란자드가드') {
      latitude = 43.5706;
      longitude = 104.4253;
    } else if (country === '대만' && selectedCity === '타이베이') {
      latitude = 25.0330;
      longitude = 121.5654;
    } else if (country === '대만' && selectedCity === '타이중') {
      latitude = 24.1477;
      longitude = 120.6736;
    } else if (country === '대만' && selectedCity === '가오슝') {
      latitude = 22.6273;
      longitude = 120.3014;
    } else if (country === '대만' && selectedCity === '화롄') {
      latitude = 23.9911;
      longitude = 121.6112;
    } else if (country === '대만' && selectedCity === '지우펀') {
      latitude = 25.1092;
      longitude = 121.8447;
    } else if (country === '카자흐스탄' && selectedCity === '알마티') {
      latitude = 43.2220;
      longitude = 76.8512;
    } else if (country === '카자흐스탄' && selectedCity === '아스타나 (누르술탄)') {
      latitude = 51.1694;
      longitude = 71.4491;
    } else if (country === '카자흐스탄' && selectedCity === '카라간다') {
      latitude = 49.8068;
      longitude = 73.1094;
    } else if (country === '카자흐스탄' && selectedCity === '아티라우') {
      latitude = 47.1164;
      longitude = 51.9200;
    } else if (country === '카자흐스탄' && selectedCity === '악토베') {
      latitude = 50.2839;
      longitude = 57.1670;
    } else if (country === '기르기스스탄' && selectedCity === '비슈케크') {
      latitude = 42.8746;
      longitude = 74.5698;
    } else if (country === '기르기스스탄' && selectedCity === '이식쿨 호수') {
      latitude = 42.4833;
      longitude = 77.0333;
    } else if (country === '기르기스스탄' && selectedCity === '카라콜') {
      latitude = 42.4907;
      longitude = 78.3958;
    } else if (country === '기르기스스탄' && selectedCity === '오쉬') {
      latitude = 40.5283;
      longitude = 72.7985;
    } else if (country === '기르기스스탄' && selectedCity === '잘랄아바트') {
      latitude = 40.9330;
      longitude = 73.0000;
    } else if (country === '우즈베키스탄' && selectedCity === '타슈켄트') {
      latitude = 41.2995;
      longitude = 69.2401;
    } else if (country === '우즈베키스탄' && selectedCity === '사마르칸트') {
      latitude = 39.6270;
      longitude = 66.9741;
    } else if (country === '우즈베키스탄' && selectedCity === '부하라') {
      latitude = 39.7677;
      longitude = 64.4236;
    } else if (country === '우즈베키스탄' && selectedCity === '히바') {
      latitude = 41.3793;
      longitude = 60.3636;
    } else if (country === '우즈베키스탄' && selectedCity === '누쿠스') {
      latitude = 42.4531;
      longitude = 59.6101;
    } else if (country === '말레이시아' && selectedCity === '쿠알라룸푸르') {
      latitude = 3.1390;
      longitude = 101.6869;
    } else if (country === '말레이시아' && selectedCity === '조호르바루') {
      latitude = 1.4927;
      longitude = 103.7414;
    } else if (country === '말레이시아' && selectedCity === '코타키나발루') {
      latitude = 5.9804;
      longitude = 116.0735;
    } else if (country === '말레이시아' && selectedCity === '페낭') {
      latitude = 5.4164;
      longitude = 100.3327;
    } else if (country === '말레이시아' && selectedCity === '랑카위') {
      latitude = 6.3566;
      longitude = 99.7745;
    } else if (country === '라오스' && selectedCity === '비엔티안') {
      latitude = 17.9757;
      longitude = 102.6331;
    } else if (country === '라오스' && selectedCity === '루앙프라방') {
      latitude = 19.8841;
      longitude = 102.1350;
    } else if (country === '라오스' && selectedCity === '방비엥') {
      latitude = 18.9217;
      longitude = 102.4479;
    } else if (country === '라오스' && selectedCity === '팍세') {
      latitude = 15.1210;
      longitude = 105.7990;
    } else if (country === '라오스' && selectedCity === '시판돈') {
      latitude = 13.9625;
      longitude = 105.9204;
    } else if (country === '태국' && selectedCity === '방콕') {
      latitude = 13.7563;
      longitude = 100.5018;
    } else if (country === '태국' && selectedCity === '치앙마이') {
      latitude = 18.7883;
      longitude = 98.9853;
    } else if (country === '태국' && selectedCity === '푸켓') {
      latitude = 7.8804;
      longitude = 98.3923;
    } else if (country === '태국' && selectedCity === '파타야') {
      latitude = 12.9236;
      longitude = 100.8825;
    } else if (country === '태국' && selectedCity === '아유타야') {
      latitude = 14.3518;
      longitude = 100.5775;
    } else if (country === '베트남' && selectedCity === '하노이') {
      latitude = 21.0285;
      longitude = 105.8542;
    } else if (country === '베트남' && selectedCity === '호치민시') {
      latitude = 10.8231;
      longitude = 106.6297;
    } else if (country === '베트남' && selectedCity === '다낭') {
      latitude = 16.0544;
      longitude = 108.2022;
    } else if (country === '베트남' && selectedCity === '하롱베이') {
      latitude = 20.9101;
      longitude = 107.1839;
    } else if (country === '베트남' && selectedCity === '호이안') {
      latitude = 15.8801;
      longitude = 108.3380;
    } else if (country === '필리핀' && selectedCity === '마닐라') {
      latitude = 14.5995;
      longitude = 120.9842;
    } else if (country === '필리핀' && selectedCity === '세부') {
      latitude = 10.3157;
      longitude = 123.8854;
    } else if (country === '필리핀' && selectedCity === '보라카이') {
      latitude = 11.9674;
      longitude = 121.9248;
    } else if (country === '필리핀' && selectedCity === '다바오') {
      latitude = 7.1907;
      longitude = 125.4553;
    } else if (country === '필리핀' && selectedCity === '바기오') {
      latitude = 16.4023;
      longitude = 120.5960;
    } else if (country === '싱가포르' && selectedCity === '싱가포르시티') {
      latitude = 1.3521;
      longitude = 103.8198;
    } else if (country === '인도' && selectedCity === '뉴델리') {
      latitude = 28.6139;
      longitude = 77.2090;
    } else if (country === '인도' && selectedCity === '뭄바이') {
      latitude = 19.0760;
      longitude = 72.8777;
    } else if (country === '인도' && selectedCity === '자이푸르') {
      latitude = 26.9124;
      longitude = 75.7873;
    } else if (country === '인도' && selectedCity === '콜카타') {
      latitude = 22.5726;
      longitude = 88.3639;
    } else if (country === '인도' && selectedCity === '방갈로르') {
      latitude = 12.9716;
      longitude = 77.5946;
    } else if (country === '네팔' && selectedCity === '카트만두') {
      latitude = 27.7172;
      longitude = 85.3240;
    } else if (country === '네팔' && selectedCity === '포카라') {
      latitude = 28.2096;
      longitude = 83.9856;
    } else if (country === '네팔' && selectedCity === '룸비니') {
      latitude = 27.4828;
      longitude = 83.2760;
    } else if (country === '네팔' && selectedCity === '나가르코트') {
      latitude = 27.7150;
      longitude = 85.5203;
    } else if (country === '네팔' && selectedCity === '파르샤') {
      latitude = 27.0606;
      longitude = 84.1430;
    } // 유럽
    else if (country === '이탈리아' && selectedCity === '로마') {
      latitude = 41.9028;
      longitude = 12.4964;
    } else if (country === '이탈리아' && selectedCity === '베네치아') {
      latitude = 45.4408;
      longitude = 12.3155;
    } else if (country === '이탈리아' && selectedCity === '피렌체') {
      latitude = 43.7696;
      longitude = 11.2558;
    } else if (country === '이탈리아' && selectedCity === '밀라노') {
      latitude = 45.4642;
      longitude = 9.1900;
    } else if (country === '이탈리아' && selectedCity === '나폴리') {
      latitude = 40.8518;
      longitude = 14.2681;
    } else if (country === '독일' && selectedCity === '베를린') {
      latitude = 52.5200;
      longitude = 13.4050;
    } else if (country === '독일' && selectedCity === '뮌헨') {
      latitude = 48.1351;
      longitude = 11.5820;
    } else if (country === '독일' && selectedCity === '프랑크푸르트') {
      latitude = 50.1109;
      longitude = 8.6821;
    } else if (country === '독일' && selectedCity === '함부르크') {
      latitude = 53.5511;
      longitude = 9.9937;
    } else if (country === '독일' && selectedCity === '쾰른') {
      latitude = 50.9375;
      longitude = 6.9603;
    } else if (country === '영국' && selectedCity === '런던') {
      latitude = 51.5074;
      longitude = -0.1278;
    } else if (country === '영국' && selectedCity === '맨체스터') {
      latitude = 53.4808;
      longitude = -2.2426;
    } else if (country === '영국' && selectedCity === '에든버러') {
      latitude = 55.9533;
      longitude = -3.1883;
    } else if (country === '영국' && selectedCity === '리버풀') {
      latitude = 53.4084;
      longitude = -2.9916;
    } else if (country === '영국' && selectedCity === '브라이튼') {
      latitude = 50.8225;
      longitude = -0.1372;
    } else if (country === '프랑스' && selectedCity === '파리') {
      latitude = 48.8566;
      longitude = 2.3522;
    } else if (country === '프랑스' && selectedCity === '니스') {
      latitude = 43.7102;
      longitude = 7.2620;
    } else if (country === '프랑스' && selectedCity === '리옹') {
      latitude = 45.7640;
      longitude = 4.8357;
    } else if (country === '프랑스' && selectedCity === '마르세유') {
      latitude = 43.2965;
      longitude = 5.3698;
    } else if (country === '프랑스' && selectedCity === '스트라스부르') {
      latitude = 48.5734;
      longitude = 7.7521;
    } else if (country === '네덜란드' && selectedCity === '암스테르담') {
      latitude = 52.3676;
      longitude = 4.9041;
    } else if (country === '네덜란드' && selectedCity === '로테르담') {
      latitude = 51.9225;
      longitude = 4.4792;
    } else if (country === '네덜란드' && selectedCity === '헤이그') {
      latitude = 52.0705;
      longitude = 4.3007;
    } else if (country === '네덜란드' && selectedCity === '위트레흐트') {
      latitude = 52.0907;
      longitude = 5.1214;
    } else if (country === '네덜란드' && selectedCity === '에인트호번') {
      latitude = 51.4416;
      longitude = 5.4697;
    } else if (country === '스위스' && selectedCity === '취리히') {
      latitude = 47.3769;
      longitude = 8.5417;
    } else if (country === '스위스' && selectedCity === '제네바') {
      latitude = 46.2044;
      longitude = 6.1432;
    } else if (country === '스위스' && selectedCity === '루체른') {
      latitude = 47.0502;
      longitude = 8.3093;
    } else if (country === '스위스' && selectedCity === '베른') {
      latitude = 46.9470;
      longitude = 7.4474;
    } else if (country === '스위스' && selectedCity === '인터라켄') {
      latitude = 46.6863;
      longitude = 7.8632;
    } else if (country === '그리스' && selectedCity === '아테네') {
      latitude = 37.9838;
      longitude = 23.7275;
    } else if (country === '그리스' && selectedCity === '산토리니') {
      latitude = 36.3932;
      longitude = 25.4615;
    } else if (country === '그리스' && selectedCity === '미코노스') {
      latitude = 37.4467;
      longitude = 25.3289;
    } else if (country === '그리스' && selectedCity === '테살로니키') {
      latitude = 40.6401;
      longitude = 22.9444;
    } else if (country === '그리스' && selectedCity === '크레타') {
      latitude = 35.2401;
      longitude = 24.8093;
    } else if (country === '폴란드' && selectedCity === '바르샤바') {
      latitude = 52.2297;
      longitude = 21.0122;
    } else if (country === '폴란드' && selectedCity === '크라쿠프') {
      latitude = 50.0647;
      longitude = 19.9450;
    } else if (country === '폴란드' && selectedCity === '그단스크') {
      latitude = 54.3520;
      longitude = 18.6466;
    } else if (country === '폴란드' && selectedCity === '브로츠와프') {
      latitude = 51.1079;
      longitude = 17.0385;
    } else if (country === '폴란드' && selectedCity === '포즈난') {
      latitude = 52.4064;
      longitude = 16.9252;
    } else if (country === '우크라이나' && selectedCity === '키이우') {
      latitude = 50.4501;
      longitude = 30.5234;
    } else if (country === '우크라이나' && selectedCity === '리비우') {
      latitude = 49.8397;
      longitude = 24.0297;
    } else if (country === '우크라이나' && selectedCity === '오데사') {
      latitude = 46.4825;
      longitude = 30.7233;
    } else if (country === '우크라이나' && selectedCity === '하르키우') {
      latitude = 49.9935;
      longitude = 36.2304;
    } else if (country === '우크라이나' && selectedCity === '드니프로') {
      latitude = 48.4647;
      longitude = 35.0462;
    } else if (country === '스웨덴' && selectedCity === '스톡홀름') {
      latitude = 59.3293;
      longitude = 18.0686;
    } else if (country === '스웨덴' && selectedCity === '예테보리') {
      latitude = 57.7089;
      longitude = 11.9746;
    } else if (country === '스웨덴' && selectedCity === '말뫼') {
      latitude = 55.6049;
      longitude = 13.0038;
    } else if (country === '스웨덴' && selectedCity === '웁살라') {
      latitude = 59.8586;
      longitude = 17.6389;
    } else if (country === '스웨덴' && selectedCity === '룰레오') {
      latitude = 65.5848;
      longitude = 22.1547;
    } // 아메리카
    else if (country === '미국' && selectedCity === '뉴욕') {
      latitude = 40.7128;
      longitude = -74.0060;
    } else if (country === '미국' && selectedCity === '로스앤젤레스') {
      latitude = 34.0522;
      longitude = -118.2437;
    } else if (country === '미국' && selectedCity === '라스베이거스') {
      latitude = 36.1699;
      longitude = -115.1398;
    } else if (country === '미국' && selectedCity === '마이애미') {
      latitude = 25.7617;
      longitude = -80.1918;
    } else if (country === '미국' && selectedCity === '시카고') {
      latitude = 41.8781;
      longitude = -87.6298;
    } else if (country === '멕시코' && selectedCity === '멕시코시티') {
      latitude = 19.4326;
      longitude = -99.1332;
    } else if (country === '멕시코' && selectedCity === '칸쿤') {
      latitude = 21.1619;
      longitude = -86.8515;
    } else if (country === '멕시코' && selectedCity === '과달라하라') {
      latitude = 20.6597;
      longitude = -103.3496;
    } else if (country === '멕시코' && selectedCity === '푸에르토 바야르타') {
      latitude = 20.6534;
      longitude = -105.2253;
    } else if (country === '멕시코' && selectedCity === '메리다') {
      latitude = 20.9674;
      longitude = -89.5926;
    } else if (country === '브라질' && selectedCity === '리우데자네이루') {
      latitude = -22.9068;
      longitude = -43.1729;
    } else if (country === '브라질' && selectedCity === '상파울루') {
      latitude = -23.5505;
      longitude = -46.6333;
    } else if (country === '브라질' && selectedCity === '브라질리아') {
      latitude = -15.8267;
      longitude = -47.9218;
    } else if (country === '브라질' && selectedCity === '사우바도르') {
      latitude = -12.9714;
      longitude = -38.5014;
    } else if (country === '브라질' && selectedCity === '마나우스') {
      latitude = -3.1190;
      longitude = -60.0217;
    } else if (country === '아르헨티나' && selectedCity === '부에노스아이레스') {
      latitude = -34.6037;
      longitude = -58.3816;
    } else if (country === '아르헨티나' && selectedCity === '멘도사') {
      latitude = -32.8895;
      longitude = -68.8458;
    } else if (country === '아르헨티나' && selectedCity === '코르도바') {
      latitude = -31.4201;
      longitude = -64.1888;
    } else if (country === '아르헨티나' && selectedCity === '우수아이아') {
      latitude = -54.8019;
      longitude = -68.3029;
    } else if (country === '아르헨티나' && selectedCity === '로사리오') {
      latitude = -32.9442;
      longitude = -60.6505;
    } else if (country === '칠레' && selectedCity === '산티아고') {
      latitude = -33.4489;
      longitude = -70.6693;
    } else if (country === '칠레' && selectedCity === '발파라이소') {
      latitude = -33.0472;
      longitude = -71.6127;
    } else if (country === '칠레' && selectedCity === '푼타 아레나스') {
      latitude = -53.1638;
      longitude = -70.9171;
    } else if (country === '칠레' && selectedCity === '발디비아') {
      latitude = -39.8196;
      longitude = -73.2459;
    } else if (country === '칠레' && selectedCity === '칠로에 섬') {
      latitude = -42.6186;
      longitude = -73.7736;
    }
    
    getLocationKeyAPI(latitude, longitude)
      .then((key) => {
        setLocationKey(key);
      })
      .catch(() => {
        setError("위치 정보를 가져오는 중 오류가 발생했습니다.");
      });
  };

  // 5일치 날씨 데이터 
  useEffect(() => {
    if (locationKey) {
      get5DayWeatherAPI(locationKey)
        .then((res) => {
          if (res.DailyForecasts && res.DailyForecasts.length > 0) {
            setWeatherData(res.DailyForecasts);
          } else {
            setError("날씨 정보를 올바르게 가져올 수 없습니다.");
          }
        })
        .catch(() => {
          setError("날씨 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }
  }, [locationKey]);

  return (
    <Sidebar>
      <div className="country-content">
      <h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ display: "inline-block", marginRight: "10px" }}
  >
         <GiWorld style={{ fontSize: "30px", color: "#0077be" }} />
         </motion.div>
          국가와 지역을 선택하세요!
      </h3>
        {/* 국가 및 도시 선택 드롭다운 */}
        <div className="location-selector">
          <select onChange={(e) => handleSelectCountry(e.target.value)} value={country}>
            <option value="">국가를 선택하세요</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {country && (
            <select onChange={(e) => handleSelectCity(e.target.value)} value={city} style={{ marginLeft: '10px' }}>
              <option value="">도시를 선택하세요</option>
              {countryCityMap[country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
        </div>

        {error ? (
          <p>{error}</p>
        ) : weatherData.length > 0 ? (
          <div className="weather-forecast">
            {weatherData.map((day, index) => {
              const date = new Date(day.Date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              });

              const temperatureMax = ((day.Temperature.Maximum.Value - 32) * 5) / 9;
              const temperatureMin = ((day.Temperature.Minimum.Value - 32) * 5) / 9;

              return (
                <div className="day-forecast" key={index}>
                  <p className="date">{date}</p>
                  <img
                    src={`https://developer.accuweather.com/sites/default/files/${String(
                      day.Day.Icon
                    ).padStart(2, '0')}-s.png`}
                    alt="Weather Icon"
                    className="weather-icon"
                  />
                  <p className="temperature">
                    최고: {temperatureMax.toFixed(1)}°C / 최저: {temperatureMin.toFixed(1)}°C
                  </p>
                  <p className="weather-text">{day.Day.IconPhrase}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>로딩 중...</p>
        )}

        <div className="clothes-recommendation">
          {Object.keys(clothesCategories).map((category) => (
            <div key={category} className="clothes-category">
              <h4>• {category}</h4>
              <div className="clothes-items">
                {clothesCategories[category].map((imgSrc, index) => (
                  <div key={index} className="clothes-item">
                    <img src={imgSrc} alt={`${category} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default Country;