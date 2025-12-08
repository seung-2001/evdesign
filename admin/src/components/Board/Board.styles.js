import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 250px;
  padding: 2rem;
  min-height: calc(100vh - 70px);
  background-color: #f9fafb;
  width: calc(100% - 250px);
`;

export const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
`;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SearchLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  flex: 1;
  max-width: 400px;

  &:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  font-size: 0.875rem;
  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BoardItem = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const BoardContent = styled.div`
  flex: 1;
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const BoardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const BoardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const BoardMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background-color 0.2s;
  white-space: nowrap;
  height: fit-content;

  &:hover {
    background-color: #b91c1c;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #dc2626;
  font-size: 0.875rem;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  font-size: 0.875rem;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: ${props => props.disabled ? '#d1d5db' : '#374151'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
`;

export const PageNumber = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background-color: ${props => props.$active ? '#2563eb' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#374151'};
  border: 1px solid ${props => props.$active ? '#2563eb' : '#e5e7eb'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#2563eb' : '#f9fafb'};
    border-color: ${props => props.$active ? '#2563eb' : '#9ca3af'};
  }
`;

// 기존 Notice 스타일들 (하위 호환성 유지)
export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 8px;
  color: #000;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 60px;
`;

export const NoticeCard = styled.div`
  display: flex;
  gap: 24px;
  padding: 32px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: box-shadow 0.2s;
  position: relative;
  align-items: flex-start;

  &:hover {
    box-shadow: ${props => props.$clickable ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

export const NoticeImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

export const ImagePlaceholder = styled.div`
  width: 140px;
  height: 140px;
  background-color: #d9d9d9;
  border-radius: 4px;
  flex-shrink: 0;
`;

export const NoticeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NoticeTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

export const NoticeBody = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

export const PostMeta = styled.div`
  margin-top: 10px;
  font-size: 0.85rem;
  color: #666;
  display: flex;
  gap: 15px;
`;

export const Ellipsis = styled.span`
  padding: 0 8px;
  color: #666;
  font-size: 14px;
`;

export const WriteButton = styled.button`
  padding: 10px 20px;
  background-color: #1326d1ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4556a0ff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const NoticeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #000000;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: #000000;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
`;

export const SubmitButton = styled.button`
  padding: 12px 30px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 30px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #da190b;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;