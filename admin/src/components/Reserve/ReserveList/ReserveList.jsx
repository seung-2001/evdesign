import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  PageTitle,
  PageSubtitle,
  SectionTitle,
  TableWrapper,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  HeaderCell,
  StatusBadge,
  ButtonGroup,
  ActionButton,
  ErrorMessage,
  LoadingSpinner
} from './ReserveList.styles';

const ReserveList = () => {
  const [reservations, setReservations] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 예약 목록 조회
  const fetchReservations = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        'http://localhost:8081/reserve/operator/reserve-manage',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('백엔드 응답:', response.data);
      
      // reserveList로 받아오기
      if (response.data.reserveList) {
        setReservations(response.data.reserveList);
      }
      if (response.data.pi) {
        setPageInfo(response.data.pi);
      }
      
    } catch (err) {
      console.error('예약 조회 실패:', err);
      setError(err.response?.data?.['error-message'] || '예약 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // 예약 취소
  const handleCancel = async (reserveNo) => {
    if (!window.confirm('예약을 취소하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(
        `http://localhost:8081/reserve/${reserveNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('예약이 취소되었습니다.');
      fetchReservations();
    } catch (err) {
      console.error('예약 취소 실패:', err);
      alert(err.response?.data?.['error-message'] || '예약 취소에 실패했습니다.');
    }
  };

  // 예약 승인
  const handleApprove = async (reserveNo) => {
    if (!window.confirm('예약을 승인하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(
        `http://localhost:8081/reserve/operator/reserve-manage/${reserveNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('예약이 승인되었습니다.');
      fetchReservations();
    } catch (err) {
      console.error('예약 승인 실패:', err);
      alert(err.response?.data?.['error-message'] || '예약 승인에 실패했습니다.');
    }
  };

  // 차량 반납
  const handleReturn = async (reserveNo) => {
    if (!window.confirm('반납 처리하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `http://localhost:8081/reserve/${reserveNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('반납 처리가 완료되었습니다.');
      fetchReservations();
    } catch (err) {
      console.error('반납 처리 실패:', err);
      alert(err.response?.data?.['error-message'] || '반납 처리에 실패했습니다.');
    }
  };

  // 승인 상태별 한글 표시
  const getStatusText = (approveStatus) => {
    if (approveStatus === 'Y') return '승인완료';
    if (approveStatus === 'N') return '승인대기';
    return '알 수 없음';
  };

  // 승인 상태별 색상
  const getStatusColor = (approveStatus) => {
    if (approveStatus === 'Y') return '#4CAF50';
    if (approveStatus === 'N') return '#FFA500';
    return '#888';
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>로딩 중...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>차량 예약 관리</PageTitle>
      <PageSubtitle>Reservation Management</PageSubtitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SectionTitle>예약 목록 ({reservations.length}건)</SectionTitle>

      <TableWrapper>
        <StyledTable>
          <thead>
            <TableHeader>
              <HeaderCell>예약번호</HeaderCell>
              <HeaderCell>신청자</HeaderCell>
              <HeaderCell>차량명</HeaderCell>
              <HeaderCell>예약신청일</HeaderCell>
              <HeaderCell>사용시작일</HeaderCell>
              <HeaderCell>사용종료일</HeaderCell>
              <HeaderCell>승인상태</HeaderCell>
              <HeaderCell>관리</HeaderCell>
            </TableHeader>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan="8">예약 내역이 없습니다.</TableCell>
              </TableRow>
            ) : (
              reservations.map((reservation) => (
                <TableRow key={reservation.reserveNo}>
                  <TableCell>{reservation.reserveNo}</TableCell>
                  <TableCell>
                    {reservation.memberName || '정보없음'}
                    <br />
                    <small style={{ color: '#888' }}>
                      ({reservation.memberId || reservation.memberNo})
                    </small>
                  </TableCell>
                  <TableCell>
                    {reservation.carName || `차량번호: ${reservation.carNo}`}
                  </TableCell>
                  <TableCell>{formatDate(reservation.reserveDate)}</TableCell>
                  <TableCell>{formatDate(reservation.rentalStartDate)}</TableCell>
                  <TableCell>{formatDate(reservation.rentalEndDate)}</TableCell>
                  <TableCell>
                    <StatusBadge $color={getStatusColor(reservation.approveStatus)}>
                      {getStatusText(reservation.approveStatus)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      {reservation.approveStatus === 'N' && (
                        <ActionButton
                          $variant="approve"
                          onClick={() => handleApprove(reservation.reserveNo)}
                        >
                          승인
                        </ActionButton>
                      )}
                      {reservation.approveStatus === 'Y' && (
                        <ActionButton
                          $variant="return"
                          onClick={() => handleReturn(reservation.reserveNo)}
                        >
                          반납처리
                        </ActionButton>
                      )}
                      <ActionButton
                        $variant="cancel"
                        onClick={() => handleCancel(reservation.reserveNo)}
                      >
                        취소
                      </ActionButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Container>
  );
};

export default ReserveList;