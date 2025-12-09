import React, { useState } from 'react';
import {
  Container,
  PageTitle,
  PageSubtitle,
  ContentWrapper,
  LeftSection,
  RightSection,
  InfoBox,
  CarTitle,
  StatusBadge,
  InfoRow,
  InfoLabel,
  InfoValue,
  CarImage,
  FormGroup,
  Label,
  DateInputWrapper,
  DateInput,
  DateHint,
  ImageUploadBox,
  ImageUploadText,
  ButtonGroup,
  SubmitButton,
  CancelButton
} from './Return.styles';

const Return = () => {
  const [startDate, setStartDate] = useState('08/17/2025');
  const [returnDate, setReturnDate] = useState('08/17/2025');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 반납 처리 로직
    console.log('반납 처리');
  };

  const handleCancel = () => {
    // 취소 처리 로직
    console.log('취소');
  };

  return (
    <Container>
      <PageTitle>차량 반납하기</PageTitle>
      <PageSubtitle>Return</PageSubtitle>

      <ContentWrapper>
        <LeftSection>
          <InfoBox>
            <CarTitle>
              테슬라 모델 X
              <StatusBadge>테슬라</StatusBadge>
            </CarTitle>
            
            <InfoRow>
              <InfoLabel>번호판 : 75하 1234</InfoLabel>
            </InfoRow>
            <InfoRow>
              <InfoLabel>최대 탑승 인원 : 7인승</InfoLabel>
            </InfoRow>
            
            <InfoRow style={{ marginTop: '20px' }}>
              <InfoValue>색상</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoValue>블랙</InfoValue>
            </InfoRow>
          </InfoBox>

          <CarImage>
            <ImageUploadText>반납 시 첨부사진</ImageUploadText>
          </CarImage>
        </LeftSection>

        <RightSection>
          <FormGroup>
            <Label>예약신청일</Label>
            <InfoValue>현재 날짜 YYYY. MM. DD.</InfoValue>
          </FormGroup>

          <FormGroup>
            <Label>사용시작일</Label>
            <DateInputWrapper>
              <DateInput
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="MM/DD/YYYY"
              />
            </DateInputWrapper>
            <DateHint>MM/DD/YYYY</DateHint>
          </FormGroup>

          <FormGroup>
            <Label>반납예정일</Label>
            <DateInputWrapper>
              <DateInput
                type="text"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                placeholder="MM/DD/YYYY"
              />
            </DateInputWrapper>
            <DateHint>MM/DD/YYYY</DateHint>
          </FormGroup>

          <ButtonGroup>
            <SubmitButton onClick={handleSubmit}>반납</SubmitButton>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
          </ButtonGroup>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default Return;