// MemberManage.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 250px;
  padding: 2rem;
  min-height: calc(100vh - 70px);
  background-color: #f9fafb;
  width: calc(100% - 250px);
`;

export const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #6b7280;
`;

export const TableWrapper = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16rem;
`;

export const LoadingText = styled.div`
  color: #6b7280;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f9fafb;
`;

export const TableBody = styled.tbody`
  background-color: white;
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s;
  border-bottom: 1px solid #e5e7eb;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: ${props => props.$secondary ? '#6b7280' : '#111827'};
`;

export const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  
  ${props => {
    switch (props.$variant) {
      case 'admin':
        return `
          background-color: #ede9fe;
          color: #7c3aed;
        `;
      case 'operator':
        return `
          background-color: #dbeafe;
          color: #2563eb;
        `;
      case 'user':
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
      case 'active':
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case 'inactive':
        return `
          background-color: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AssignButton = styled.button`
  background-color: ${props => props.$canAssign ? '#2563eb' : '#9ca3af'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  border: none;
  cursor: ${props => props.$canAssign ? 'pointer' : 'not-allowed'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.$canAssign ? '#1d4ed8' : '#9ca3af'};
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

export const DeleteButton = styled.button`
  background-color: ${props => props.$canDelete ? '#1f2937' : '#9ca3af'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  border: none;
  cursor: ${props => props.$canDelete ? 'pointer' : 'not-allowed'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.$canDelete ? '#374151' : '#9ca3af'};
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

export const PaginationWrapper = styled.div`
  background-color: white;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #374151;
`;

export const InfoNumber = styled.span`
  font-weight: 500;
`;

export const Pagination = styled.nav`
  display: inline-flex;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const PageButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.$active ? '#1f2937' : 'white'};
  color: ${props => props.$active ? 'white' : '#6b7280'};
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: -1px;
  
  &:first-child {
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }
  
  &:last-child {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    margin-right: 0;
  }
  
  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#1f2937' : '#f9fafb'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    z-index: 10;
  }
`;