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
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 60px;
  align-items: flex-start;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const RightSection = styled.div`
  flex: 1;
`;

export const CarInfoBox = styled.div`
  display: flex;
  gap: 20px;
`;

export const CarImage = styled.div`
  width: 200px;
  height: 200px;
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CarImageLabel = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const CarDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CarTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: #d4f4dd;
  color: #2d5f3f;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`;

export const CarInfo = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
`;

export const MapSection = styled.div`
  display: flex;
  gap: 20px;
`;

export const MapImage = styled.div`
  width: 200px;
  height: 200px;
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const MapImageLabel = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const LocationInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LocationTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const LocationDetail = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NoticeText = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #4285f4;
  }
`;

export const DateHint = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background: white;
  cursor: pointer;
  
  &:focus {
    border-color: #4285f4;
  }
`;

export const SelectHint = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

export const VerifyButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
  
  &:hover {
    background: #3367d6;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #3367d6;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: #9e9e9e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #757575;
  }
`;