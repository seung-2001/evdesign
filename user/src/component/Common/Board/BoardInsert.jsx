import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { boardApi } from "../../../api/boardApi";
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
  ImagePreviewSection,
  ImagePreviewBox,
  PreviewPlaceholder,
  PreviewText,
  ButtonGroup,
  CancelButton,
  AttachButton,
  SubmitButton,
} from "./BoardInsert.styles";

const BoardInsert = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { auth, isAuthLoading } = useContext(AuthContext);

  console.log("isAutenticated" ,auth.isAuthenticated);
  console.log("isAuthLoading", isAuthLoading);
  console.log("Auth", auth);
  // 페이지 진입 시 로그인 체크
  useEffect(() => {
        if (!isAuthLoading && !auth.isAuthenticated) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, [isAuthLoading, auth.isAuthenticated, navigate]);

  const handleCancel = () => {
    if (window.confirm("작성을 취소하시겠습니까?")) {
      navigate("/boardList");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // 파일 크기 체크 (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.");
        return;
      }

      // 이미지 파일만 허용
      if (!selectedFile.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setFile(selectedFile);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const boardData = {
        boardTitle: title,
        boardContent: content,
      };

    // 전송 전 데이터 확인
    console.log('===== 전송할 데이터 =====');
    console.log('boardData:', boardData);
    console.log('file:', file);
    console.log('========================');
    
    await boardApi.createBoard(boardData, file);

    alert("게시글이 등록되었습니다.");
    navigate("/boardList");
  } catch (error) {
    console.error("게시글 등록 실패:", error);
    console.error('에러 응답:', error.response?.data);

    if (error.response?.status === 401) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      alert("게시글 등록에 실패했습니다.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <Container>
      <HeaderSection>
        <Title>게시글 작성</Title>
        <Subtitle>Free Board</Subtitle>
      </HeaderSection>

      <FormWrapper>
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
          />
        </FormGroup>

        <ImagePreviewSection>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <ImagePreviewBox
            onClick={() => document.getElementById("fileInput").click()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            ) : (
              <PreviewText>
                사진
                <br />
                첨부하기
              </PreviewText>
            )}
          </ImagePreviewBox>
        </ImagePreviewSection>

        <ButtonGroup>
          <CancelButton onClick={handleCancel} disabled={loading}>
            취소
          </CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {loading ? "등록 중..." : "글쓰기"}
          </SubmitButton>
        </ButtonGroup>
      </FormWrapper>
    </Container>
  );
};

export default BoardInsert;

/*
const BoardInsert = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const fileInputRef = useRef(null);

  const handleCancel = () => {
    navigate("/boardList");
    setTitle("");
    setContent("");
    setImages([null, null, null]);
  };

  const handleAttach = () => {
    // 파일 input 클릭
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // 빈 자리 찾아서 이미지 추가
    const newImages = [...images];
    let fileIndex = 0;

    for (let i = 0; i < newImages.length && fileIndex < files.length; i++) {
      if (newImages[i] === null) {
        const file = files[fileIndex];
        const reader = new FileReader();

        reader.onloadend = () => {
          setImages((prev) => {
            const updated = [...prev];
            updated[i] = reader.result;
            return updated;
          });
        };

        reader.readAsDataURL(file);
        fileIndex++;
      }
    }

    // input 초기화 (같은 파일 다시 선택 가능하도록)
    e.target.value = "";
  };

  const handleSubmit = () => {
    console.log("제목:", title);
    console.log("내용:", content);
    console.log("이미지:", images);
    alert("게시글이 작성되었습니다.");
    navigate("/boardList");
  };

  const handleImageClick = (index) => {
    if (images[index]) {
      // 이미지가 있으면 미리보기 (새 창으로 열기)
      window.open(images[index], "_blank");
    } else {
      // 이미지가 없으면 파일 선택
      fileInputRef.current?.click();
    }
  };

  const handleImageRemove = (index, e) => {
    // 이벤트 버블링 방지
    e.stopPropagation();

    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  return (
    <Container>
      <HeaderSection>
        <Title>게시글 작성</Title>
        <Subtitle>community board</Subtitle>
      </HeaderSection>

      <FormWrapper>
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

        <ImagePreviewSection>
          {images.map((image, index) => (
            <ImagePreviewBox
              key={index}
              onClick={() => handleImageClick(index)}
              className={image ? "has-image" : ""}
              style={{
                backgroundImage: image ? `url(${image})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {image ? (
                // 이미지가 있을 때: 삭제 버튼만 표시
                <button
                  onClick={(e) => handleImageRemove(index, e)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  ×
                </button>
              ) : (
                // 이미지가 없을 때: + 버튼과 텍스트 표시
                <>
                  <PreviewPlaceholder />
                  <PreviewText>
                    사진
                    <br />
                    미리보기
                  </PreviewText>
                </>
              )}
            </ImagePreviewBox>
          ))}
        </ImagePreviewSection>

        // 숨겨진 file input 
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <ButtonGroup>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <AttachButton onClick={handleAttach}>이미지 첨부하기</AttachButton>
          <SubmitButton onClick={handleSubmit}>글쓰기</SubmitButton>
        </ButtonGroup>
      </FormWrapper>
    </Container>
  );
};

export default BoardInsert;
*/
