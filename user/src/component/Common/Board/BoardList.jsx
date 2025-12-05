import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageSquare, Eye, Clock, ThumbsUp } from "lucide-react";
import { Button, Container } from "../Styles/Styles";
import * as S from "./BoardList.styles";
import { boardApi } from "../../../api/boardApi";
import { AuthContext } from "../../context/AuthContext";



export default function BoardList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth, isAuthLoading } = useContext(AuthContext);
  // 게시글 목록 불러오기
  useEffect(() => {
    fetchBoards();
  }, [currentPage]);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await boardApi.getBoards(currentPage);
      
      console.log('받은 데이터:', data);  // 디버깅용
      
      // 데이터가 배열인지 확인
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data && Array.isArray(data.content)) {
        // 페이징 객체로 온 경우
        setPosts(data.content);
      } else {
        console.error('올바르지 않은 데이터 형식:', data);
        setPosts([]);
      }
      
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글을 불러오는데 실패했습니다.');
      setPosts([]);  // 에러 시에도 빈 배열
    } finally {
      setLoading(false);
    }
  };

  // 게시글 상세로 이동
  const handlePostClick = async (boardNo) => {
  navigate(`/boardDetail/${boardNo}`);
};

  // 글쓰기 페이지로 이동
const handleWriteClick = () => {
  if (isAuthLoading) return;

  if (!auth.isAuthenticated) {
    alert("로그인이 필요합니다.");
    navigate("/login");
  } else {
    navigate("/boardInsert");
  }
};

  // posts가 배열인지 확인 후 filter 실행
  const filteredPosts = Array.isArray(posts) ? posts.filter(post => {
    const matchesSearch =
      post.boardTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.boardContent?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) : [];

  if (loading) {
    return (
      <Container>
        <S.BoardListWrapper>
          <p style={{ textAlign: 'center', padding: '2rem' }}>로딩 중...</p>
        </S.BoardListWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <S.BoardListWrapper>
          <p style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>{error}</p>
          <button 
            onClick={fetchBoards}
            style={{
              display: 'block',
              margin: '1rem auto',
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
        </S.BoardListWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <S.BoardListWrapper>
        <S.Header>
          <S.Title>커뮤니티 게시판</S.Title>
          <S.Subtitle>community board</S.Subtitle>
        </S.Header>

        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <button
            onClick={handleWriteClick}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#111',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            글쓰기
          </button>
        </div>

        <S.SearchFilterWrapper>
          <S.SearchInputWrapper>
            <S.SearchInput
              type="text"
              placeholder="게시글 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <S.SearchButton>
              <Search size={18} />
            </S.SearchButton>
          </S.SearchInputWrapper>
        </S.SearchFilterWrapper>

        <S.PostList>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <S.PostItem 
                key={post.boardNo}
                onClick={() => handlePostClick(post.boardNo)}
              >
                {post.imageUrl && (
                  <S.PostImage src={post.imageUrl} alt={post.boardTitle} />
                )}
                <S.PostContent>
                  <S.PostHeader>
                    <S.PostMeta>
                      <S.AuthorInfo>
                        <S.AuthorName>{post.memberName || '익명'}</S.AuthorName>
                      </S.AuthorInfo>
                      <S.TimeInfo>
                        {post.createDate ? new Date(post.createDate).toLocaleDateString('ko-KR') : ''}
                      </S.TimeInfo>
                    </S.PostMeta>
                  </S.PostHeader>
                  
                  <S.PostTitle>{post.boardTitle || '제목 없음'}</S.PostTitle>
                  <S.PostDescription>{post.boardContent || ''}</S.PostDescription>
                  
                  <S.StatsWrapper>
                    <S.StatItem>
                      조회 {post.count || 0}
                    </S.StatItem>
                  </S.StatsWrapper>
                </S.PostContent>
              </S.PostItem>
            ))
          ) : (
            <S.EmptyState>
              <Search size={48} style={{ color: "#d1d5db", marginBottom: "1rem" }} />
              <p>게시글이 없습니다.</p>
            </S.EmptyState>
          )}
        </S.PostList>

        {filteredPosts.length > 0 && (
          <S.Pagination>
            <S.PageButton 
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              ← Previous
            </S.PageButton>
            
            <S.PageNumber $active={true}>
              {currentPage + 1}
            </S.PageNumber>
            
            <S.PageButton 
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={filteredPosts.length < 3}
            >
              Next →
            </S.PageButton>
          </S.Pagination>
        )}
      </S.BoardListWrapper>
    </Container>
  );
}