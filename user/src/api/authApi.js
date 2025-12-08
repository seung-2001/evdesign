import axios from './axios';

export const authApi = {
  login: async (memberId, memberPwd) => {
    const response = await axios.post('/member/login', {
      memberId,
      memberPwd
    });
    
    // 토큰 저장
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};