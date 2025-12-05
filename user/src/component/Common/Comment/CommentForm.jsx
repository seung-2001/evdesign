import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  CommentSection,
  CommentInput,
  CommentButton,
} from "../Board/BoardDetail.styles";

const CommentForm = ({ boardNo, onCommentAdded }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      console.log("=== 댓글 등록 요청 ===");
      console.log("boardNo:", boardNo);
      console.log("boardNo type:", typeof boardNo);
      console.log("comment:", comment);
      console.log("token:", auth.accessToken);

      const requestData = {
      refBno: Number(boardNo), // 명시적으로 숫자로 변환
        commentContent: comment,
      };

      console.log("requestData:", requestData);

      const response = await axios.post(
      "http://localhost:8081/comments",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    
      if (response.status === 201) {
        alert("댓글이 등록되었습니다.");
        setComment("");
        onCommentAdded(); // 부모 컴포넌트에 댓글 추가 알림
      }
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <CommentSection>
      <CommentInput
        placeholder="댓글을 남겨보세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleCommentSubmit();
          }
        }}
      />
      <CommentButton onClick={handleCommentSubmit}>등록</CommentButton>
    </CommentSection>
  );
};

export default CommentForm;
