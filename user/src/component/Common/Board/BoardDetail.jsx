import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";
import { boardApi } from "../../../api/boardApi";
import {
  Container,
  HeaderSection,
  Title,
  Subtitle,
  ContentWrapper,
  PostHeader,
  PostTitle,
  PostMeta,
  PostContent,
  ImageSection,
  PostImage,
  CommentSection,
  CommentInput,
  CommentButton,
  CommentListSection,
  CommentListTitle,
  CommentListDesc,
  ButtonGroup,
  BackButton,
  EditButton,
  DeleteButton,
  ReportButton,
  TopButton,
  TopIcon,
} from "./BoardDetail.styles";

// import CommentForm from "../CommentForm";

const BoardDetail = () => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);
  const [commentRefresh, setCommentRefresh] = useState(false);


  useEffect(() => {
      console.log("boardNo from useParams:", boardNo);
    if (boardNo) {
      fetchBoardDetail();
    }
  }, [boardNo]);

  const fetchBoardDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = auth.accessToken
        ? { Authorization: `Bearer ${auth.accessToken}` }
        : {};

      const response = await axios.get(
        `http://localhost:8081/boards/${boardNo}`,
        {
          headers: headers,
        }
      );
      console.log("받은 데이터:", response.data);
      setBoard(response.data);
      console.log("보드설정되나요:", board);
      setLoading(true);
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = () => {
    setCommentRefresh(!commentRefresh);
  };

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:8081/boards/${boardNo}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        alert("게시글이 삭제되었습니다.");
        navigate("/boardList");
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 로딩 중
  if (loading) {
    return (
      <Container>
        <HeaderSection>
          <Title>자유게시판</Title>
          <Subtitle>community board</Subtitle>
        </HeaderSection>
        <ContentWrapper>
          <p style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</p>
        </ContentWrapper>
      </Container>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Container>
        <HeaderSection>
          <Title>자유게시판</Title>
          <Subtitle>community board</Subtitle>
        </HeaderSection>
        <ContentWrapper>
          <p style={{ textAlign: "center", color: "red", padding: "2rem" }}>
            {error}
          </p>
          <BackButton
            onClick={() => navigate("/boardList")}
            style={{ margin: "1rem auto", display: "block" }}
          >
            목록으로
          </BackButton>
        </ContentWrapper>
      </Container>
    );
  }

  // 게시글이 없을 때
  if (!board) {
    return (
      <Container>
        <HeaderSection>
          <Title>자유게시판</Title>
          <Subtitle>community board</Subtitle>
        </HeaderSection>
        <ContentWrapper>
          <p style={{ textAlign: "center", padding: "2rem" }}>
            게시글을 찾을 수 없습니다.
          </p>
          <BackButton
            onClick={() => navigate("/boardList")}
            style={{ margin: "1rem auto", display: "block" }}
          >
            목록으로
          </BackButton>
        </ContentWrapper>
      </Container>
    );
  }

  // 정상 렌더링
  return (
    <Container>
      <HeaderSection>
        <Title>자유게시판</Title>
        <Subtitle>community board</Subtitle>
      </HeaderSection>

      <ContentWrapper>
        <PostHeader>
          <PostTitle>{board.boardTitle || "제목 없음"}</PostTitle>
          <PostMeta>
            <span>작성자: {board.memberName || "익명"}</span>
            <span>
              작성일:{" "}
              {board.createDate
                ? new Date(board.createDate).toLocaleDateString("ko-KR")
                : ""}
            </span>
            <span>조회수: {board.count || 0}</span>
          </PostMeta>
        </PostHeader>

        <PostContent>{board.boardContent || "내용이 없습니다."}</PostContent>

        {board.changeName && (
          <ImageSection>
            <PostImage
              src={`http://localhost:8081/uploads/${board.changeName}`}
              alt="첨부이미지"
              onError={(e) => {
                console.error("이미지 로드 실패");
                e.target.style.display = "none";
              }}
            />
          </ImageSection>
        )}

        {/* 댓글 작성 폼 */}
        <CommentForm boardNo={boardNo} onCommentAdded={handleCommentAdded} />

        {/* 댓글 목록 */}
        <CommentList boardNo={boardNo} refresh={commentRefresh} />

        <ButtonGroup>
          <BackButton onClick={() => navigate("/boardList")}>
            목록으로
          </BackButton>
          <ReportButton onClick={() => navigate(`/report/${boardNo}`)}>
            ⚠
          </ReportButton>
          <EditButton onClick={() => navigate(`/boardUpdate/${boardNo}`)}>
            수정
          </EditButton>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          <TopButton onClick={handleTop}>
            <TopIcon>▲</TopIcon>
            TOP
          </TopButton>
        </ButtonGroup>
      </ContentWrapper>
    </Container>
  );
};

export default BoardDetail;
