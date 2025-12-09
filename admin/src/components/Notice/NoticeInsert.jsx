import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNotice } from '../../api/notice';
import { AuthContext } from '../../context/AuthContext';
import FileUpload from './FileUpload';
import {
  ButtonGroup,
  CancelButton,
  Container,
  FormGroup,
  Input,
  Label,
  NoticeWrapper,
  SubmitButton,
  Subtitle,
  TextArea,
  Title
} from './Notice.styles';

const NoticeInsert = () => {
  const navigate = useNavigate();  
  const { auth, isAuthLoading } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);  
   useEffect(() => {
    if (!isAuthLoading && !auth.isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [isAuthLoading, auth.isAuthenticated, navigate]);
  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate('/notice');  // ✅ 수정
    }
  };

  

const handleSubmit = async () => {
  
  console.log('=== 제출 시작 ===');
  console.log('title:', title);
  console.log('content:', content);
  console.log('thumbnail:', thumbnail);
  console.log('files:', files);

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
    const formData = new FormData();
    
    console.log('=== FormData 추가 전 ===');
    formData.append('noticeTitle', title);
    formData.append('noticeContent', content);
    formData.append('memberNo', memberNo);
    console.log('=== FormData 확인 ===');
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }
    // 대표 이미지
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    
    // 첨부 파일들
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
    }
    
    await createNotice(formData);
    
    alert('공지사항이 등록되었습니다.');
    navigate('/notice');
    
  } catch (error) {
    console.error('공지사항 등록 실패:', error);
    alert('공지사항 등록에 실패했습니다.');
  } finally {
    setLoading(false);
  }
};

  return (
    <Container>
      <NoticeWrapper>
        <Title>공지사항 작성</Title>
        <Subtitle>notice</Subtitle>
        
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}  // ✅ 추가
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            disabled={loading}  // ✅ 추가
          />
        </FormGroup>

        <FormGroup>
  <Label>대표 이미지 (선택)</Label>
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
        alt="미리보기"
        style={{ maxWidth: '300px', borderRadius: '8px' }}
      />
    </div>
  )}
</FormGroup>

{/* 첨부 파일 */}
<FormGroup>
  <Label>첨부 파일 (선택)</Label>
  <FileUpload 
    files={files} 
    setFiles={setFiles}
    maxFiles={15}
    maxSize={50}
  />
</FormGroup>

        <ButtonGroup>
          <CancelButton onClick={handleCancel} disabled={loading}>  {/* ✅ 추가 */}
            취소
          </CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={loading}>  {/* ✅ 추가 */}
            {loading ? '등록 중...' : '글쓰기'}  {/* ✅ 수정 */}
          </SubmitButton>
        </ButtonGroup>
      </NoticeWrapper>
    </Container>
  );
};

export default NoticeInsert;