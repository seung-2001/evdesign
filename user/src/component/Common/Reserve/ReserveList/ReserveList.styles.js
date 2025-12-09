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
    border-top-left-radius: 4px;
  }
  
  &:last-child {
    border-top-right-radius: 4px;
  }
`;

export const TableRow = styled.tr`
  background: #e8e8e8;
  
  &:nth-child(even) {
    background: #e0e0e0;
  }
  
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const TableCell = styled.td`
  padding: 20px 16px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border: none;
`;