import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const NoticeWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 60px 80px;
  width: 100%;
  max-width: 820px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 10px 0;
  color: #1a1a1a;
`;

export const Subtitle = styled.p`
  font-size: 20px;
  text-align: center;
  color: #666;
  margin: 0 0 50px 0;
  font-weight: 400;
`;

export const FormGroup = styled.div`
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 10px;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 14px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

export const CancelButton = styled.button`
  padding: 14px 20px;
  background-color: #6b6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 80px;

  &:hover {
    background-color: #555;
  }
`;

export const DeleteButton = styled.button`
  padding: 14px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 100px;

  &:hover {
    background-color: #c82333;
  }
`;

export const AttachButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background-color: #2b2b2b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a1a1a;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3367d6;
  }
`;