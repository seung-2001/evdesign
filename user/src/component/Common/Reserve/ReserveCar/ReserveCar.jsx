import React, { useState } from 'react';
import {
  Container,
  PageTitle,
  PageSubtitle,
  ContentWrapper,
  LeftSection,
  RightSection,
  SectionTitle,
  CarInfoBox,
  CarImage,
  CarImageLabel,
  CarDetails,
  CarTitle,
  StatusBadge,
  CarInfo,
  MapSection,
  MapImage,
  MapImageLabel,
  LocationInfo,
  LocationTitle,
  LocationDetail,
  FormSection,
  NoticeText,
  FormGroup,
  Label,
  DateInputWrapper,
  DateInput,
  DateHint,
  Select,
  SelectHint,
  ButtonGroup,
  VerifyButton,
  SubmitButton,
  CancelButton
} from './ReserveCar.styles';

const ReserveCar = () => {
  const [startDate, setStartDate] = useState('08/17/2025');
  const [returnDate, setReturnDate] = useState('08/17/2025');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleVerify = () => {
    console.log('인증하러가기');
    window.location.href = '/license';
  };

  const handleSubmit = () => {
    console.log('예약하기');
  };

  const handleCancel = () => {
    console.log('뒤로가기');
  };

  return (
    <Container>
      <PageTitle>차량 예약 신청</PageTitle>
      <PageSubtitle>Reservation</PageSubtitle>

      <SectionTitle>테슬라 모델 X 예약 신청</SectionTitle>

      <ContentWrapper>
        <LeftSection>
          <CarInfoBox>
            <CarImage>
              <CarImageLabel>차량대표사진</CarImageLabel>
            </CarImage>
            
            <CarDetails>
              <CarTitle>
                테슬라 모델 X
                <StatusBadge>테슬라</StatusBadge>
              </CarTitle>
              
              <CarInfo>번호판 : 75하 1234</CarInfo>
              <CarInfo>최대 탑승 인원 : 7인승</CarInfo>
              
              <div style={{ marginTop: '16px' }}>
                <CarInfo>색상</CarInfo>
                <CarInfo>블랙</CarInfo>
              </div>
            </CarDetails>
          </CarInfoBox>

          <MapSection>
            <MapImage>
              <MapImageLabel>지도</MapImageLabel>
            </MapImage>
            
            <LocationInfo>
              <LocationTitle>픽업위치</LocationTitle>
              <LocationDetail>참소이름</LocationDetail>
              <LocationDetail>전체주소</LocationDetail>
            </LocationInfo>
          </MapSection>
        </LeftSection>

        <RightSection>
          <FormSection>
            <NoticeText>{'{'}사용자 이름{'}'}님 명의로 예약을 진행합니다.</NoticeText>
            
            <FormGroup>
              <Label>예약신청일</Label>
              <div style={{ fontSize: '14px', color: '#333' }}>현재 날짜 YYYY. MM. DD.</div>
            </FormGroup>

            <FormGroup>
              <Label>사용시작일</Label>
              <DateInputWrapper>
                <DateInput
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
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
                />
              </DateInputWrapper>
              <DateHint>MM/DD/YYYY</DateHint>
            </FormGroup>

            <FormGroup>
              <Select 
                value={verificationStatus} 
                onChange={(e) => setVerificationStatus(e.target.value)}
              >
                <option value="">먼저 인증 상태</option>
                <option value="verified">인증 완료</option>
                <option value="required">인증 필요</option>
              </Select>
              <SelectHint>인증 완료 / 인증 필요</SelectHint>
            </FormGroup>

            <VerifyButton onClick={handleVerify}>
              인증하러가기
            </VerifyButton>

            <ButtonGroup>
              <SubmitButton onClick={handleSubmit}>예약하기</SubmitButton>
              <CancelButton onClick={handleCancel}>뒤로가기</CancelButton>
            </ButtonGroup>
          </FormSection>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default ReserveCar;