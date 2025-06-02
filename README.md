# 💡MOIPZY
사용자의 위치 및 날씨 정보를 기반으로 일정과 소유 의류를 고려하여 최적의 옷차림을 추천하는 웹 애플리케이션입니다.🌤️

[2024-2] 중앙대학교 소프트웨어학부 캡스톤 디자인 프로젝트  

<br>

## 💻 팀원

| 이름    | 이석주                                        | 박상훈                            | 강정훈                           |
| ------- | --------------------------------------------- | --------------------------------- | ------------------------------- |
| **git** | [hknhj](https://github.com/hknhj) | [sanghuniolsida](https://github.com/sanghuniolsida) | [KangJeungHun](https://github.com/KangJeungHun)   |

<br>
<br>

## 역할 분담
- **강정훈**: UI / UX
  - 피그마를 사용하여 기초적인 웹 와이어프레임 작성

- **박상훈**: Front-end
  - React를 사용하여 프론트엔드 전체 구현 담당
  - Vercel을 통하여 프론트엔드 배포

- **이석주**: Back-end
  - Springboot를 사용하여 백엔드 전체 구현 담당
  - AWS EC2, AWS RDS를 사용하여 백엔드 서버 배포

<br>

## 주요 기능
- **🌡️날씨 정보 제공**: 현재 위치의 실시간 날씨, 최고/최저 기온 표시
- **🧥옷차림 추천**: 사용자의 소유 의류를 활용하여 기온과 일정에 적합한 옷차림 추천
- **🗓️일정 연동**: 일정에 따라 옷 스타일 조정
- **🎨사용자 맞춤 경험**: 사용자별 데이터 저장 기능(선택한 옷차림, 옷차림 피드백, 옷 등록, 옷 정보 수정 및 삭제 등)
- **🤖챗봇 연동**: 카카오톡 챗봇을 연결하여 사용자 편의성 개선

<br>

## 기술 스택
**Frontend**: React.js, Vercel
<br>
<br>
**Backend** : 
<br>
<br>
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<br>
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white">
<br>
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> 
<img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"> 

**API**:
  - OpenWeather API: 실시간 날씨 데이터
  - Google Calendar API: 일정 연동
  - ChatGPT API: 스타일 추천 로직   
**Authentication**: JWT, OAuth 2.0 (Google 로그인)   
**Deployment**: AWS EC2, Vercel

<br>

## 🛠️ Architecture
![아키텍쳐 다이어그램](https://github.com/user-attachments/assets/91ec3e15-eed5-4c0a-85cb-f2665bc28948)

<br>

## 프로젝트 구조 (Backend)
```
src  
 └── main  
     ├── java  
     │   └── com.wrongweather.moipzy  
     │       ├── domain  
     │       │   ├── calendar      # 캘린더 관련 도메인 로직 및 API  
     │       │   ├── chatGPT       # ChatGPT API와의 통신 및 데이터 처리  
     │       │   ├── clothes       # 옷 관련 데이터 처리 및 로직  
     │       │   ├── clothImg      # 옷 이미지 업로드 및 관리  
     │       │   ├── crawling      # 옷 쇼핑몰 크롤링 관련 API  
     │       │   ├── email         # 이메일 전송 및 인증 처리  
     │       │   ├── jwt           # JWT 관련 인증 및 토큰 처리  
     │       │   ├── kakao         # 카카오톡 챗봇 연동 및 로직  
     │       │   ├── oAuth2        # OAuth 2.0 인증 처리  
     │       │   ├── schedule      # 서버 구동 시, 일정 시간 마다 일정, 기온 업데이트 하는 스케줄러  
     │       │   ├── style         # 옷차림 추천 로직  
     │       │   ├── token         # 구글 캘린더 연동을 위해 필요한 access/refresh token 관리  
     │       │   ├── users         # 사용자 관련 데이터 처리  
     │       │   ├── weather       # 날씨 데이터 연동 및 처리  
     │       │   └── BaseTimeEntity # 엔티티 생성 및 수정 시간 추적 공통 모듈  
     │       └── global  
     │           ├── MoipzyApplication # Spring Boot 애플리케이션 시작점  
     └── resources  
         ├── static.uploads.clothes  # 옷 이미지 업로드 저장소  
         ├── templates               # 이메일 템플릿 또는 기타 HTML 파일  
         └── application.yml         # Spring Boot 설정 파일
```

## 프로젝트 구조 (Frontend)
```
src/
├── api/             # 날씨 관련 API
├── components/      # 공용 컴퍼넌트1- 옷 차림 등록 등등
├── components2/     # 공용 컴퍼넌트2- 메뉴바,팝업 형식, 추천 형식 등
├── pages/          
│   ├── Clothregister/   # 옷 등록 페이지
│   ├── Country/         # 여행 페이지
│   ├── Feedback/        # 옷 피드백 페이지 
│   ├── Home/            # 홈 페이지
│   ├── Login/           # 로그인 페이지
│   ├── Loginmypage/     # 로그인 후 리디렉션 하는 마이페이지
│   ├── Mycloth/         # 내 옷(사용자가 소유한 옷) 페이지
│   ├── MyclothModify/   # 옷 정보 수정 및 삭제 페이지
│   ├── Signup/          # 회원가입 페이지
│   └── GoogleCallback.js # 구글 로그인 연동

```

# 사용 예시 (Usage Example)

## 1. 홈페이지 (Home)
- **기능**: 현재 위치 기반 날씨 정보를 제공하고, 날씨에 맞는 옷차림을 텍스트로 추천합니다.
- **사용 방법**:
  1. 홈페이지에 접속하면, 현재 위치와 현재 위치의 날씨가 자동으로 표시됩니다.
  2. 추천받은 옷차림을 확인하고 일상에 참고할 수 있습니다.

<img width="938" alt="image" src="https://github.com/user-attachments/assets/16d00a60-a930-4158-9774-7a6664fbe434" />

---

## 2. 로그인 (Login)
- **기능**: 사용자 계정으로 로그인하여 개인화된 서비스를 이용합니다.(일반 로그인과 구글 계정 연동 로그인 두 가지 방식)
- **사용 방법**:
  1. 이메일과 비밀번호를 입력한 후 "로그인" 버튼을 클릭합니다.
  2. 로그인이 성공하면 마이페이지로 이동합니다.

<img width="983" alt="image" src="https://github.com/user-attachments/assets/dd1c921d-2540-4550-8346-e4e7434c12bb" />

---

## 3. 회원가입 (Signup)
- **기능**: 새로운 계정을 생성합니다.
- **사용 방법**:
  1. 이름, 이메일, 비밀번호 등의 정보를 입력합니다.
  2. "회원가입" 버튼을 클릭하여 계정을 생성합니다.

<img width="713" alt="image" src="https://github.com/user-attachments/assets/0952fe66-404b-4d4a-b70e-61989720de2b" />

---

## 4. 마이페이지 (My Page)
- **기능**:  현재 위치 기반 날씨 정보를 제공하고, 날씨와 일정에 맞는 옷차림을 3 가지 추천합니다.
- **사용 방법**:
  1. 로그인 후 마이페이지로 이동합니다.

![image](https://github.com/user-attachments/assets/cb0ff0bc-b04e-401d-8c1d-0db5764cf7ac)

---

## 5. 옷차림 등록 (Outfit Registration)
- **기능**: 추천 받은 옷차림을 오늘 입은 옷으로 등록합니다.
- **사용 방법**:
  1. 마이페이지에서 추천 받은 폼중에서 원하는 옷차림 추천 폼 선택
  2. 착용하려는 옷을 선택하고 "등록" 버튼을 클릭합니다.

![image](https://github.com/user-attachments/assets/372744eb-3900-41d7-8f5a-97edece56bce)

---

## 6. 옷차림 피드백 (Outfit Feedback)
- **기능**: 추천받은 옷차림에 대한 피드백을 작성합니다.
- **사용 방법**:
  1. 추천받은 옷차림 아래에 HOT, GOOD, COLD을 선택합니다.

<img width="478" alt="image" src="https://github.com/user-attachments/assets/1f62069c-d396-49e2-87b5-8af60b38b653" />

---

## 7. 옷장 (Wardrobe)
- **기능**: 사용자가 등록한 옷을 카테고리별로 관리합니다.
- **사용 방법**:
  1. 상의, 하의, 외투 등의 카테고리를 선택합니다.
  2. 각 옷의 상세 정보를 확인하거나 수정 및 삭제할 수 있습니다.

![image](https://github.com/user-attachments/assets/0b4fff97-347c-496c-8ef4-7d592f8ae367)

---

## 8. 옷 등록 (Clothing Registration)
- **기능**: 새 옷을 등록하여 옷장에 추가합니다.
- **사용 방법**:
  1. 옷의 사진을 업로드하고, 카테고리, 색상 등을 입력합니다.
     +) 옷 사이트 링크를 넣으면 옷의 이미지와 상품명, 대분류, 소분류, 색상이 자동으로 기입됩니다.
  3. "등록" 버튼을 클릭하여 저장합니다.

<img width="1088" alt="image" src="https://github.com/user-attachments/assets/dc2a5c60-7006-4f37-9727-36dc07ed302b" />

---

## 9. 여행 페이지 (Travel Page)
- **기능**: 여행지를 선택하고 해당 지역의 기상 예보와 추천 옷을 확인합니다.
- **사용 방법**:
  1. 여행지 나라와 도시를 선택합니다.
  2. 해당 지역의 기상 예보와 추천 옷이 표시됩니다.

![image](https://github.com/user-attachments/assets/43f19c51-0bf2-4203-8cb3-7f3980368ca2)

---

## 10. 카카오톡 챗봇
- **기능**: 카카오톡 챗봇을 사용해 사용자에게 일정 및 기온 조회, 옷차림 추천을 해줍니다.
- **사용 방법**:
  1. 날씨, 일정정보를 통해 오늘 또는 내일의 정보를 알 수 있습니다.
  <img src="https://github.com/user-attachments/assets/d61d59f6-1527-43c3-8fa7-fd53ad35c904" alt="image" width="500" style="height:auto;">
  
  2. 옷차림 추천를 통해 기온, 일정에 맞는 옷차림을 추천해줍니다.
  <img src="https://github.com/user-attachments/assets/cdc29de6-8b71-48a1-a864-933885f537ac" alt="image" width="400" style="height:auto;">

