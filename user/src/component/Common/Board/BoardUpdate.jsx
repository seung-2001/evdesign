import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  HeaderSection,
  Title,
  Subtitle,
  FormWrapper,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  CancelButton,
  DeleteButton,
  AttachButton,
  SubmitButton,
} from "./BoardUpdate.styles";

const BoardUpdate = () => {
  const navigate = useNavigate();
  // 라우트 파라미터 이름 확인 (boardNo 또는 id)
  const params = useParams();
  const boardNo = params.boardNo || params.id;
  const { auth } = useContext(AuthContext);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  // 기존 게시글 데이터 불러오기
  useEffect(() => {
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
        { headers }
      );
      
      const board = response.data;
      setTitle(board.boardTitle || "");
      setContent(board.boardContent || "");
      setWriter(board.memberName || "익명");
      
      // 기존 이미지가 있으면 저장
      if (board.changeName) {
        setExistingImage(board.changeName);
      }
      
      console.log("불러온 데이터:", board);
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      setError("게시글을 불러오는데 실패했습니다.");
      alert("게시글을 불러올 수 없습니다.");
      navigate("/boardList");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("수정을 취소하시겠습니까?")) {
      navigate(`/boardDetail/${boardNo}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
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

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles((prevFiles) => [...prevFiles, ...files]);
    console.log("첨부된 파일:", files);
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = () => {
    if (window.confirm("기존 이미지를 삭제하시겠습니까?")) {
      setExistingImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      
      const boardData = {
        boardNo: boardNo,
        boardTitle: title,
        boardContent: content,
      };
      
      formData.append(
        "board",
        new Blob([JSON.stringify(boardData)], { type: "application/json" })
      );

      if (attachedFiles.length > 0) {
      formData.append("file", attachedFiles[0]);
    }

    // PUT 대신 POST 사용
    await axios.post(
      `http://localhost:8081/boards/${boardNo}/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );

    alert("게시글이 수정되었습니다.");
    navigate(`/boardDetail/${boardNo}`);
  } catch (err) {
    console.error("수정 실패:", err);
    console.error("에러 응답:", err.response?.data);
    alert("게시글 수정에 실패했습니다.");
  }
};

  // 로딩 중
  if (loading) {
    return (
      <Container>
        <HeaderSection>
          <Title>게시글 수정</Title>
          <Subtitle>community board</Subtitle>
        </HeaderSection>
        <FormWrapper>
          <p style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</p>
        </FormWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderSection>
        <Title>게시글 수정</Title>
        <Subtitle>community board</Subtitle>
      </HeaderSection>

      <FormWrapper>
        <FormGroup>
          <Label>작성자</Label>
          <Input
            type="text"
            value={writer}
            disabled
            style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
          />
        </FormGroup>

        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>

        {/* 기존 이미지 표시 */}
        {existingImage && (
          <FormGroup>
            <Label>기존 이미지</Label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              <img
                src={`http://localhost:8081/uploads/${existingImage}`}
                alt="기존 이미지"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <button
                onClick={handleRemoveExistingImage}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                이미지 삭제
              </button>
            </div>
          </FormGroup>
        )}

        {/* 숨겨진 파일 input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          style={{ display: "none" }}
        />

        {/* 새로 첨부된 파일 목록 표시 */}
        {attachedFiles.length > 0 && (
          <FormGroup>
            <Label>새로 첨부된 파일</Label>
            <div style={{ marginTop: "8px" }}>
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <span>{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff4444",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </FormGroup>
        )}

        <ButtonGroup>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
          <AttachButton onClick={handleAttach}>파일 첨부하기</AttachButton>
          <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
        </ButtonGroup>
      </FormWrapper>
    </Container>
  );
};

export default BoardUpdate;