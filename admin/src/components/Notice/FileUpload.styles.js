import styled from 'styled-components';

export const FileUploadContainer = styled.div`
  width: 100%;
`;

export const FileList = styled.div`
  margin-bottom: 10px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const FileName = styled.span`
  flex: 1;
  font-size: 14px;
  color: #333;
`;

export const FileSize = styled.span`
  font-size: 12px;
  color: #666;
`;

export const DeleteButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;

  &:hover {
    background: #d32f2f;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const AddButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.disabled ? '#ccc' : '#4CAF50'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: #45a049;
  }
`;