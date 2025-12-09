import React, { useState, useEffect } from "react";
import { boardApi } from "../../../api/boardApi";
import { getNoticeList } from "../../../api/notice";
import {
  Wrapper,
  Container,
  Grid,
  ImageSection,
  CarouselContainer,
  CarouselSlide,
  CarImage,
  CarouselDots,
  Dot,
  CarouselNav,
  NavButton,
  AppleSection,
  AppleTitle,
  AppleCard,
  AppleCardTitle,
  AppleCardMeta,
} from "./MainContent.styles";

const MainContent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topPosts, setTopPosts] = useState([]);
  const [noticeTop, setNoticeTop] = useState([]);

  // 캐러셀 이미지 목록
  const carImages = [
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&q=80",
    "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&q=80",
  ];

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  fetchTopNotices();
}, []);

const fetchTopNotices = async () => {
  try {
    const data = await getNoticeList(1); // 첫 번째 페이지 불러오기
    const list = data.noticeList || [];
    const top3 = list.slice(0, 3); // 최근 공지 3개
    
    setNoticeTop(top3);
  } catch (error) {
    console.error("공지사항 불러오기 실패:", error);
  }
};


  // 🔥 조회수 높은 게시글 3개 불러오기
  useEffect(() => {
    fetchTop3Posts();
  }, []);

  const fetchTop3Posts = async () => {
    try {
      const data = await boardApi.getBoards(0);

      let posts = [];

      if (Array.isArray(data)) {
        posts = data;
      } else if (data && Array.isArray(data.content)) {
        posts = data.content;
      }

      const sorted = posts
        .sort((a, b) => (b.count || 0) - (a.count || 0))
        .slice(0, 3);

      setTopPosts(sorted);
    } catch (e) {
      console.error("조회수 상위 게시글 불러오기 실패:", e);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Grid>

          {/* 🔥 캐러셀 슬라이드 */}
          <ImageSection>
  <CarouselContainer>
    {carImages.map((img, idx) => (
      <CarouselSlide key={idx} $active={currentSlide === idx}>
        <CarImage src={img} />
      </CarouselSlide>
    ))}

    {/* 좌우 버튼 */}
    <CarouselNav>
      <NavButton onClick={() => setCurrentSlide((prev) => (prev - 1 + carImages.length) % carImages.length)}>
        {"<"}
      </NavButton>
      <NavButton onClick={() => setCurrentSlide((prev) => (prev + 1) % carImages.length)}>
        {">"}
      </NavButton>
    </CarouselNav>

    {/* 점 (Dots) */}
    <CarouselDots>
      {carImages.map((_, idx) => (
        <Dot key={idx} $active={currentSlide === idx} onClick={() => setCurrentSlide(idx)} />
      ))}
    </CarouselDots>
  </CarouselContainer>
</ImageSection>

          {/* 🔥 최신 공지사항 TOP 3 */}
          <AppleSection>
            <AppleTitle>📢 최신 공지사항</AppleTitle>

            {noticeTop.length === 0 ? (
              <p>불러오는 중...</p>
            ) : (
              noticeTop.map((notice) => (
                <AppleCard
                  key={notice.noticeNo}
                  onClick={() => window.location.href = `/notice/${notice.noticeNo}`}
                >
                  <AppleCardTitle>{notice.noticeTitle}</AppleCardTitle>
                  <AppleCardMeta>
                    {notice.noticeContent?.slice(0, 40)}...
                  </AppleCardMeta>
                </AppleCard>
              ))
            )}
          </AppleSection>

          {/* 🔥 인기 게시글 TOP 3 */}
          <AppleSection>
            <AppleTitle>🔥 인기 게시글 TOP 3</AppleTitle>

            {topPosts.length === 0 ? (
              <p>불러오는 중...</p>
            ) : (
              topPosts.map((post) => (
                <AppleCard
                  key={post.boardNo}
                  onClick={() => window.location.href = `/boardDetail/${post.boardNo}`}
                >
                  <AppleCardTitle>{post.boardTitle}</AppleCardTitle>
                  <AppleCardMeta>조회수 {post.count || 0}</AppleCardMeta>
                </AppleCard>
              ))
            )}
          </AppleSection>

        </Grid>
      </Container>
    </Wrapper>
  );
};

export default MainContent;
