import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  //headers: {
  //  'Content-Type': 'application/json',
  //},
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    // ❌ alert('Token: ' + token);  // 삭제
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // ❌ alert('헤더 추가 완료');  // 삭제
    } 
    // ❌ else { alert('토큰 없음!'); }  // 삭제
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('인증 실패');
      // 필요하면: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;