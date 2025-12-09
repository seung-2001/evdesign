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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

export const ImageUploadArea = styled.div`
  width: 100%;
  height: 400px;
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const TagSection = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: #d4f4dd;
  color: #2d5f3f;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #4285f4;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const ImageButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: #5b9bd5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #4a8ac4;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 12px 20px;
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
  padding: 12px 20px;
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

export const DeleteButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
  
  &:hover {
    background: #c62828;
  }
`;

export const ErrorMessage = styled.div`
  color: #e53935;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`;