// src/pages/CarDetails.styles.js
import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 80px 0 120px;
  background-color: #f5f5f7;
`;

export const Inner = styled.div`
  width: 1200px;
`;

export const TitleArea = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

export const MainTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
`;

export const SubTitle = styled.p`
  font-size: 18px;
  color: #777;
`;

export const ContentArea = styled.section`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightSection = styled.div`
  flex: 1;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 18px 18px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
`;

export const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
`;

export const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  background-color: #f0f0f2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b0b5;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const CardLabel = styled.div`
  font-size: 13px;
  color: #999;
  margin-bottom: 4px;
`;

export const CardValue = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const StatusButton = styled.button`
  width: 100%;
  margin-top: 4px;
  padding: 10px 0;
  border-radius: 4px;
  border: none;
  background-color: #276ef1;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1f56c4;
  }
`;

export const Form = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 22px 24px 26px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
`;

export const CarName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: #e6f0ff;
  color: #276ef1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 2px 0;
`;

export const SelectRow = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SelectLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
`;

export const SelectBox = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #276ef1;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const TextAreaRow = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TextAreaLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  
  &:focus {
    border-color: #276ef1;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const ButtonRow = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #276ef1;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1f56c4;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #6c757d;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #5a6268;
  }
`;

export const DangerButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #dc3545;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c82333;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 18px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 18px;
  color: #dc3545;
  font-weight: 500;
`;