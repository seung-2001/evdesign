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

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9fafb;
    }
  }
`;

const Amount = styled.td`
  font-weight: 600;
  color: #059669;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.$completed ? '#d1fae5' : '#fef3c7'};
  color: ${props => props.$completed ? '#065f46' : '#92400e'};
  white-space: nowrap;
`;

const Payment = () => {
  const payments = [
    {
      id: 1,
      userId: 'user001',
      userName: '김철수',
      amount: 50000,
      method: '카드',
      status: '완료',
      date: '2024-01-15 14:30',
      description: '차량 대여료',
    },
    {
      id: 2,
      userId: 'user002',
      userName: '이영희',
      amount: 30000,
      method: '계좌이체',
      status: '완료',
      date: '2024-01-14 11:20',
      description: '충전소 이용료',
    },
    {
      id: 3,
      userId: 'user003',
      userName: '박민수',
      amount: 75000,
      method: '카드',
      status: '대기',
      date: '2024-01-13 16:45',
      description: '차량 대여료',
    },
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  return (
    <Container>
      <PageTitle>결제 관리</PageTitle>
      
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>결제 ID</th>
              <th>사용자 ID</th>
              <th>사용자명</th>
              <th>금액</th>
              <th>결제 수단</th>
              <th>상태</th>
              <th>내용</th>
              <th>결제일시</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.userId}</td>
                <td>{payment.userName}</td>
                <Amount>{formatAmount(payment.amount)}</Amount>
                <td>{payment.method}</td>
                <td>
                  <StatusBadge $completed={payment.status === '완료'}>
                    {payment.status}
                  </StatusBadge>
                </td>
                <td>{payment.description}</td>
                <td>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

export default Payment;
