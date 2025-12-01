import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 250px;
  padding: 2rem;
  min-height: calc(100vh - 70px);
  background-color: #f9fafb;
  width: calc(100% - 250px);
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  thead {
    background-color: #f9fafb;
    border-bottom: 2px solid #e5e7eb;
  }

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    white-space: nowrap;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    color: #4b5563;
  }

  td:last-child {
    white-space: nowrap;
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9fafb;
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => {
    if (props.$status === 'pending') return '#fef3c7';
    if (props.$status === 'approved') return '#d1fae5';
    if (props.$status === 'rejected') return '#fee2e2';
    return '#fef3c7';
  }};
  color: ${props => {
    if (props.$status === 'pending') return '#92400e';
    if (props.$status === 'approved') return '#065f46';
    if (props.$status === 'rejected') return '#991b1b';
    return '#92400e';
  }};
  white-space: nowrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
  flex-wrap: nowrap;
`;

const ApproveButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #10b981;
  color: #ffffff;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: #059669;
  }
`;

const RejectButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #ef4444;
  color: #ffffff;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: #dc2626;
  }
`;

const ActionComplete = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const CarReservation = () => {
  const reservations = [
    {
      id: 1,
      userId: 'user001',
      userName: '김철수',
      carModel: '테슬라 모델 3',
      carNumber: '12가3456',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      status: 'pending',
      requestDate: '2024-01-10',
    },
    {
      id: 2,
      userId: 'user002',
      userName: '이영희',
      carModel: '현대 아이오닉 5',
      carNumber: '34나5678',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'approved',
      requestDate: '2024-01-12',
    },
    {
      id: 3,
      userId: 'user003',
      userName: '박민수',
      carModel: '기아 EV6',
      carNumber: '56다7890',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      status: 'rejected',
      requestDate: '2024-01-11',
    },
  ];

  const getStatusText = (status) => {
    const statusMap = {
      pending: '대기중',
      approved: '승인',
      rejected: '반려',
    };
    return statusMap[status] || '대기중';
  };

  return (
    <Container>
      <PageTitle>차량 예약신청 관리</PageTitle>
      
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>신청번호</th>
              <th>사용자 ID</th>
              <th>사용자명</th>
              <th>차량 모델</th>
              <th>차량 번호</th>
              <th>대여 시작일</th>
              <th>대여 종료일</th>
              <th>신청일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.userId}</td>
                <td>{reservation.userName}</td>
                <td>{reservation.carModel}</td>
                <td>{reservation.carNumber}</td>
                <td>{reservation.startDate}</td>
                <td>{reservation.endDate}</td>
                <td>{reservation.requestDate}</td>
                <td>
                  <StatusBadge $status={reservation.status}>
                    {getStatusText(reservation.status)}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButtons>
                    {reservation.status === 'pending' && (
                      <>
                        <ApproveButton>승인</ApproveButton>
                        <RejectButton>반려</RejectButton>
                      </>
                    )}
                    {reservation.status !== 'pending' && (
                      <ActionComplete>처리완료</ActionComplete>
                    )}
                  </ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

export default CarReservation;
