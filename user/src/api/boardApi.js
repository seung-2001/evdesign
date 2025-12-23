import axios from './axios';

const API_BASE_URL = '${apiUrl}';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 요청 인터셉터: 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const boardApi = {
  // 게시글 목록 조회
  getBoards: async (page = 0) => {
    try {
      const response = await api.get('/boards', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 상세 조회
  getBoard: async (boardNo) => {
    try {
      const response = await api.get(`/boards/${boardNo}`);
      return response.data;
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 작성
  createBoard: async (boardData, file) => {
    try {
      const formData = new FormData();
      
      // JSON 데이터를 Blob으로 추가
      formData.append(
        'board',
        new Blob([JSON.stringify(boardData)], { type: 'application/json' })
      );

      // 파일이 있으면 추가
      if (file) {
        formData.append('file', file);
      }

      console.log('=== FormData 전송 ===');
      console.log('boardData:', boardData);
      console.log('file:', file);

      const response = await api.post('/boards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      console.error('에러 응답:', error.response?.data);
      throw error;
    }
  },

  // 게시글 수정
  updateBoard: async (boardNo, boardData, file) => {
    try {
      const formData = new FormData();
      
      formData.append(
        'board',
        new Blob([JSON.stringify(boardData)], { type: 'application/json' })
      );

      if (file) {
        formData.append('file', file);
      }

      const response = await api.put(`/boards/${boardNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      throw error;
    }
  },

  // 게시글 삭제
  deleteBoard: async (boardNo) => {
    try {
      const response = await api.delete(`/boards/${boardNo}`);
      return response.data;
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      throw error;
    }
  },

  // 조회수 증가
  increaseViewCount: async (boardNo) => {
    try {
      // 조회수 증가는 별도 API가 있거나, 상세 조회 시 자동 증가됨
      // 필요시 백엔드에 API 추가
      return true;
    } catch (error) {
      console.error('조회수 증가 실패:', error);
      throw error;
    }
  },
};

export default boardApi;