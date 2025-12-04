import React, { useState } from 'react';
import {
  Container,
  PageTitle,
  PageSubtitle,
  ContentWrapper,
  LeftSection,
  RightSection,
  SectionTitle,
  ImageUploadArea,
  FormSection,
  FormTitle,
  TagSection,
  Tag,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  ImageButton,
  SubmitButton,
  CancelButton,
  DeleteButton
} from './SaveCar.styles.js';

const SaveCar = () => {
  const [formData, setFormData] = useState({
    licensePlate: '',
    maxPassengers: '',
    color: ''
  });

  const [selectedTags, setSelectedTags] = useState(['태슬라', '현대', '기아', '어먼구', '선택가능']);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 미리보기용
  const [attachedFile, setAttachedFile] = useState(null); // 파일 첨부용

  const handleImageRegistration = () => {
    console.log('사진 등록');
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const maxSize = 1024 * 1024 * 10; // 백엔드에 제한한 파일크기

    if(!imageFile) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    if(imageFile && imageFile.size > maxSize) {
      alert("파일 용량을 초과하였습니다");
      e.target.value = '';
      return;
    }

    setImageFile(imageFile);

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    console.log("미리보기 URL:", previewUrl);

  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 1024 * 1024 * 10; // 백엔드에 제한한 파일크기

    if(!file) {
      setAttachedFile(null);
      return;
    }

    if(file && file.size > maxSize) {
      alert("파일 용량을 초과하였습니다");
      return;
    }

    setAttachedFile(file);
    console.log("첨부된 파일:", file.name);
  };

  const handleSubmit = () => {
    console.log('등록/수정하기', formData);
  };

  const handleCancel = () => {
    console.log('취소');
  };

  const handleDelete = () => {
    console.log('삭제하기');
  };

  const [file, setFile] = useState(null);

  const handleFileRegistration = () => {
    console.log('파일 등록');
  };

  return (
    <Container>
      <PageTitle>공유차량 등록/수정</PageTitle>
      <PageSubtitle>Save New Car / Edit Car</PageSubtitle>

      <ContentWrapper>
        <LeftSection>
          <SectionTitle>공유차량 등록/수정</SectionTitle>
          
          <ImageUploadArea>
            
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none'}}
                id="image-upload"
              />
                {
                  imagePreview
                  ?
                  (
                    <label htmlFor="image-upload" style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#999'}}>
                      <img src={imagePreview} alt="차량 이미지 미리보기" style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
                    </label>
                  )
                  :
                  (
                  <label 
                    htmlFor="image-upload"
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      color: '#999'
                    }}
                  >
                    이미지를 선택하세요
                  </label>
                  )
                }
            
          </ImageUploadArea>

          <FormSection>
            <FormTitle>첨부파일</FormTitle>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none'}}
              id="file-upload"
            />
            <label 
              htmlFor="file-upload" 
              style={{ 
                fontSize: '14px', 
                color: attachedFile ? '#333' : '#666',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {attachedFile ? attachedFile.name : '파일을 선택하세요'}
            </label>
          </FormSection>

          <FormSection>
            <FormTitle>참조이름</FormTitle>
            <div style={{ fontSize: '14px', color: '#666' }}>전채주소</div>
          </FormSection>
        </LeftSection>

        <RightSection>
          <FormTitle>차량이름입력</FormTitle>
          
          <TagSection>
            {selectedTags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagSection>

          <FormGroup>
            <Label>번호판 :</Label>
            <Input 
              type="text" 
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              placeholder="입력"
            />
          </FormGroup>

          <FormGroup>
            <Label>최대 탑승 인원 :</Label>
            <Input 
              type="text" 
              name="maxPassengers"
              value={formData.maxPassengers}
              onChange={handleInputChange}
              placeholder="입력"
            />
          </FormGroup>

          <FormGroup>
            <Label>색상</Label>
            <Select 
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            >
              <option value="">색상 입력</option>
              <option value="black">블랙</option>
              <option value="white">화이트</option>
              <option value="silver">실버</option>
              <option value="red">레드</option>
              <option value="blue">블루</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <ImageButton onClick={handleImageRegistration}>사진 등록</ImageButton>
            <SubmitButton onClick={handleSubmit}>등록/수정하기</SubmitButton>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
          </ButtonGroup>

          <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default SaveCar;