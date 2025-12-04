import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// 요청 인터셉터 - JWT 토큰 자동 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 'token' → 'accessToken'
       console.log('accessToken:', localStorage.getItem('accessToken'));


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('요청 헤더:', config.headers); // 디버깅용
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 등 인증 오류
      localStorage.removeItem('accessToken'); // 'token' → 'accessToken'
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;