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
  background-color: ${props => props.$color || '#d4f4dd'};
  color: white;
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
  padding: 12px;
  background: #f0f7ff;
  border-left: 4px solid #4285f4;
  border-radius: 4px;
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

export const ApproveButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #45a049;
  }
`;

export const RejectButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #c62828;
  }
`;

export const ReturnButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #1976D2;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: #757575;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #616161;
  }
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin-bottom: 20px;
`;