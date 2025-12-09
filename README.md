# EVision - 전기차 충전 서비스 플랫폼

전기차 충전소 검색 및 차량 예약 서비스를 제공하는 풀스택 웹 애플리케이션

## 🚀 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | React 18, Vite |
| **Styling** | styled-components (CSS-in-JS) |
| **State** | React Context API |
| **Routing** | React Router DOM |
| **Map** | Kakao Map API |
| **Backend** | Spring Boot (별도 레포지토리) |

---

## 📄 페이지 리스트

### 👤 User App (`/user`)

#### 🏠 메인
- [x] 메인 페이지 (`/`)

#### 🔑 인증/인가
- [x] 로그인 (`/login`)
- [x] 회원가입 (`/join`)
- [x] 내 정보 (`/info`)
- [x] 회원정보 수정 (`/update`)
- [x] 비밀번호 변경 (`/changePwd`)
- [x] 운전면허 인증 (`/infoLicense`)

#### 📝 게시판
- [x] 게시글 목록 (`/boardList`)
- [x] 게시글 작성 (`/boardInsert`)
- [x] 게시글 상세 (`/boardDetail/:boardNo`)
- [x] 게시글 수정 (`/boardUpdate/:boardNo`)

#### 📢 공지사항
- [x] 공지사항 목록 (`/notice`)
- [x] 공지사항 상세 (`/notice/:noticeNo`)

#### 🚗 차량
- [x] 차량 목록 (`/car`)
- [x] 차량 상세 (`/car/detail`)
- [x] 차량 등록/수정 (`/car/save`)

#### 🔌 충전소
- [x] 충전소 정보 (`/station/info`)

#### 📢 신고/문의
- [x] 신고/문의 등록 (`/report`, `/report/:boardNo`)
- [x] 내 신고 내역 (`/myReports`)

---

### 🔧 Admin Dashboard (`/admin`)

#### 🏠 메인
- [x] 회원 관리 대시보드 (`/`)

#### 🔑 인증
- [x] 관리자 로그인 (`/login`)
- [x] 내 정보 (`/info`)

#### 👥 회원 관리
- [x] 회원 관리 (`/member-manage`)

#### 🚗 차량 관리
- [x] 차량 등록/수정 (`/cars`)
- [ ] 차량 목록 (구현 예정)
- [ ] 차량 상세보기 (구현 예정)
- [ ] 차량 예약 관리 (구현 예정)

#### 🔌 충전소 관리
- [x] 충전소 관리 (`/charging-station`)

#### 📢 신고/문의 관리
- [x] 문의 관리 (`/inquiry`)

#### 📝 게시판 관리
- [x] 게시판 관리 (`/board`)

#### 📢 공지사항 관리
- [x] 공지사항 목록 (`/notice`)
- [x] 공지사항 작성 (`/notice/insert`)
- [x] 공지사항 수정 (`/notice/update/:noticeNo`)
- [x] 공지사항 상세 (`/notice/:noticeNo`)

#### 💳 결제 관리
- [x] 결제 관리 (`/payment`)

#### ⚙️ 설정
- [x] 설정 (`/settings`)

---

## 📁 프로젝트 구조

```
evdesign/
├── admin/          # 관리자 대시보드
├── user/           # 사용자 앱
└── README.md
```

---

## 👤 User App (`/user`)

사용자용 전기차 충전 서비스 웹 애플리케이션

### 구조
```
user/src/component/Common/
├── Board/          # 게시판
├── Car/            # 차량 예약
│   ├── CarDetail/  # 차량 상세
│   └── SaveCar/    # 차량 저장
├── Footer/         # 푸터
├── Header/         # 헤더
├── MainContent/    # 메인 콘텐츠
├── Map/            # 카카오 지도
├── Member/         # 회원
│   ├── info/       # 내 정보
│   ├── Join/       # 회원가입
│   ├── License/    # 면허 등록
│   ├── login/      # 로그인
│   └── MyReports/  # 내 신고 내역
├── Notice/         # 공지사항
├── Report/         # 신고하기
├── Station/        # 충전소 정보
└── Styles/         # 공통 스타일
```

### 주요 기능
- 🗺️ **충전소 찾기** - 카카오맵 기반 주변 충전소 검색
- ⚡ **충전소 정보** - 상세 정보 및 리뷰 확인
- 🚗 **차량 예약** - EV 차량 예약 신청
- 👤 **회원관리** - 회원가입, 로그인, 면허 등록
- 📢 **신고하기** - 충전소 관련 불편사항 신고
- 📋 **게시판** - 사용자 커뮤니티

---

## 🔧 Admin Dashboard (`/admin`)

관리자용 대시보드 애플리케이션

### 구조
```
admin/src/components/
├── CarReservation/     # 차량 예약 관리
├── ChargingStation/    # 충전소 관리
├── DataTable/          # 공통 데이터 테이블
├── FilterSection/      # 필터 컴포넌트
├── Header/             # 헤더
├── Help/               # 도움말
├── Inquiry/            # 문의 관리
├── Layout/             # 레이아웃
├── Member/             # 회원 관리
│   ├── info/           # 내 정보
│   ├── login/          # 로그인
│   └── manage/         # 회원 관리
├── Payment/            # 결제 관리
├── Settings/           # 설정
├── Sidebar/            # 사이드바
└── Styles/             # 공통 스타일
```

### 주요 기능
- ⚡ **충전소 관리** - 충전소 등록, 수정, 삭제 및 상태 관리
- 🚗 **차량 예약 관리** - 예약 현황 조회 및 승인/거절 처리
- 👥 **회원 관리** - 회원 정보 조회 및 관리
- 💬 **문의 관리** - 사용자 문의 확인 및 답변
- 💳 **결제 관리** - 결제 내역 조회 및 환불 처리

---

## 🛠️ 설치 및 실행

### User App 실행
```bash
cd user
npm install
npm run dev
```

### Admin Dashboard 실행
```bash
cd admin
npm install
npm run dev
```

### 프로덕션 빌드
```bash
# User
cd user && npm run build

# Admin
cd admin && npm run build
```

---

## 🗺️ 카카오맵 설정

`user/index.html`에 Kakao Map API 스크립트 추가:

```html
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY(JavaScript SDK)&libraries=services,clusterer"></script>
```

---

## 🔐 인증

- JWT 기반 인증 (Access Token + Refresh Token)
- localStorage에 토큰 저장
- Context API를 통한 전역 인증 상태 관리

---

## 📝 환경 변수

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_KAKAO_MAP_KEY=your_kakao_map_key
```

---

## 👥 팀 정보

**EVision 개발팀**

