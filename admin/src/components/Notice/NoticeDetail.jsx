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
    console.log('fileUrls:', data.fileUrls);  // ✅ 추가
    console.log('imageUrls:', data.imageUrls);  // ✅ 추가
    console.log('thumbnailUrl:', data.thumbnailUrl);  // ✅ 추가
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

{/* 대표 이미지 */}
{/* 대표 이미지 */}
{notice.thumbnailUrl && (
  <FormGroup>
    <Label>대표 이미지</Label>
    <img 
      src={`http://localhost:8081${notice.thumbnailUrl}`}
      alt="대표 이미지"
      style={{
        maxWidth: '300px',
        height: 'auto',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}
    />
  </FormGroup>
)}

{/* 첨부 파일 */}
{notice.fileUrls && notice.fileUrls.length > 0 && (
  <FormGroup>
    <Label>첨부 파일</Label>
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '15px',
      backgroundColor: '#f9f9f9'
    }}>
      {notice.fileUrls.map((url, index) => {
        const fileName = url.split('/').pop();
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderBottom: index < notice.fileUrls.length - 1 ? '1px solid #eee' : 'none'
            }}
          >
            <span style={{ fontSize: '20px' }}>📎</span>
            <span style={{ flex: 1, color: '#333' }}>{fileName}</span>
            
              <a href={`http://localhost:8081${url}`}
              download
              style={{
                padding: '6px 12px',
                backgroundColor: '#4a90e2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              다운로드
            </a>
          </div>
        );
      })}
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