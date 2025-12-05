import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNoticeList, getNoticeSearch } from '../../api/notice';
import { Container } from '../Styles/Styles';
import {
    ClearButton,
    ContentWrapper,
    ImagePlaceholder,
    NoticeBody,
    NoticeCard,
    NoticeContent,
    NoticeList,
    NoticeTitle,
    PageNumber,
    Pagination,
    PaginationButton,
    SearchBox,
    SearchLabel,
    SearchSection,
    Subtitle,
    Title,
    WriteButton
} from './Notice.styles';

const Notice = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
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

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    setCurrentPage(1);
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

      {/* ✅ SearchSection과 버튼을 감싸는 wrapper */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        gap: '20px'  // 간격
      }}>
        {/* 검색 영역 */}
        <SearchSection style={{ flex: 1 }}>
          <SearchLabel>공지사항</SearchLabel>
          <SearchBox>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={handleSearchChange}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                background: 'transparent'
              }}
            />
            {searchKeyword && (
              <ClearButton onClick={handleClearSearch}>×</ClearButton>
            )}
          </SearchBox>
        </SearchSection>

        {/* 글쓰기 버튼 */}
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