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
  FormTitle,
  NoticeText,
  FormGroup,
  Label,
  DateInputWrapper,
  DateInput,
  DateHint,
  Select,
  SelectHint,
  ButtonGroup,
  ApprovalButton,
  ApproveButton,
  RejectButton
} from './ReserveDetails.styles';

const ReserveDetails = () => {
  const [startDate, setStartDate] = useState('08/17/2025');
  const [returnDate, setReturnDate] = useState('08/17/2025');
  const [status, setStatus] = useState('');

  const handleApproval = () => {
    console.log('차량대여상태 변경');
  };

  const handleApprove = () => {
    console.log('승인');
  };

  const handleReject = () => {
    console.log('거절');
  };

  return (
    <Container>
      <PageTitle>차량 예약 상세 내역</PageTitle>
      <PageSubtitle>Reservation Details</PageSubtitle>

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
              <LocationTitle>픽업 / 반납 위치</LocationTitle>
              <LocationDetail>참소이름</LocationDetail>
              <LocationDetail>전체주소</LocationDetail>
            </LocationInfo>
          </MapSection>
        </LeftSection>

        <RightSection>
          <FormSection>
            <NoticeText>{'{'}사용자 이름{'}'}님 예약 신청입니다.</NoticeText>
            
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
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">먼저 인증 상태</option>
                <option value="waiting">인증 완료 / 인증 필요</option>
              </Select>
              <SelectHint>인증 완료 / 인증 필요</SelectHint>
            </FormGroup>

            <ButtonGroup>
              <ApprovalButton onClick={handleApproval}>
                차량대여상태
              </ApprovalButton>
            </ButtonGroup>

            <ButtonGroup>
              <ApproveButton onClick={handleApprove}>승인</ApproveButton>
              <RejectButton onClick={handleReject}>거절</RejectButton>
            </ButtonGroup>
          </FormSection>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default ReserveDetails;