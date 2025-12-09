import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNotice, getNoticeDetail, updateNotice } from '../../api/notice';
import FileUpload from './FileUpload';
import {
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
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);        // ✅ 새 대표 이미지
  const [existingThumbnail, setExistingThumbnail] = useState(null);  // ✅ 기존 대표 이미지
  const [files, setFiles] = useState([]);                  // ✅ 새 첨부 파일
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  컴포넌트 마운트 시 기존 데이터 불러오기
  useEffect(() => {
    fetchNoticeDetail();
  }, [noticeNo]);

const fetchNoticeDetail = async () => {
  try {
    setLoading(true);
    const data = await getNoticeDetail(noticeNo);
    
    setTitle(data.noticeTitle);
    setContent(data.noticeContent);
    setExistingThumbnail(data.thumbnailUrl);
    
    // 수정: fileUrls → imageUrls + originalFileNames
    if (data.imageUrls && data.imageUrls.length > 0) {
      // URL과 원본 파일명을 함께 저장
      const filesWithNames = data.imageUrls.map((url, index) => ({
        url: url,
        name: data.originalFileNames?.[index] || url.split('/').pop()
      }));
      setExistingFiles(filesWithNames);
    }
  } catch (err) {
    console.error('공지사항 조회 실패:', err);
    setError('공지사항을 불러오는데 실패했습니다.');
    alert('공지사항을 불러올 수 없습니다.');
    navigate('/notice');
  } finally {
    setLoading(false);
  }
};
  // 취소 버튼
const handleCancel = () => {
  if (window.confirm('수정을 취소하시겠습니까?')) {
    navigate(`/notice/${noticeNo}`);
  }
};

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
  // 수정 완료 버튼
  const handleSubmit = async () => {
  console.log('=== 수정 시작 ===');
  console.log('title:', title);
  console.log('content:', content);
  console.log('thumbnail:', thumbnail);
  console.log('files:', files);
  console.log('noticeNo:', noticeNo);
  
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
    
    const memberNo = parseInt(localStorage.getItem('memberNo') || '1');
    console.log('memberNo:', memberNo, 'type:', typeof memberNo);
    
    const formData = new FormData();
    formData.append('noticeTitle', title);
    formData.append('noticeContent', content);
    formData.append('memberNo', memberNo);
    
    if (filesToDelete.length > 0) {
  filesToDelete.forEach(url => formData.append('filesToDelete', url));
}

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    if (files && files.length > 0) {
      files.forEach(file => formData.append('files', file));
    }
    
    console.log('=== FormData 확인 ===');
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }
    
    console.log('=== API 호출 전 ===');
    console.log('URL:', `/notice/${noticeNo}`);
    
    await updateNotice(noticeNo, formData);
    
    alert('공지사항이 수정되었습니다.');
    navigate(`/notice/${noticeNo}`);
    
  } catch (error) {
    console.error('=== 에러 발생 ===');
    console.error('error:', error);
    console.error('error.response:', error.response);
    console.error('error.response?.data:', error.response?.data);
    
    if (error.response?.status === 403 || error.response?.status === 401) {
      alert('로그인이 필요합니다.');
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
{existingThumbnail && (  // ✅ 이게 있어야 함!
  <FormGroup>
    <Label>현재 대표 이미지</Label>
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src={`http://localhost:8081${existingThumbnail}`}
        alt="대표 이미지"
        style={{ maxWidth: '300px', borderRadius: '8px' }}
      />
      <button
        type="button"
        onClick={() => setExistingThumbnail(null)}
        style={{ 
          position: 'absolute', 
          top: '5px', 
          right: '5px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        삭제
      </button>
    </div>
  </FormGroup>
)}

{/* 새 대표 이미지 */}
<FormGroup>
  <Label>대표 이미지 변경 (선택)</Label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file && file.size > 10 * 1024 * 1024) {
        alert('이미지는 10MB 이하만 가능합니다.');
        return;
      }
      setThumbnail(file);
    }}
  />
  {thumbnail && (
    <div style={{ marginTop: '10px' }}>
      <img 
        src={URL.createObjectURL(thumbnail)}
        alt="새 이미지 미리보기"
        style={{ maxWidth: '300px', borderRadius: '8px' }}
      />
    </div>
  )}
</FormGroup>

{/* 기존 첨부 파일 */}
{existingFiles.length > 0 && (
  <FormGroup>
    <Label>현재 첨부 파일</Label>
    {existingFiles.map((file, index) => (
      <div key={index} style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '10px', 
        marginBottom: '5px',
        padding: '8px',
        background: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <a 
          href={`http://localhost:8081${file.url}`} 
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: 1, color: '#2563eb' }}
        >
          📎 {file.name}  {/* ✅ 원본 파일명 표시 */}
        </a>
     <DeleteButton
  type="button"
  onClick={() => {
    setFilesToDelete([...filesToDelete, file.url]);
    setExistingFiles(existingFiles.filter((_, i) => i !== index));
  }}
>
  삭제
</DeleteButton>
      </div>
    ))}
  </FormGroup>
)}

{/* 새 첨부 파일 */}
<FormGroup>
  <Label>첨부 파일 추가 (선택)</Label>
  <FileUpload 
    files={files} 
    setFiles={setFiles}
    maxFiles={15}
    maxSize={50}
  />
</FormGroup>

        <ButtonGroup>
          <CancelButton onClick={handleCancel} disabled={loading}>
            취소
          </CancelButton>
          <DeleteButton onClick={handleDelete} disabled={loading}>
            삭제하기
          </DeleteButton>
          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {loading ? '수정 중...' : '수정하기'}
          </SubmitButton>
        </ButtonGroup>
      </NoticeWrapper>
    </Container>
  );
};

export default NoticeUpdate;