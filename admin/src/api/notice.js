import api from './axios';

// 공지사항 전체 목록 조회
export const getNoticeList = async (pageNo = 1) => {
  try {
    const response = await api.get('/notice/list', {
      params: { pageNo }
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 목록 조회 실패:', error);
    throw error;
  }
};

// 공지사항 검색
export const getNoticeSearch = async (pageNo = 1, keyword) => {
  try {
    const response = await api.get('/notice/search', {
      params: { pageNo, keyword }
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 검색 실패:', error);
    throw error;
  }
};

// 공지사항 상세 조회
export const getNoticeDetail = async (noticeNo) => {
  try {
    const response = await api.get(`/notice/${noticeNo}`);
    return response.data;
  } catch (error) {
    console.error('공지사항 상세 조회 실패:', error);
    throw error;
  }
};

// 공지사항 작성
export const createNotice = async (formData) => {
  try {
    const response = await api.post('/notice/create', formData);
    return response.data;
  } catch (error) {
    console.error('공지사항 작성 실패:', error);
    throw error;
  }
};

// 공지사항 수정
export const updateNotice = async (noticeNo, formData) => {
  try {
    const response = await api.put(`/notice/${noticeNo}`, formData);
    return response.data;
  } catch (error) {
    console.error('공지사항 수정 실패:', error);
    throw error;
  }
};

// 공지사항 삭제
export const deleteNotice = async (noticeNo) => {
  try {
    const response = await api.delete(`/notice/${noticeNo}`);
    return response.data;
  } catch (error) {
    console.error('공지사항 삭제 실패:', error);
    throw error;
  }
};