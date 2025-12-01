import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: calc(100vh - 200px);
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const PageSubtitle = styled.p`
  font-size: 1rem;
  color: #dc2626;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const Tab = styled.button`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid ${props => props.$active ? '#374151' : '#e5e7eb'};
  background: ${props => props.$active ? '#374151' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#6b7280'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #374151;
    color: ${props => props.$active ? '#ffffff' : '#374151'};
  }
`;

export const InfoSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.span`
  color: #374151;
  font-weight: 500;
  min-width: 60px;
`;

export const InfoDivider = styled.span`
  margin: 0 0.5rem;
  color: #d1d5db;
`;

export const InfoValue = styled.span`
  color: #6b7280;
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const ReasonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ReasonItem = styled.div`
  border: 1px solid ${props => {
    if (props.$selected) {
      return props.$isInquiry ? '#2563eb' : '#dc2626';
    }
    return '#e5e7eb';
  }};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
  background: ${props => {
    if (props.$selected) {
      return props.$isInquiry ? '#eff6ff' : '#fef2f2';
    }
    return '#ffffff';
  }};
`;

export const ReasonHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  justify-content: space-between;

  &:hover {
    background: #f9fafb;
  }
`;

export const ReasonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const RadioButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => {
    if (props.$selected) {
      return props.$isInquiry ? '#2563eb' : '#dc2626';
    }
    return '#d1d5db';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => {
      if (props.$selected) {
        return props.$isInquiry ? '#2563eb' : '#dc2626';
      }
      return 'transparent';
    }};
    transition: all 0.2s;
  }
`;

export const ReasonTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
`;

export const ExpandIcon = styled.span`
  color: #9ca3af;
  font-size: 1.25rem;
  transition: transform 0.2s;
  transform: ${props => props.$expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const ReasonDescription = styled.div`
  padding: 0 1.25rem 1rem 3rem;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
  display: ${props => props.$expanded ? 'block' : 'none'};
`;

export const AdditionalInput = styled.div`
  margin-top: 1.5rem;
`;

export const TextareaLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  resize: vertical;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #dc2626;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;

export const CancelButton = styled.button`
  padding: 0.875rem 2.5rem;
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #d1d5db;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.875rem 2.5rem;
  background: ${props => props.$isInquiry ? '#2563eb' : '#dc2626'};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$isInquiry ? '#1d4ed8' : '#b91c1c'};
  }

  &:disabled {
    background: ${props => props.$isInquiry ? '#93c5fd' : '#fca5a5'};
    cursor: not-allowed;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;

  h2 {
    font-size: 1.5rem;
    color: #059669;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin-bottom: 2rem;
  }
`;

