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
} from './CarDetails/SaveCar/SaveCar.styles';

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

  const handleImageRegistration = () => {
    console.log('사진 등록');
  };

  const handleSubmit = () => {
    console.log('수정하기', formData);
  };

  const handleCancel = () => {
    console.log('취소');
  };

  const handleDelete = () => {
    console.log('삭제하기');
  };

  return (
    <Container>
      <PageTitle>공유차량 등록</PageTitle>
      <PageSubtitle>Save New Car</PageSubtitle>

      <ContentWrapper>
        <LeftSection>
          <SectionTitle>공유차량 등록</SectionTitle>
          
          <ImageUploadArea>
            <div style={{ textAlign: 'center', color: '#999' }}>
              이미지 업로드 영역
            </div>
          </ImageUploadArea>

          <FormSection>
            <FormTitle>첨부파일</FormTitle>
            <div style={{ fontSize: '14px', color: '#666' }}>파일명</div>
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
            <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
          </ButtonGroup>

          <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default SaveCar;