import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  CommentListSection,
  CommentListTitle,
  CommentListDesc,
} from "../Board/BoardDetail.styles";

const CommentList = ({ boardNo, refresh }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchComments();
  }, [boardNo, refresh]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      console.log("댓글 조회 시작, boardNo:", boardNo);
      console.log("현재 사용자:", auth.username);

      
      const response = await axios.get(
        `${apiUrl}/comments?boardNo=${boardNo}`
      );
      
      console.log("댓글 조회 성공:", response.data);
      setComments(response.data);
    } catch (err) {
      console.error("댓글 조회 실패:", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentNo, commentWriter) => {
    console.log("삭제 시도 - commentWriter:", commentWriter, "auth.username:", auth.username);
    
    // 작성자 확인 (MEMBER_NO 비교)
    if (String(commentWriter) !== String(auth.username)) {
      alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
      return;
    }

    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await axios.delete(`${apiUrl}/comments/${commentNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      
      alert("댓글이 삭제되었습니다.");
      fetchComments(); // 댓글 목록 새로고침
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <CommentListSection>
        <CommentListTitle>댓글 목록</CommentListTitle>
        <CommentListDesc>로딩 중...</CommentListDesc>
      </CommentListSection>
    );
  }

  return (
    <CommentListSection>
      <CommentListTitle>
        댓글 {comments.length > 0 ? `(${comments.length})` : ""}
      </CommentListTitle>
      {comments.length === 0 ? (
        <CommentListDesc>댓글이 없습니다.</CommentListDesc>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          {comments.map((comment) => {
            const isMyComment = String(comment.commentWriter) === String(auth.username);
            console.log(`댓글 ${comment.commentNo} 작성자:`, comment.commentWriter, "내 번호:", auth.username, "일치:", isMyComment);
            
            return (
              <div
                key={comment.commentNo}
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid #eee",
                  marginBottom: "0.5rem",
                  backgroundColor: "#fafafa",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      {comment.memberName || "익명"}
                    </span>
                    <span style={{ fontSize: "12px", color: "#999" }}>
                      {comment.createDate
                        ? new Date(comment.createDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                  
                  {/* 본인이 작성한 댓글만 삭제 버튼 표시 */}
                  {isMyComment && (
                    <button
                      onClick={() => handleDelete(comment.commentNo, comment.commentWriter)}
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#333",
                    lineHeight: "1.6",
                  }}
                >
                  {comment.commentContent}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </CommentListSection>
  );
};

export default CommentList;