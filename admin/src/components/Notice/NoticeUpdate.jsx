import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNotice, getNoticeDetail, updateNotice } from '../../api/notice';
import {
    AttachButton,
    ButtonGroup,
    CancelButton,
    Container,
    DeleteButton,
    FormGroup,
    Input,
    Label,
    NoticeWrapper,
    SubmitButton,
    Subtitle,
    TextArea,
    Title
} from './NoticeUpdate.styles';

const NoticeUpdate = () => {
  const { noticeNo } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ 컴포넌트 마운트 시 기존 데이터 불러오기
  useEffect(() => {
    fetchNoticeDetail();
  }, [noticeNo]);

  const fetchNoticeDetail = async () => {
    try {
      setLoading(true);
      const data = await getNoticeDetail(noticeNo);
      
      setTitle(data.noticeTitle);
      setContent(data.noticeContent);
      setExistingImages(data.imageUrls || []);
    } catch (err) {
      console.error('공지사항 조회 실패:', err);
      setError('공지사항을 불러오는데 실패했습니다.');
      alert('공지사항을 불러올 수 없습니다.');
      navigate('/notice');
    } finally {
      setLoading(false);
    }
  };

  // ✅ 취소 버튼
  const handleCancel = () => {
    if (window.confirm('수정을 취소하시겠습니까?')) {
      navigate(`/notice/${noticeNo}`);
    }
  };

  // ✅ 삭제 버튼
  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteNotice(noticeNo);
      alert('공지사항이 삭제되었습니다.');
      navigate('/notice');
    } catch (err) {
      console.error('공지사항 삭제 실패:', err);
      alert('공지사항 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ 파일 선택
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    console.log('선택된 파일:', selectedFiles);
  };

  // ✅ 파일 첨부 버튼 (숨겨진 input 트리거)
  const handleAttach = () => {
    document.getElementById('fileInput').click();
  };

  // ✅ 수정 완료 버튼
  const handleSubmit = async () => {
    // 유효성 검사
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    try {
      setLoading(true);
      
      const memberNo = localStorage.getItem('memberNo') || 1;
      
      const noticeData = {
        noticeTitle: title,
        noticeContent: content,
        memberNo: parseInt(memberNo)
      };

      await updateNotice(noticeNo, noticeData, files);
      
      alert('공지사항이 수정되었습니다.');
      navigate(`/notice/${noticeNo}`);
      
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
      
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else if (error.response?.status === 400) {
        alert(error.response.data.message || '잘못된 요청입니다.');
      } else {
        alert('공지사항 수정에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !title) {
    return (
      <Container>
        <NoticeWrapper>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            로딩 중...
          </div>
        </NoticeWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <NoticeWrapper>
          <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
            {error}
          </div>
        </NoticeWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <NoticeWrapper>
        <Title>공지사항 수정</Title>
        <Subtitle>notice</Subtitle>
        
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
        </FormGroup>

        {/* ✅ 기존 이미지 미리보기 */}
        {existingImages.length > 0 && (
          <FormGroup>
            <Label>기존 첨부 이미지</Label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {existingImages.map((url, index) => (
                <img
                  key={index}
                  src={`http://localhost:8081${url}`}
                  alt={`기존 이미지 ${index + 1}`}
                  style={{
                    maxWidth: '200px',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}
                />
              ))}
            </div>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              ※ 새 파일을 첨부하면 기존 이미지가 모두 삭제됩니다.
            </div>
          </FormGroup>
        )}

        {/* ✅ 새 파일 선택 */}
        <FormGroup>
          <Label>새 파일 첨부 (선택)</Label>
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {files.length > 0 && (
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              선택된 파일: {files.map(f => f.name).join(', ')}
            </div>
          )}
        </FormGroup>

        <ButtonGroup>
          <CancelButton onClick={handleCancel} disabled={loading}>
            취소
          </CancelButton>
          <DeleteButton onClick={handleDelete} disabled={loading}>
            삭제하기
          </DeleteButton>
          <AttachButton onClick={handleAttach} disabled={loading}>
            파일 첨부하기
          </AttachButton>
          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {loading ? '수정 중...' : '수정하기'}
          </SubmitButton>
        </ButtonGroup>
      </NoticeWrapper>
    </Container>
  );
};

export default NoticeUpdate;