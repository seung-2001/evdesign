import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNotice, getNoticeDetail } from '../../api/notice';
import {
  ButtonGroup,
  Container,
  ContentBox,
  ContentText,
  FormGroup,
  Input,
  Label,
  ListButton,
  NoticeWrapper,
  Subtitle,
  Title,
  TopButton,
  TopIcon
} from './NoticeDetail.styles';

const NoticeDetail = () => {
  const { noticeNo } = useParams();
  const navigate = useNavigate();
  
  
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  

  // ✅ 로그인한 사용자 정보 (추후 Context나 Redux로 관리)
  const currentMemberNo = parseInt(localStorage.getItem('memberNo') || '0');
  const role = localStorage.getItem('role') || '';
  const isAdmin = role.includes('ADMIN');
  

  useEffect(() => {
    fetchNoticeDetail();
  }, [noticeNo]);

  const fetchNoticeDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNoticeDetail(noticeNo);
      console.log('공지사항 상세:', data);
      setNotice(data);
    } catch (err) {
      console.error('공지사항 상세 조회 실패:', err);
      setError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleList = () => {
    navigate('/notice');
  };

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ 수정 버튼 클릭
  const handleEdit = () => {
    navigate(`/notice/update/${noticeNo}`);
  };

  // ✅ 삭제 버튼 클릭
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

//  수정 권한: 작성자 본인만*

const canEdit = notice && currentMemberNo === notice.memberNo;

//  삭제 권한: 관리자 OR 작성자 본인*

const canDelete = notice && (isAdmin || currentMemberNo === notice.memberNo);

  if (loading) {
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
          <ButtonGroup>
            <ListButton onClick={handleList}>목록</ListButton>
          </ButtonGroup>
        </NoticeWrapper>
      </Container>
    );
  }

  if (!notice) {
    return null;
  }

  return (
    <Container>
      <NoticeWrapper>
        <Title>공지사항</Title>
        <Subtitle>notice</Subtitle>
        
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            value={notice.noticeTitle}
            readOnly
          />
        </FormGroup>

        {notice.imageUrls && notice.imageUrls.length > 0 && (
          <FormGroup>
            <Label>첨부 이미지</Label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {notice.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={`${apiUrl}${url}`}
                  alt={`공지사항 이미지 ${index + 1}`}
                  style={{
                    maxWidth: '300px',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}
                />
              ))}
            </div>
          </FormGroup>
        )}

        <FormGroup>
          <Label>내용</Label>
          <ContentBox>
            <ContentText style={{ whiteSpace: 'pre-wrap' }}>
              {notice.noticeContent}
            </ContentText>
          </ContentBox>
        </FormGroup>

        <FormGroup>
          <Label>작성일</Label>
          <Input
            type="text"
            value={new Date(notice.createDate).toLocaleString('ko-KR')}
            readOnly
          />
        </FormGroup>

        <ButtonGroup>
          <ListButton onClick={handleList}>
            목록
          </ListButton>

          {/* ✅ 수정 버튼 (작성자 본인만) */}
{canEdit && (
  <ListButton 
    onClick={handleEdit}
    style={{ background: '#4CAF50' }}
  >
    수정
  </ListButton>
)}
              {/* ✅ 삭제 버튼 (관리자 OR 작성자 본인) */}
{canDelete && (
  <ListButton 
    onClick={handleDelete}
    style={{ background: '#f44336' }}
  >
    삭제
  </ListButton>
)}

          <TopButton onClick={handleTop}>
            <TopIcon>▲</TopIcon>
            TOP
          </TopButton>
        </ButtonGroup>
      </NoticeWrapper>
    </Container>
  );
};

export default NoticeDetail;