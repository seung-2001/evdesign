import React, { useState, useEffect } from "react";
import { boardApi } from "../../api/boardApi";
import { useSearch } from "../../context/SearchContext";
import {
  Container,
  PageTitle,
  BoardList,
  BoardItem,
  BoardContent,
  BoardTitle,
  BoardBody,
  BoardMeta,
  DeleteButton,
  LoadingMessage,
  ErrorMessage,
  EmptyMessage,
  Pagination,
  PaginationButton,
  PageNumber,
} from './Board.styles';

export default function Board() {
  const { searchKeyword } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBoards();
  }, [currentPage, searchKeyword]);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await boardApi.getBoards(currentPage - 1);
      
      if (Array.isArray(data)) {
        setPosts(data);
        setPageInfo({
          currentPage: currentPage,
          startPage: Math.max(1, currentPage - 2),
          endPage: Math.min(currentPage + 2, Math.ceil(data.length / 10)),
          maxPage: Math.ceil(data.length / 10) || 1
        });
      } else if (data && Array.isArray(data.content)) {
        setPosts(data.content);
        setPageInfo({
          currentPage: currentPage,
          startPage: Math.max(1, currentPage - 2),
          endPage: Math.min(currentPage + 2, data.totalPages || currentPage),
          maxPage: data.totalPages || 1
        });
      } else {
        setPosts([]);
      }
      
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글을 불러오는데 실패했습니다.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= (pageInfo?.maxPage || 1)) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (boardNo, e) => {
    e.stopPropagation();
    
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await boardApi.deleteBoard(boardNo);
      alert('게시글이 삭제되었습니다.');
      fetchBoards();
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const renderPageNumbers = () => {
    if (!pageInfo) return null;

    const pages = [];
    const { startPage, endPage, currentPage: current } = pageInfo;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          $active={i === current}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageNumber>
      );
    }

    return pages;
  };

  // 헤더 검색어로 필터링
  const filteredPosts = posts.filter(post => {
    if (!searchKeyword) return true;
    const keyword = searchKeyword.toLowerCase();
    return (
      post.boardTitle?.toLowerCase().includes(keyword) ||
      post.boardContent?.toLowerCase().includes(keyword) ||
      post.memberName?.toLowerCase().includes(keyword)
    );
  });

  return (
    <Container>
      <PageTitle>커뮤니티 게시판 관리</PageTitle>

      {loading && <LoadingMessage>로딩 중...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && (
        <>
          <BoardList>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BoardItem key={post.boardNo}>
                  <BoardContent>
                    <BoardTitle>{post.boardTitle || '제목 없음'}</BoardTitle>
                    <BoardBody>{post.boardContent || ''}</BoardBody>
                    <BoardMeta>
                      <span>작성자: {post.memberName || '익명'}</span>
                      <span>조회수: {post.count || 0}</span>
                      <span>
                        {post.createDate ? new Date(post.createDate).toLocaleDateString('ko-KR') : ''}
                      </span>
                    </BoardMeta>
                  </BoardContent>
                  <DeleteButton onClick={(e) => handleDelete(post.boardNo, e)}>
                    삭제
                  </DeleteButton>
                </BoardItem>
              ))
            ) : (
              <EmptyMessage>
                {searchKeyword ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
              </EmptyMessage>
            )}
          </BoardList>

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
    </Container>
  );
}