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
  const navigate = useNavigate();  // ✅ 추가
  const { auth, isAuthLoading } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);  // ✅ 추가
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

  

  const handleSubmit = async () => {  // ✅ async 추가
    // 유효성 검사
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    // ✅ API 호출
    try {
      setLoading(true);
      
      // memberNo는 로그인한 사용자 정보에서 가져와야 함 (임시로 1)
      const memberNo = localStorage.getItem('memberNo') || 1;
      
      const noticeData = {
        noticeTitle: title,
        noticeContent: content,
        memberNo: parseInt(memberNo)
      };

      await createNotice(noticeData, files);
      
      alert('공지사항이 등록되었습니다.');
      navigate('/notice');
      
    } catch (error) {
      console.error('공지사항 등록 실패:', error);
      
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('공지사항 등록에 실패했습니다.');
      }
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
  <Label>파일 첨부</Label>
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