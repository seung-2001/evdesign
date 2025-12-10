import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  color: #000;
`;

export const PageSubtitle = styled.p`
  font-size: 20px;
  text-align: center;
  color: #888;
  margin-bottom: 60px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const TableHeader = styled.tr`
  background: #6b5bb3;
  color: white;
`;

export const HeaderCell = styled.th`
  padding: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  border: none;
  
  &:first-child {
    border-top-left-radius: 8px;
  }
  
  &:last-child {
    border-top-right-radius: 8px;
  }
`;

export const TableRow = styled.tr`
  background: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  
  &:nth-child(even) {
    background: #f0f0f0;
  }
  
  &:hover {
    background: #e8e8e8;
  }
`;

export const TableCell = styled.td`
  padding: 16px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border: none;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${props => props.$color || '#888'};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionButton = styled.button`
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => {
    switch(props.$variant) {
      case 'approve':
        return `
          background-color: #4CAF50;
          color: white;
          &:hover { background-color: #45a049; }
        `;
      case 'reject':
        return `
          background-color: #f44336;
          color: white;
          &:hover { background-color: #da190b; }
        `;
      case 'cancel':
        return `
          background-color: #ff9800;
          color: white;
          &:hover { background-color: #e68900; }
        `;
      case 'return':
        return `
          background-color: #2196F3;
          color: white;
          &:hover { background-color: #0b7dda; }
        `;
      default:
        return `
          background-color: #6b5bb3;
          color: white;
          &:hover { background-color: #5a4a9f; }
        `;
    }
  }}
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
`;