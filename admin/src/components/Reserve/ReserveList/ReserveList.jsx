import React, { useState } from 'react';
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
  HeaderCell
} from './ReserveList.styles';

const ReserveList = () => {
  const [reservations] = useState([
    {
      id: 1,
      applicant: '신청자',
      carName: '차량이름',
      reservationDate: '예약신청일',
      startDate: '사용시작일',
      returnDate: '반납예정일',
      status: '신청상태'
    },
    {
      id: 2,
      applicant: '신청자',
      carName: '차량이름',
      reservationDate: '예약신청일',
      startDate: '사용시작일',
      returnDate: '반납예정일',
      status: '신청상태'
    },
    {
      id: 3,
      applicant: '신청자',
      carName: '차량이름',
      reservationDate: '예약신청일',
      startDate: '사용시작일',
      returnDate: '반납예정일',
      status: '신청상태'
    }
  ]);

  return (
    <Container>
      <PageTitle>차량 예약 내역</PageTitle>
      <PageSubtitle>Reservation List</PageSubtitle>

      <SectionTitle>공유 차량 예약 목록</SectionTitle>

      <TableWrapper>
        <StyledTable>
          <thead>
            <TableHeader>
              <HeaderCell>번호</HeaderCell>
              <HeaderCell>신청자</HeaderCell>
              <HeaderCell>차량이름</HeaderCell>
              <HeaderCell>예약신청일</HeaderCell>
              <HeaderCell>사용시작일</HeaderCell>
              <HeaderCell>반납예정일</HeaderCell>
              <HeaderCell>신청상태</HeaderCell>
            </TableHeader>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.applicant}</TableCell>
                <TableCell>{reservation.carName}</TableCell>
                <TableCell>{reservation.reservationDate}</TableCell>
                <TableCell>{reservation.startDate}</TableCell>
                <TableCell>{reservation.returnDate}</TableCell>
                <TableCell>{reservation.status}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Container>
  );
};

export default ReserveList;