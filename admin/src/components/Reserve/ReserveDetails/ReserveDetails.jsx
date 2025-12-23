import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  ButtonGroup,
  ApproveButton,
  RejectButton,
  ReturnButton,
  CancelButton,
  LoadingSpinner,
  ErrorMessage
} from './ReserveDetails.styles';

const ReserveDetails = () => {
  const { reserveNo } = useParams();
  const navigate = useNavigate();
  
  const [reservation, setReservation] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 예약 상세 조회
  const fetchReservationDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${apiUrl}/reserve/details/${reserveNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('예약 상세:', response.data);
      setReservation(response.data);
    } catch (err) {
      console.error('예약 상세 조회 실패:', err);
      setError(err.response?.data?.['error-message'] || '예약 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reserveNo) {
      fetchReservationDetail();
    }
  }, [reserveNo]);

  // 예약 승인
  const handleApprove = async () => {
    if (!window.confirm('예약을 승인하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(
        `${apiUrl}/reserve/operator/reserve-manage/${reserveNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('예약이 승인되었습니다.');
      fetchReservationDetail(); // 새로고침
    } catch (err) {
      console.error('예약 승인 실패:', err);
      alert(err.response?.data?.['error-message'] || '예약 승인에 실패했습니다.');
    }
  };

  // 예약 거절 (취소와 동일하게 처리)
  const handleReject = async () => {
    if (!window.confirm('예약을 거절하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(
        `${apiUrl}/reserve/${reserveNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('예약이 거절되었습니다.');
      navigate('/reserve/operator/reserve-manage'); // 목록으로 이동
    } catch (err) {
      console.error('예약 거절 실패:', err);
      alert(err.response?.data?.['error-message'] || '예약 거절에 실패했습니다.');
    }
  };

  // 차량 반납 처리
  const handleReturn = async () => {
    if (!window.confirm('반납 처리하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${apiUrl}/reserve/${reserveNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('반납 처리가 완료되었습니다.');
      fetchReservationDetail(); // 새로고침
    } catch (err) {
      console.error('반납 처리 실패:', err);
      alert(err.response?.data?.['error-message'] || '반납 처리에 실패했습니다.');
    }
  };

  // 예약 취소
  const handleCancel = async () => {
    if (!window.confirm('예약을 취소하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(
        `${apiUrl}/reserve/${reserveNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('예약이 취소되었습니다.');
      navigate('/reserve/operator/reserve-manage'); // 목록으로 이동
    } catch (err) {
      console.error('예약 취소 실패:', err);
      alert(err.response?.data?.['error-message'] || '예약 취소에 실패했습니다.');
    }
  };

  // 목록으로 돌아가기
  const handleBack = () => {
    navigate('/reserve/operator/reserve-manage');
  };

  // 승인 상태 한글 표시
  const getStatusText = (approveStatus) => {
    if (approveStatus === 'Y') return '승인완료';
    if (approveStatus === 'N') return '승인대기';
    return '알 수 없음';
  };

  // 승인 상태 색상
  const getStatusColor = (approveStatus) => {
    if (approveStatus === 'Y') return '#4CAF50';
    if (approveStatus === 'N') return '#FFA500';
    return '#888';
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>로딩 중...</LoadingSpinner>
      </Container>
    );
  }

  if (error || !reservation) {
    return (
      <Container>
        <ErrorMessage>{error || '예약 정보를 찾을 수 없습니다.'}</ErrorMessage>
        <ButtonGroup>
          <CancelButton onClick={handleBack}>목록으로</CancelButton>
        </ButtonGroup>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>차량 예약 상세 내역</PageTitle>
      <PageSubtitle>Reservation Details</PageSubtitle>

      <SectionTitle>
        {reservation.carName || `차량번호 ${reservation.carNo}`} 예약 신청
      </SectionTitle>

      <ContentWrapper>
        <LeftSection>
          <CarInfoBox>
            <CarImage>
              <CarImageLabel>차량대표사진</CarImageLabel>
            </CarImage>
            
            <CarDetails>
              <CarTitle>
                {reservation.carName || '차량정보 없음'}
                <StatusBadge $color={getStatusColor(reservation.approveStatus)}>
                  {getStatusText(reservation.approveStatus)}
                </StatusBadge>
              </CarTitle>
              
              <CarInfo>차량번호: {reservation.carNo}</CarInfo>
              <CarInfo>예약번호: {reservation.reserveNo}</CarInfo>
            </CarDetails>
          </CarInfoBox>

          <MapSection>
            <MapImage>
              <MapImageLabel>지도</MapImageLabel>
            </MapImage>
            
            <LocationInfo>
              <LocationTitle>픽업 / 반납 위치</LocationTitle>
              <LocationDetail>위치 정보가 없습니다</LocationDetail>
            </LocationInfo>
          </MapSection>
        </LeftSection>

        <RightSection>
          <FormSection>
            <NoticeText>
              {reservation.memberName || '사용자'} ({reservation.memberId || reservation.memberNo})님의 예약 신청입니다.
            </NoticeText>
            
            <FormGroup>
              <Label>예약신청일</Label>
              <div style={{ fontSize: '14px', color: '#333', padding: '12px 16px', background: '#f5f5f5', borderRadius: '4px' }}>
                {formatDate(reservation.reserveDate)}
              </div>
            </FormGroup>

            <FormGroup>
              <Label>사용시작일</Label>
              <div style={{ fontSize: '14px', color: '#333', padding: '12px 16px', background: '#f5f5f5', borderRadius: '4px' }}>
                {formatDate(reservation.rentalStartDate)}
              </div>
            </FormGroup>

            <FormGroup>
              <Label>반납예정일</Label>
              <div style={{ fontSize: '14px', color: '#333', padding: '12px 16px', background: '#f5f5f5', borderRadius: '4px' }}>
                {formatDate(reservation.rentalEndDate)}
              </div>
            </FormGroup>

            <FormGroup>
              <Label>승인상태</Label>
              <div style={{ fontSize: '14px', color: '#333', padding: '12px 16px', background: '#f5f5f5', borderRadius: '4px' }}>
                <StatusBadge $color={getStatusColor(reservation.approveStatus)}>
                  {getStatusText(reservation.approveStatus)}
                </StatusBadge>
              </div>
            </FormGroup>

            {/* 승인대기 상태: 승인/거절 버튼 */}
            {reservation.approveStatus === 'N' && (
              <ButtonGroup>
                <ApproveButton onClick={handleApprove}>승인</ApproveButton>
                <RejectButton onClick={handleReject}>거절</RejectButton>
              </ButtonGroup>
            )}

            {/* 승인완료 상태: 반납처리 버튼 */}
            {reservation.approveStatus === 'Y' && (
              <ButtonGroup>
                <ReturnButton onClick={handleReturn}>반납처리</ReturnButton>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
              </ButtonGroup>
            )}

            {/* 목록으로 버튼 */}
            <ButtonGroup>
              <CancelButton onClick={handleBack}>목록으로</CancelButton>
            </ButtonGroup>
          </FormSection>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default ReserveDetails;