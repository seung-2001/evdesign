import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNoticeList, getNoticeSearch } from '../../api/notice';
import { useSearch } from '../../context/SearchContext';
import { 
  Title,
  Subtitle,
  Container, 
  ContentWrapper,
  ImagePlaceholder, 
  NoticeBody, 
  NoticeCard, 
  NoticeContent, 
  NoticeList, 
  NoticeTitle,
  Pagination,
  PaginationButton,
  PageNumber,
  Ellipsis,
  WriteButton,
  SearchSection,
  SearchLabel,
  SearchBox,
  ClearButton
} from "./Notice.styles";

const Notice = () => {
  const {searchKeyword } = useSearch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, [currentPage, searchKeyword]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (searchKeyword) {
        data = await getNoticeSearch(currentPage, searchKeyword);
      } else {
        data = await getNoticeList(currentPage);
      }
      
      setNotices(data.noticeList);
      setPageInfo(data.pageInfo);
    } catch (err) {
      console.error('공지사항 조회 실패:', err);
      setError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= (pageInfo?.maxPage || 1)) {
      setCurrentPage(page);
    }
  };

  const handleWriteClick = () => {
  navigate('/notice/insert');
};


  const handleNoticeClick = (noticeNo) => {
    navigate(`/notice/${noticeNo}`);
  };

  const renderPageNumbers = () => {
  if (!pageInfo) return null;
  
  const pages = [];
  const { startPage, endPage, currentPage: current } = pageInfo;

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <PageNumber
        key={i}
        $active={i === current}  // ✅ active → $active
        onClick={() => handlePageChange(i)}
      >
        {i}
      </PageNumber>
    );
  }

  return pages;
};

return (
  <Container>
    <ContentWrapper>
      <Title>공지사항</Title>
      <Subtitle>notice</Subtitle>
      <br /><br /><br /><br />

      {/* ✅ 글쓰기 버튼만 (오른쪽 정렬) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        marginBottom: '20px',
      }}>
        <WriteButton onClick={handleWriteClick}>
          글쓰기
        </WriteButton>
      </div>

            

        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>}
        {error && <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>}

        {!loading && !error && (
          <>
            <NoticeList>
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <NoticeCard 
                    key={notice.noticeNo}
                    onClick={() => handleNoticeClick(notice.noticeNo)}
                    style={{ cursor: 'pointer' }}
                  >
                    {notice.imageUrls && notice.imageUrls.length > 0 ? (
                      <img 
                        src={`http://localhost:8081${notice.imageUrls[0]}`}
                        alt={notice.noticeTitle}
                        style={{
                          width: '200px',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    ) : (
                      <ImagePlaceholder />
                    )}
                    <NoticeContent>
                      <NoticeTitle>{notice.noticeTitle}</NoticeTitle>
                      <NoticeBody>{notice.noticeContent}</NoticeBody>
                    </NoticeContent>
                  </NoticeCard>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  검색 결과가 없습니다.
                </div>
              )}
            </NoticeList>

            {pageInfo && pageInfo.maxPage > 1 && (
              <Pagination>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </PaginationButton>
                {renderPageNumbers()}
                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pageInfo.maxPage}
                >
                  Next →
                </PaginationButton>
              </Pagination>
            )}
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Notice;