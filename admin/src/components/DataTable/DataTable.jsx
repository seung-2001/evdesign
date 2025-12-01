import React, { useState } from 'react';
import styled from 'styled-components';

const DataTableContainer = styled.div`
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

    &.selected {
      background-color: #eff6ff;
    }
  }
`;

const CheckboxColumn = styled.td`
  width: 50px;
  text-align: center;
`;

const TableCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #2563eb;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.$active ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.$active ? '#065f46' : '#991b1b'};
`;

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const tableData = [
    { id: 1, userId: 60, date: '23/09/2022', userName: 'Jacob Marcus', status: 'Y', period: '1hour', amount: '$000' },
    { id: 2, userId: 633, date: '23/09/2022', userName: 'Jacob Marcus', status: 'N', period: '2hour', amount: '$000' },
    { id: 3, userId: 73, date: '23/09/2022', userName: 'Jacob Marcus', status: 'N', period: '1hour', amount: '$000' },
    { id: 4, userId: 1, date: '23/09/2022', userName: 'Jacob Marcus', status: 'Y', period: '3hour', amount: '$000' },
    { id: 5, userId: 87, date: '23/09/2022', userName: 'Jacob Marcus', status: 'N', period: '3hour', amount: '$000' },
    { id: 6, userId: 77, date: '23/09/2022', userName: 'Jacob Marcus', status: 'N', period: '1hour', amount: '$000' },
    { id: 7, userId: 113, date: '23/09/2022', userName: 'Jacob Marcus', status: 'N', period: '1hour', amount: '$000' },
    { id: 8, userId: 122, date: '23/09/2022', userName: 'Jacob Marcus', status: 'N', period: '2hour', amount: '$000' },
    { id: 9, userId: '#AHGA68', date: '23/09/2022', userName: 'Jacob Marcus', status: '$100', period: '$000', amount: '$000' },
  ];

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(tableData.map(row => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const isAllSelected = selectedRows.size === tableData.length && tableData.length > 0;

  return (
    <DataTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>
              <TableCheckbox
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th>사용자 고유 번호</th>
            <th>일시</th>
            <th>사용자 아이디</th>
            <th>사용 상태</th>
            <th>대여기간</th>
            <th>예약 승인/반려</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className={selectedRows.has(row.id) ? 'selected' : ''}>
              <CheckboxColumn>
                <TableCheckbox
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </CheckboxColumn>
              <td>{row.userId}</td>
              <td>{row.date}</td>
              <td>{row.userName}</td>
              <td>
                <StatusBadge $active={row.status === 'Y'}>
                  {row.status}
                </StatusBadge>
              </td>
              <td>{row.period}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </DataTableContainer>
  );
};

export default DataTable;
