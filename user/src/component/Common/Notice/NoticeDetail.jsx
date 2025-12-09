import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNoticeDetail } from '../../../api/notice';
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

  // ✅ 파일 다운로드 핸들러 추가
  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = `http://localhost:8081${url}`;
    link.download = url.split('/').pop(); // 파일명 추출
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

        {/* ✅ 대표 이미지 표시 */}
        {notice.thumbnailUrl && (
          <FormGroup>
            <Label>대표 이미지</Label>
            <div>
              <img
                src={`http://localhost:8081${notice.thumbnailUrl}`}
                alt="대표 이미지"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  border: '2px solid #4a90e2'
                }}
              />
            </div>
          </FormGroup>
        )}

        {/* ✅ 첨부 이미지 표시 (대표 이미지 제외) */}
        {notice.imageUrls && notice.imageUrls.length > 0 && (
          <FormGroup>
            <Label>첨부 이미지</Label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {notice.imageUrls
                .filter(url => url !== notice.thumbnailUrl) // 대표 이미지 제외
                .map((url, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8081${url}`}
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

        {/* ✅ 첨부 파일 표시 및 다운로드 */}
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
                    <button
                      onClick={() => handleDownload(url)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#4a90e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#357abd'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#4a90e2'}
                    >
                      다운로드
                    </button>
                  </div>
                );
              })}
            </div>
          </FormGroup>
        )}

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